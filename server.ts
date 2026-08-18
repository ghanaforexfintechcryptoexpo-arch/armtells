import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health API
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Armtells Transport Services Operations API',
      timestamp: new Date().toISOString(),
      version: '2026.1.0'
    });
  });

  // Quotation calculation endpoint
  app.post('/api/calculate-quote', (req, res) => {
    try {
      const { product, quantity, distanceKm = 50, urgency = 'STANDARD', specialHandling = false } = req.body;
      
      const parsedQty = parseFloat(quantity) || 0;
      const parsedDistance = parseFloat(distanceKm) || 45;

      // Base logistics pricing rate matrix (configurable via admin)
      let perLitreTransportRate = 0.085; // $0.085 or GHS per litre base
      if (parsedQty >= 36000) {
        perLitreTransportRate = 0.065; // Volume discount
      } else if (parsedQty >= 18000) {
        perLitreTransportRate = 0.075;
      }

      const distanceRatePerKm = 3.5; // per km tanker haulage
      let baseTransportCost = (parsedQty * perLitreTransportRate) + (parsedDistance * distanceRatePerKm);
      
      let urgencyMultiplier = 1.0;
      if (urgency === 'URGENT_24H') urgencyMultiplier = 1.25;
      if (urgency === 'EMERGENCY_SAME_DAY') urgencyMultiplier = 1.45;

      let handlingFee = specialHandling ? 250 : 0;
      const subtotal = Math.round((baseTransportCost * urgencyMultiplier) + handlingFee);
      const tax = Math.round(subtotal * 0.15); // 15% statutory/logistics levy
      const total = subtotal + tax;

      res.json({
        success: true,
        calculation: {
          product,
          quantity: parsedQty,
          distanceKm: parsedDistance,
          urgency,
          baseRate: perLitreTransportRate,
          subtotal,
          tax,
          total,
          currency: 'USD / GHS Equiv',
          notes: 'Estimated tanker transportation logistics fee. Subject to depot queue and terminal clearance confirmation.'
        }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Armtells Logistics Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
