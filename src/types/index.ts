export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'DISPATCHER' 
  | 'FINANCE' 
  | 'DRIVER' 
  | 'CUSTOMER';

export type DeliveryStatus = 
  | 'REQUEST_RECEIVED'
  | 'DISPATCH_CONFIRMED'
  | 'TANKER_ASSIGNED'
  | 'LOADING'
  | 'IN_TRANSIT'
  | 'ARRIVING'
  | 'DELIVERED'
  | 'CANCELLED';

export type TankerStatus = 
  | 'AVAILABLE' 
  | 'ON_DELIVERY' 
  | 'IN_TRANSIT' 
  | 'UNDER_MAINTENANCE' 
  | 'OFFLINE';

export type FuelProductType = 
  | 'DIESEL_AGO'
  | 'PETROL_PMS'
  | 'JET_A1'
  | 'HEAVY_FUEL_OIL_HFO'
  | 'KEROSENE'
  | 'LUBRICANTS_BULK';

export type InvoiceStatus = 
  | 'DRAFT' 
  | 'ISSUED' 
  | 'PARTIALLY_PAID' 
  | 'PAID' 
  | 'OVERDUE' 
  | 'CANCELLED';

export type QuoteStatus = 
  | 'PENDING' 
  | 'CALCULATED' 
  | 'APPROVED' 
  | 'REJECTED';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  companyId?: string;
  assignedTankerId?: string;
  driverLicenseNumber?: string;
  hazmatCertExpiry?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  registrationNumber: string;
  taxId: string;
  phone: string;
  email: string;
  address: string;
  billingEmail: string;
  paymentTerms: string;
  authorizedDeliverySites: CustomerAddress[];
  isVerified: boolean;
  createdAt: string;
}

export interface CustomerAddress {
  id: string;
  name: string;
  siteType: 'FUEL_STATION' | 'FACTORY' | 'CONSTRUCTION_SITE' | 'MINING_SITE' | 'GENERATOR_PLANT' | 'COMMERCIAL';
  addressLine: string;
  city: string;
  region: string;
  gpsCoordinates?: { lat: number; lng: number };
  tankCapacityLiters: number;
  contactPerson: string;
  contactPhone: string;
  specialAccessInstructions?: string;
}

export interface TankerCompartment {
  compartmentNumber: number;
  capacityLiters: number;
  currentProduct?: string;
  currentVolumeLiters?: number;
}

export interface Tanker {
  id: string;
  tankerId: string; // e.g. ART-TK-01
  registrationNumber: string; // e.g. GN-4821-23
  makeModel: string; // e.g. Volvo FMX 460 6x4
  tankCapacityLiters: number; // e.g. 45000
  compartments: TankerCompartment[];
  dedicatedProducts: FuelProductType[];
  status: TankerStatus;
  currentLocationName: string;
  currentGps?: { lat: number; lng: number };
  assignedDriverId?: string;
  assignedDriverName?: string;
  lastInspectionDate: string;
  nextMaintenanceDate: string;
  calibrationCertificateNumber: string;
  calibrationExpiry: string;
  hasBottomLoading: boolean;
  hasVaporRecovery: boolean;
  hasDigitalFlowMeter: boolean;
  hasHighFlowPump: boolean;
  imageUrl?: string;
  notes?: string;
  isDemo?: boolean;
}

export interface Driver {
  id: string;
  fullName: string;
  driverCode: string;
  phone: string;
  email: string;
  licenseNumber: string;
  dangerousGoodsCertNumber: string;
  certExpiryDate: string;
  yearsOfExperience: number;
  status: 'ON_DUTY' | 'ON_DELIVERY' | 'OFF_DUTY' | 'REST_PERIOD';
  assignedTankerId?: string;
  assignedTankerRegistration?: string;
  medicalFitnessExpiry: string;
  emergencyContact: string;
  rating?: number;
}

export interface FuelProduct {
  id: string;
  code: FuelProductType;
  name: string;
  unNumber: string; // e.g. UN 1202
  hazardClass: string; // e.g. Class 3 Flammable Liquid
  description: string;
  densityKgPerM3: number;
  standardUnit: string; // 'Litres' or 'Metric Tonnes'
  flashPoint: string;
  typicalApplications: string[];
  isActive: boolean;
}

export interface DeliveryStatusHistoryItem {
  status: DeliveryStatus;
  timestamp: string;
  location: string;
  note: string;
  updatedBy: string;
}

export interface DeliveryRequest {
  id: string;
  requestNumber: string; // e.g. ART-2026-000101
  customerId: string;
  customerName: string;
  companyName: string;
  customerPhone: string;
  customerEmail: string;
  pickupLocation: string; // Depot e.g. Tema Oil Refinery (TOR) Bulk Depot
  deliveryLocation: string;
  deliveryAddressDetails: string;
  destinationCoordinates?: { lat: number; lng: number };
  siteType: string;
  productType: FuelProductType;
  productName: string;
  quantityLiters: number;
  preferredDate: string;
  preferredTimeWindow: string;
  specialInstructions?: string;
  
