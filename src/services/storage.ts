import {
  Tanker,
  Driver,
  FuelProduct,
  DeliveryRequest,
  DeliveryStatus,
  Invoice,
  Quote,
  SafetyDocument,
  MaintenanceRecord,
  CMSContent,
  FAQItem,
  User,
  Company,
  PricingConfig,
  ProofOfDelivery,
  AuditLog,
  UserRole
} from '../types';

import {
  initialTankers,
  initialDrivers,
  initialFuelProducts,
  initialDeliveryRequests,
  initialInvoices,
  initialQuotes,
  initialSafetyDocuments,
  initialMaintenanceRecords,
  initialCMSContent,
  initialFAQs,
  initialUsers,
  initialCompanies,
  initialPricingConfig
} from '../data/initialData';
import { db, handleFirestoreError, OperationType } from './firebase';
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const STORAGE_KEYS = {
  TANKERS: 'armtells_tankers_v1',
  DRIVERS: 'armtells_drivers_v1',
  PRODUCTS: 'armtells_products_v1',
  DELIVERIES: 'armtells_deliveries_v1',
  INVOICES: 'armtells_invoices_v1',
  QUOTES: 'armtells_quotes_v1',
  PODS: 'armtells_pods_v1',
  DOCUMENTS: 'armtells_documents_v1',
  MAINTENANCE: 'armtells_maintenance_v1',
  CMS: 'armtells_cms_v1',
  FAQS: 'armtells_faqs_v1',
  USERS: 'armtells_users_v1',
  COMPANIES: 'armtells_companies_v1',
  PRICING: 'armtells_pricing_v1',
  CURRENT_USER: 'armtells_current_user_v1',
  AUDIT_LOGS: 'armtells_audit_logs_v1'
};

function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Storage load error for ${key}:`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Storage save error for ${key}:`, err);
  }
}

