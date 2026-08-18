import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ProofOfDeliveryModal } from './components/ProofOfDeliveryModal';
import { InvoiceModal } from './components/InvoiceModal';
import { FirebaseProvider } from './context/FirebaseContext';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { FleetPage } from './pages/FleetPage';
import { DeliveryRequestPage } from './pages/DeliveryRequestPage';
import { TrackDeliveryPage } from './pages/TrackDeliveryPage';
import { QuotePage } from './pages/QuotePage';
import { SafetyCompliancePage } from './pages/SafetyCompliancePage';
import { IndustriesPage } from './pages/IndustriesPage';
import { AboutPage } from './pages/AboutPage';
import { CorporateLogisticsPage } from './pages/CorporateLogisticsPage';
import { RegionalCorridorsPage } from './pages/RegionalCorridorsPage';
import { OperationsPage } from './pages/OperationsPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPages } from './pages/LegalPages';

// Portals
import { CustomerPortal } from './pages/portal/CustomerPortal';
import { DriverPortal } from './pages/portal/DriverPortal';
import { OperationsDashboard } from './pages/portal/OperationsDashboard';
import { AdminDashboard } from './pages/portal/AdminDashboard';

// Types
import { Invoice } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [trackingIdToOpen, setTrackingIdToOpen] = useState<string | null>(null);
  
  // Modals state
  const [activePodId, setActivePodId] = useState<string | null>(null);
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);

  const handleOpenTracking = (trackingId?: string) => {
    if (trackingId) {
      setTrackingIdToOpen(trackingId);
    }
    setActivePage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPod = (podId: string) => {
    setActivePodId(podId);
  };

  const handleOpenInvoice = (invoice: Invoice) => {
    setActiveInvoice(invoice);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FirebaseProvider>
      <div className="min-h-screen bg-[#0A0A0B] text-slate-100 flex flex-col font-sans selection:bg-[#FF6B00] selection:text-black">
        
        {/* Navigation Header */}
        <Navbar activePage={activePage} setActivePage={handlePageChange} />

        {/* Main Content View Switcher */}
        <main className="flex-grow">
          {activePage === 'home' && (
            <HomePage setActivePage={handlePageChange} />
          )}

          {activePage === 'services' && (
            <ServicesPage setActivePage={handlePageChange} />
          )}

          {activePage === 'fleet' && (
            <FleetPage setActivePage={handlePageChange} />
          )}

          {activePage === 'safety' && (
            <SafetyCompliancePage setActivePage={handlePageChange} />
          )}

          {activePage === 'industries' && (
            <IndustriesPage setActivePage={handlePageChange} />
          )}

          {activePage === 'corridors' && (
            <RegionalCorridorsPage setActivePage={handlePageChange} />
          )}

          {activePage === 'corporate-logistics' && (
            <CorporateLogisticsPage setActivePage={handlePageChange} />
          )}

          {activePage === 'how-it-works' && (
            <OperationsPage setActivePage={handlePageChange} />
          )}

          {activePage === 'about' && (
            <AboutPage setActivePage={handlePageChange} />
          )}

          {activePage === 'contact' && (
            <ContactPage setActivePage={handlePageChange} />
          )}

          {activePage === 'delivery-request' && (
            <DeliveryRequestPage 
              setActivePage={handlePageChange} 
              onSuccess={(trackingId) => {
                setTrackingIdToOpen(trackingId);
                setActivePage('track');
              }} 
            />
          )}

          {activePage === 'track' && (
            <TrackDeliveryPage 
              initialTrackingId={trackingIdToOpen || undefined}
              onOpenPodModal={handleOpenPod}
            />
          )}

          {activePage === 'quote' && (
            <QuotePage setActivePage={handlePageChange} />
          )}

          {activePage === 'customer-portal' && (
            <CustomerPortal 
              setActivePage={handlePageChange}
              onOpenTrackingModal={handleOpenTracking}
              onOpenPodModal={handleOpenPod}
              onOpenInvoiceModal={handleOpenInvoice}
            />
          )}

          {activePage === 'driver-portal' && (
            <DriverPortal 
              setActivePage={handlePageChange}
              onOpenPodModal={handleOpenPod}
            />
          )}

          {activePage === 'operations-dashboard' && (
            <OperationsDashboard 
              setActivePage={handlePageChange}
              onOpenTrackingModal={handleOpenTracking}
              onOpenPodModal={handleOpenPod}
            />
          )}

          {activePage === 'admin-dashboard' && (
            <AdminDashboard 
              setActivePage={handlePageChange}
              onOpenTrackingModal={handleOpenTracking}
              onOpenPodModal={handleOpenPod}
              onOpenInvoiceModal={handleOpenInvoice}
            />
          )}

          {activePage === 'privacy' && (
            <LegalPages pageType="privacy" setActivePage={handlePageChange} />
          )}

          {activePage === 'terms' && (
            <LegalPages pageType="terms" setActivePage={handlePageChange} />
          )}

          {activePage === 'safety-disclaimer' && (
            <LegalPages pageType="safety-disclaimer" setActivePage={handlePageChange} />
          )}
        </main>

        {/* Industrial Footer */}
        <Footer setActivePage={handlePageChange} />

        {/* Floating 24/7 WhatsApp Dispatch Trigger */}
        <WhatsAppFloatingButton />

        {/* Modals */}
        <ProofOfDeliveryModal 
          podId={activePodId}
          onClose={() => setActivePodId(null)}
        />

        <InvoiceModal 
          invoice={activeInvoice}
          onClose={() => setActiveInvoice(null)}
        />

      </div>
    </FirebaseProvider>
  );
}