  // Logistics Assignment
  status: DeliveryStatus;
  assignedTankerId?: string;
  assignedTankerReg?: string;
  assignedDriverId?: string;
  assignedDriverName?: string;
  assignedDriverPhone?: string;
  
  // Tracking
  currentGps?: { lat: number; lng: number };
  estimatedArrival?: string;
  statusHistory: DeliveryStatusHistoryItem[];
  
  // Commercials & Quotes
  quotedAmount?: number;
  currency?: string;
  isUrgent?: boolean;
  proofOfDeliveryId?: string;
  invoiceId?: string;
  
  createdAt: string;
  updatedAt: string;
  isDemo?: boolean;
}

export interface ProofOfDelivery {
  id: string;
  deliveryId: string;
  deliveryRequestNumber: string;
  customerName: string;
  companyName: string;
  productName: string;
  quantityDeliveredLiters: number;
  dipstickReadingBeforeMm?: number;
  dipstickReadingAfterMm?: number;
  meterReadingStart?: number;
  meterReadingEnd?: number;
  deliveryTimestamp: string;
  deliveryAddress: string;
  tankerReg: string;
  driverName: string;
  receiverFullName: string;
  receiverTitle: string;
  signatureDataUrl?: string; // Digital canvas signature
  photoEvidenceUrl?: string;
  remarks?: string;
  sealNumbers?: string[];
  isVerified: boolean;
  generatedPdfUrl?: string;
}

export interface Quote {
  id: string;
  quoteNumber: string; // e.g. ART-QUO-2026-042
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  deliveryLocation: string;
  productType: FuelProductType;
  quantityLiters: number;
  deliveryDate: string;
  frequency: 'ONE_TIME' | 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY' | 'ON_CALL_CONTRACT';
  distanceKm: number;
  urgency: 'STANDARD' | 'URGENT_24H' | 'EMERGENCY_SAME_DAY';
  specialRequirements?: string;
  
  // Calculated Pricing Breakdown
  baseTransportRatePerLiter: number;
  distanceRatePerKm: number;
  urgencySurcharge: number;
  handlingFee: number;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  
  status: QuoteStatus;
  validUntil: string;
  notes: string;
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. ART-INV-2026-0089
  deliveryId?: string;
  deliveryNumber?: string;
  customerId: string;
  companyName: string;
  contactPerson: string;
  billingAddress: string;
  customerEmail: string;
  customerPhone: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  transportationFee: number;
  additionalCharges: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
  status: InvoiceStatus;
  paymentMethod?: string;
  paidAmount?: number;
  paymentDate?: string;
  notes?: string;
  createdAt: string;
}

export interface SafetyDocument {
  id: string;
  title: string;
  category: 'PERMIT' | 'LICENSE' | 'INSURANCE' | 'INSPECTION' | 'TRAINING' | 'REGULATORY';
  documentNumber: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'PENDING_RENEWAL' | 'EXPIRED';
  fileUrl?: string;
  description: string;
  verificationBadge: string;
}

export interface MaintenanceRecord {
  id: string;
  tankerId: string;
  tankerReg: string;
  serviceType: 'HYDROSTATIC_TEST' | 'VALVE_REPAIR' | 'BRAKE_OVERHAUL' | 'PUMP_CALIBRATION' | 'ROUTINE_SERVICE' | 'TIRE_ROTATION';
  date: string;
  serviceProvider: string;
  cost: number;
  odometerKm: number;
  status: 'COMPLETED' | 'SCHEDULED' | 'IN_PROGRESS';
  nextDueDate: string;
  technicianNotes: string;
  certificateRef?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  companyName: string;
  subject: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  messages: {
    sender: string;
    role: string;
    timestamp: string;
    text: string;
  }[];
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress?: string;
}

export interface CMSContent {
  headline: string;
  subheadline: string;
  aboutText: string;
  whoWeServeText: string;
  whereWeOperateText: string;
  howWeWorkText: string;
  contactPhone: string;
  contactEmergencyPhone: string;
  contactWhatsApp: string;
  contactEmail: string;
  officeAddress: string;
  depotLocation: string;
  businessHours: string;
  operatingCorridors: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'DELIVERY' | 'FLEET' | 'SAFETY' | 'QUOTES' | 'CORPORATE';
}

export interface PricingConfig {
  basePerLiterRate: number; // e.g. 0.085
  volumeDiscountThreshold36k: number; // 0.065
  distancePerKmRate: number; // 3.50
  urgent24hMultiplier: number; // 1.25
  emergencySameDayMultiplier: number; // 1.45
  specialHandlingFee: number; // 250
  statutoryTaxRate: number; // 0.15
  currency: string;
}