class StorageService {
  // Helper for Firestore background syncing
  private async syncToFirestore(collectionName: string, docId: string, data: any, op: OperationType) {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.warn(`Firestore sync note for ${collectionName}/${docId}:`, error);
    }
  }

  // Current User / Role session
  getCurrentUser(): User {
    const defaultUser = initialUsers[0]; // Super Admin by default for preview, can switch anytime
    return getFromStorage<User>(STORAGE_KEYS.CURRENT_USER, defaultUser);
  }

  setCurrentUser(user: User): void {
    saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
    this.syncToFirestore('users', user.id, user, OperationType.WRITE);
    this.addAuditLog('AUTH', `Switched active user session to ${user.name} (${user.role})`);
  }

  getUsers(): User[] {
    return getFromStorage<User[]>(STORAGE_KEYS.USERS, initialUsers);
  }

  // Delivery Requests
  getDeliveries(): DeliveryRequest[] {
    return getFromStorage<DeliveryRequest[]>(STORAGE_KEYS.DELIVERIES, initialDeliveryRequests);
  }

  getDeliveryById(id: string): DeliveryRequest | undefined {
    return this.getDeliveries().find(d => d.id === id);
  }

  getDeliveryByNumber(requestNumber: string): DeliveryRequest | undefined {
    const cleanNumber = requestNumber.trim().toUpperCase();
    return this.getDeliveries().find(d => 
      d.requestNumber.toUpperCase() === cleanNumber || 
      d.id.toUpperCase() === cleanNumber ||
      d.requestNumber.replace(/[^0-9]/g, '') === cleanNumber.replace(/[^0-9]/g, '')
    );
  }

  createDeliveryRequest(data: Omit<DeliveryRequest, 'id' | 'requestNumber' | 'createdAt' | 'updatedAt' | 'statusHistory' | 'status'>): DeliveryRequest {
    const deliveries = this.getDeliveries();
    const nextSeq = (deliveries.length + 101).toString().padStart(6, '0');
    const requestNumber = `ART-2026-${nextSeq}`;
    const now = new Date().toISOString();

    const newRequest: DeliveryRequest = {
      ...data,
      id: `del-${Date.now()}`,
      requestNumber,
      status: 'REQUEST_RECEIVED',
      statusHistory: [
        {
          status: 'REQUEST_RECEIVED',
          timestamp: now,
          location: 'Armtells Operations Central Portal',
          note: 'Customer delivery request registered and queued for logistics dispatch review.',
          updatedBy: data.customerName
        }
      ],
      createdAt: now,
      updatedAt: now
    };

    deliveries.unshift(newRequest);
    saveToStorage(STORAGE_KEYS.DELIVERIES, deliveries);
    this.syncToFirestore('deliveries', newRequest.id, newRequest, OperationType.CREATE);
    this.addAuditLog('DELIVERY_CREATE', `Created delivery request ${requestNumber} for ${data.companyName} (${data.quantityLiters}L ${data.productName})`);
    return newRequest;
  }

  updateDeliveryStatus(
    deliveryId: string, 
    newStatus: DeliveryStatus, 
    location: string = 'In Transit Corridor', 
    note: string = '', 
    updatedBy: string = 'Operations Dispatcher'
  ): DeliveryRequest | null {
    const deliveries = this.getDeliveries();
    const idx = deliveries.findIndex(d => d.id === deliveryId || d.requestNumber === deliveryId);
    if (idx === -1) return null;

    const delivery = deliveries[idx];
    const now = new Date().toISOString();

    delivery.status = newStatus;
    delivery.updatedAt = now;
    delivery.statusHistory.push({
      status: newStatus,
      timestamp: now,
      location,
      note: note || `Status transitioned to ${newStatus.replace('_', ' ')}`,
      updatedBy
    });

    // Update tanker status dynamically
    if (delivery.assignedTankerId) {
      if (newStatus === 'LOADING' || newStatus === 'IN_TRANSIT') {
        this.updateTankerStatus(delivery.assignedTankerId, 'IN_TRANSIT', location);
      } else if (newStatus === 'DELIVERED') {
        this.updateTankerStatus(delivery.assignedTankerId, 'AVAILABLE', 'Customer Site / Returning to Base');
      }
    }

    deliveries[idx] = delivery;
    saveToStorage(STORAGE_KEYS.DELIVERIES, deliveries);
    this.syncToFirestore('deliveries', delivery.id, delivery, OperationType.UPDATE);
    this.addAuditLog('STATUS_UPDATE', `Updated delivery ${delivery.requestNumber} status to ${newStatus}`);
    return delivery;
  }

  assignTankerAndDriver(
    deliveryId: string, 
    tankerId: string, 
    driverId?: string,
    estimatedArrival?: string
  ): DeliveryRequest | null {
    const deliveries = this.getDeliveries();
    const delivery = deliveries.find(d => d.id === deliveryId);
    if (!delivery) return null;

    const tankers = this.getTankers();
    const tanker = tankers.find(t => t.id === tankerId);
    
    const drivers = this.getDrivers();
    const driver = drivers.find(drv => drv.id === driverId || drv.assignedTankerId === tankerId);

    delivery.assignedTankerId = tanker?.id;
    delivery.assignedTankerReg = tanker ? `${tanker.registrationNumber} (${tanker.makeModel})` : undefined;
    
    if (driver) {
      delivery.assignedDriverId = driver.id;
      delivery.assignedDriverName = driver.fullName;
      delivery.assignedDriverPhone = driver.phone;
    }

    if (estimatedArrival) {
      delivery.estimatedArrival = estimatedArrival;
    }

    if (delivery.status === 'REQUEST_RECEIVED') {
      delivery.status = 'TANKER_ASSIGNED';
      delivery.statusHistory.push({
        status: 'TANKER_ASSIGNED',
        timestamp: new Date().toISOString(),
        location: tanker?.currentLocationName || 'Armtells Staging Depot',
        note: `Tanker ${tanker?.registrationNumber || ''} and driver ${driver?.fullName || 'Assigned Driver'} allocated for delivery.`,
        updatedBy: 'Operations Dispatcher'
      });
    }

    if (tanker) {
      tanker.status = 'ON_DELIVERY';
      this.saveTanker(tanker);
    }

    saveToStorage(STORAGE_KEYS.DELIVERIES, deliveries);
    this.syncToFirestore('deliveries', delivery.id, delivery, OperationType.UPDATE);
    this.addAuditLog('DISPATCH', `Assigned tanker ${tanker?.registrationNumber} to delivery ${delivery.requestNumber}`);
    return delivery;
  }

  // Proof of Delivery
  getProofsOfDelivery(): ProofOfDelivery[] {
    return getFromStorage<ProofOfDelivery[]>(STORAGE_KEYS.PODS, [
      {
        id: 'pod-000098',
        deliveryId: 'del-03',
        deliveryRequestNumber: 'ART-2026-000098',
        customerName: 'David K. Ofori',
        companyName: 'GoldRidge Heavy Mining Ltd',
        productName: 'Automotive Gas Oil (AGO)',
        quantityDeliveredLiters: 45000,
        dipstickReadingBeforeMm: 1240,
        dipstickReadingAfterMm: 4890,
        meterReadingStart: 184920,
        meterReadingEnd: 229920,
        deliveryTimestamp: '2026-08-16T11:45:00Z',
        deliveryAddress: 'Damang Processing Plant Generator Farm, Western Region',
        tankerReg: 'GN-4821-23',
        driverName: 'Samuel Mensah',
        receiverFullName: 'David K. Ofori',
        receiverTitle: 'Mine Logistics & Fuel Depot Officer',
        remarks: 'All 5 compartments discharged with zero contamination. Seals inspected intact before breaking.',
        sealNumbers: ['ARM-88910', 'ARM-88911', 'ARM-88912', 'ARM-88913', 'ARM-88914'],
        isVerified: true
      }
    ]);
  }

  createProofOfDelivery(data: Omit<ProofOfDelivery, 'id' | 'isVerified'>): ProofOfDelivery {
    const pods = this.getProofsOfDelivery();
    const newPod: ProofOfDelivery = {
      ...data,
      id: `pod-${Date.now()}`,
      isVerified: true
    };
    pods.unshift(newPod);
    saveToStorage(STORAGE_KEYS.PODS, pods);
    this.syncToFirestore('proofOfDeliveries', newPod.id, newPod, OperationType.CREATE);

    // Update corresponding delivery
    this.updateDeliveryStatus(data.deliveryId, 'DELIVERED', data.deliveryAddress, `Digital POD signed by ${data.receiverFullName}`, data.driverName);
    
    const deliveries = this.getDeliveries();
    const d = deliveries.find(item => item.id === data.deliveryId);
    if (d) {
      d.proofOfDeliveryId = newPod.id;
      saveToStorage(STORAGE_KEYS.DELIVERIES, deliveries);
    }

    this.addAuditLog('POD_SUBMIT', `Signed digital POD for delivery ${data.deliveryRequestNumber} by ${data.receiverFullName}`);
    return newPod;
  }

  // Tankers
  getTankers(): Tanker[] {
    const loaded = getFromStorage<Tanker[]>(STORAGE_KEYS.TANKERS, initialTankers);
    return loaded.map(t => {
      const match = initialTankers.find(it => it.id === t.id || it.tankerId === t.tankerId);
      if (match) {
        return { 
          ...t, 
          makeModel: match.makeModel,
          imageUrl: match.imageUrl || t.imageUrl 
        };
      }
      return t;
    });
  }

  getTankerById(id: string): Tanker | undefined {
    return this.getTankers().find(t => t.id === id);
  }

  saveTanker(tanker: Tanker): void {
    const tankers = this.getTankers();
    const idx = tankers.findIndex(t => t.id === tanker.id);
    if (idx >= 0) {
      tankers[idx] = tanker;
    } else {
      tankers.unshift(tanker);
    }
    saveToStorage(STORAGE_KEYS.TANKERS, tankers);
    this.syncToFirestore('tankers', tanker.id, tanker, OperationType.WRITE);
  }

  updateTankerStatus(tankerId: string, status: Tanker['status'], locationName?: string): void {
    const tankers = this.getTankers();
    const tanker = tankers.find(t => t.id === tankerId || t.tankerId === tankerId);
    if (tanker) {
      tanker.status = status;
      if (locationName) tanker.currentLocationName = locationName;
      this.saveTanker(tanker);
    }
  }

  deleteTanker(id: string): void {
    const tankers = this.getTankers().filter(t => t.id !== id);
    saveToStorage(STORAGE_KEYS.TANKERS, tankers);
    try {
      deleteDoc(doc(db, 'tankers', id)).catch(() => {});
    } catch {}
    this.addAuditLog('TANKER_DELETE', `Deleted tanker ${id}`);
  }

  // Drivers
  getDrivers(): Driver[] {
    return getFromStorage<Driver[]>(STORAGE_KEYS.DRIVERS, initialDrivers);
  }

  getDriverById(id: string): Driver | undefined {
    return this.getDrivers().find(d => d.id === id);
  }

  saveDriver(driver: Driver): void {
    const drivers = this.getDrivers();
    const idx = drivers.findIndex(d => d.id === driver.id);
    if (idx >= 0) {
      drivers[idx] = driver;
    } else {
      drivers.unshift(driver);
    }
    saveToStorage(STORAGE_KEYS.DRIVERS, drivers);
  }

  // Fuel Products
  getFuelProducts(): FuelProduct[] {
    return getFromStorage<FuelProduct[]>(STORAGE_KEYS.PRODUCTS, initialFuelProducts);
  }

  saveFuelProduct(product: FuelProduct): void {
    const products = this.getFuelProducts();
    const idx = products.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      products[idx] = product;
    } else {
      products.push(product);
    }
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  }

  // Quotes
  getQuotes(): Quote[] {
    return getFromStorage<Quote[]>(STORAGE_KEYS.QUOTES, initialQuotes);
  }

  createQuote(data: Omit<Quote, 'id' | 'quoteNumber' | 'createdAt'>): Quote {
    const quotes = this.getQuotes();
    const seq = (quotes.length + 44).toString().padStart(4, '0');
    const quoteNumber = `ART-QUO-2026-${seq}`;
    const newQuote: Quote = {
      ...data,
      id: `quo-${Date.now()}`,
      quoteNumber,
      createdAt: new Date().toISOString()
    };
    quotes.unshift(newQuote);
    saveToStorage(STORAGE_KEYS.QUOTES, quotes);
    this.syncToFirestore('quotes', newQuote.id, newQuote, OperationType.CREATE);
    this.addAuditLog('QUOTE_CREATE', `Generated quote ${quoteNumber} for ${data.companyName} ($${data.totalAmount})`);
    return newQuote;
  }

  updateQuoteStatus(quoteId: string, status: Quote['status']): void {
    const quotes = this.getQuotes();
    const quote = quotes.find(q => q.id === quoteId);
    if (quote) {
      quote.status = status;
      saveToStorage(STORAGE_KEYS.QUOTES, quotes);
      this.syncToFirestore('quotes', quote.id, quote, OperationType.UPDATE);
      this.addAuditLog('QUOTE_STATUS', `Updated quote ${quote.quoteNumber} status to ${status}`);
    }
  }

  // Invoices
  getInvoices(): Invoice[] {
    return getFromStorage<Invoice[]>(STORAGE_KEYS.INVOICES, initialInvoices);
  }

  createInvoice(data: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>): Invoice {
    const invoices = this.getInvoices();
    const seq = (invoices.length + 90).toString().padStart(4, '0');
    const invoiceNumber = `ART-INV-2026-${seq}`;
    const newInvoice: Invoice = {
      ...data,
      id: `inv-${Date.now()}`,
      invoiceNumber,
      createdAt: new Date().toISOString()
    };
    invoices.unshift(newInvoice);
    saveToStorage(STORAGE_KEYS.INVOICES, invoices);
    this.addAuditLog('INVOICE_CREATE', `Issued invoice ${invoiceNumber} to ${data.companyName} ($${data.total})`);
    return newInvoice;
  }

  updateInvoiceStatus(invoiceId: string, status: Invoice['status'], paymentMethod?: string): void {
    const invoices = this.getInvoices();
    const invoice = invoices.find(i => i.id === invoiceId);
    if (invoice) {
      invoice.status = status;
      if (status === 'PAID') {
        invoice.paidAmount = invoice.total;
        invoice.paymentDate = new Date().toISOString();
        if (paymentMethod) invoice.paymentMethod = paymentMethod;
      }
      saveToStorage(STORAGE_KEYS.INVOICES, invoices);
      this.addAuditLog('INVOICE_STATUS', `Updated invoice ${invoice.invoiceNumber} status to ${status}`);
    }
  }

  // Safety Documents
  getSafetyDocuments(): SafetyDocument[] {
    return getFromStorage<SafetyDocument[]>(STORAGE_KEYS.DOCUMENTS, initialSafetyDocuments);
  }

  saveSafetyDocument(doc: SafetyDocument): void {
    const docs = this.getSafetyDocuments();
    const idx = docs.findIndex(d => d.id === doc.id);
    if (idx >= 0) {
      docs[idx] = doc;
    } else {
      docs.unshift(doc);
    }
    saveToStorage(STORAGE_KEYS.DOCUMENTS, docs);
    this.addAuditLog('COMPLIANCE_DOC', `Saved compliance document ${doc.title} (${doc.documentNumber})`);
  }

  deleteSafetyDocument(id: string): void {
    const docs = this.getSafetyDocuments().filter(d => d.id !== id);
    saveToStorage(STORAGE_KEYS.DOCUMENTS, docs);
  }

  // Maintenance Records
  getMaintenanceRecords(): MaintenanceRecord[] {
    return getFromStorage<MaintenanceRecord[]>(STORAGE_KEYS.MAINTENANCE, initialMaintenanceRecords);
  }

  saveMaintenanceRecord(record: MaintenanceRecord): void {
    const records = this.getMaintenanceRecords();
    const idx = records.findIndex(r => r.id === record.id);
    if (idx >= 0) {
      records[idx] = record;
    } else {
      records.unshift(record);
    }
    saveToStorage(STORAGE_KEYS.MAINTENANCE, records);
    this.addAuditLog('MAINTENANCE', `Logged maintenance for tanker ${record.tankerReg}: ${record.serviceType}`);
  }

  // Companies / Customers
  getCompanies(): Company[] {
    return getFromStorage<Company[]>(STORAGE_KEYS.COMPANIES, initialCompanies);
  }

  // CMS Content
  getCMSContent(): CMSContent {
    return getFromStorage<CMSContent>(STORAGE_KEYS.CMS, initialCMSContent);
  }

  updateCMSContent(cms: CMSContent): void {
    saveToStorage(STORAGE_KEYS.CMS, cms);
    this.addAuditLog('CMS_UPDATE', 'Updated corporate CMS and website operational text');
  }

  // FAQs
  getFAQs(): FAQItem[] {
    return getFromStorage<FAQItem[]>(STORAGE_KEYS.FAQS, initialFAQs);
  }

  saveFAQ(faq: FAQItem): void {
    const faqs = this.getFAQs();
    const idx = faqs.findIndex(f => f.id === faq.id);
    if (idx >= 0) {
      faqs[idx] = faq;
    } else {
      faqs.push(faq);
    }
    saveToStorage(STORAGE_KEYS.FAQS, faqs);
  }

  deleteFAQ(id: string): void {
    const faqs = this.getFAQs().filter(f => f.id !== id);
    saveToStorage(STORAGE_KEYS.FAQS, faqs);
  }

  // Pricing Config
  getPricingConfig(): PricingConfig {
    return getFromStorage<PricingConfig>(STORAGE_KEYS.PRICING, initialPricingConfig);
  }

  updatePricingConfig(config: PricingConfig): void {
    saveToStorage(STORAGE_KEYS.PRICING, config);
    this.addAuditLog('PRICING_UPDATE', 'Updated logistics rate matrix & calculation parameters');
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return getFromStorage<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, [
      {
        id: 'log-01',
        timestamp: '2026-08-18T08:15:00Z',
        userId: 'usr-driver-01',
        userName: 'Samuel Mensah',
        userRole: 'DRIVER',
        action: 'STATUS_UPDATE',
        entityType: 'DeliveryRequest',
        entityId: 'del-01',
        details: 'Dispatched on Western Corridor. GN-4821-23 telemetry live.'
      },
      {
        id: 'log-02',
        timestamp: '2026-08-18T06:15:00Z',
        userId: 'usr-dispatch-01',
        userName: 'Chief Dispatcher',
        userRole: 'DISPATCHER',
        action: 'DISPATCH',
        entityType: 'DeliveryRequest',
        entityId: 'del-02',
        details: 'Assigned Tanker GT-1904-24 to delivery ART-2026-000102.'
      }
    ]);
  }

  addAuditLog(action: string, details: string, entityType: string = 'System', entityId: string = ''): void {
    const logs = this.getAuditLogs();
    const currentUser = this.getCurrentUser();
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      entityType,
      entityId,
      details
    };
    logs.unshift(newLog);
    if (logs.length > 200) logs.pop();
    saveToStorage(STORAGE_KEYS.AUDIT_LOGS, logs);
  }

  // Analytics Metrics
  getAnalyticsSummary() {
    const deliveries = this.getDeliveries();
    const tankers = this.getTankers();
    const quotes = this.getQuotes();
    const invoices = this.getInvoices();

    const activeDeliveries = deliveries.filter(d => ['LOADING', 'IN_TRANSIT', 'ARRIVING', 'TANKER_ASSIGNED'].includes(d.status)).length;
    const completedDeliveries = deliveries.filter(d => d.status === 'DELIVERED').length;
    const pendingRequests = deliveries.filter(d => d.status === 'REQUEST_RECEIVED').length;
    
    const availableTankers = tankers.filter(t => t.status === 'AVAILABLE').length;
    const transitTankers = tankers.filter(t => ['IN_TRANSIT', 'ON_DELIVERY'].includes(t.status)).length;
    const maintenanceTankers = tankers.filter(t => t.status === 'UNDER_MAINTENANCE').length;

    const totalLitresTransported = deliveries
      .filter(d => d.status === 'DELIVERED')
      .reduce((sum, d) => sum + d.quantityLiters, 0);

    const totalRevenue = invoices
      .filter(i => i.status === 'PAID')
      .reduce((sum, i) => sum + i.total, 0);

    const outstandingRevenue = invoices
      .filter(i => ['ISSUED', 'PARTIALLY_PAID', 'OVERDUE'].includes(i.status))
      .reduce((sum, i) => sum + (i.total - (i.paidAmount || 0)), 0);

    return {
      activeDeliveries,
      completedDeliveries,
      pendingRequests,
      availableTankers,
      transitTankers,
      maintenanceTankers,
      totalTankers: tankers.length,
      totalLitresTransported,
      totalRevenue,
      outstandingRevenue,
      pendingQuotes: quotes.filter(q => q.status === 'PENDING').length,
      fleetUtilizationPct: tankers.length > 0 ? Math.round((transitTankers / tankers.length) * 100) : 0
    };
  }

  // Reset to initial baseline
  resetToDefaultData(): void {
    saveToStorage(STORAGE_KEYS.TANKERS, initialTankers);
    saveToStorage(STORAGE_KEYS.DRIVERS, initialDrivers);
    saveToStorage(STORAGE_KEYS.PRODUCTS, initialFuelProducts);
    saveToStorage(STORAGE_KEYS.DELIVERIES, initialDeliveryRequests);
    saveToStorage(STORAGE_KEYS.INVOICES, initialInvoices);
    saveToStorage(STORAGE_KEYS.QUOTES, initialQuotes);
    saveToStorage(STORAGE_KEYS.DOCUMENTS, initialSafetyDocuments);
    saveToStorage(STORAGE_KEYS.MAINTENANCE, initialMaintenanceRecords);
    saveToStorage(STORAGE_KEYS.CMS, initialCMSContent);
    saveToStorage(STORAGE_KEYS.FAQS, initialFAQs);
    saveToStorage(STORAGE_KEYS.USERS, initialUsers);
    saveToStorage(STORAGE_KEYS.COMPANIES, initialCompanies);
    saveToStorage(STORAGE_KEYS.PRICING, initialPricingConfig);
    this.addAuditLog('SYSTEM_RESET', 'Restored operations database to official baseline');
  }
}

export const storageService = new StorageService();
