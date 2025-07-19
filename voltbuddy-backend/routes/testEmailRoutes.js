// Test endpoint for PDF email functionality
const express = require('express');
const router = express.Router();

// Simple test route to check if email service works
router.post('/test-pdf-email', async (req, res) => {
  try {
    console.log('🧪 Testing PDF email functionality...');
    
    const { testEmail } = req.body;
    
    if (!testEmail) {
      return res.status(400).json({
        success: false,
        message: 'Test email address is required'
      });
    }

    // Test data
    const testData = {
      title: 'Test AI Insights Report',
      generatedDate: new Date().toLocaleDateString(),
      sections: {
        energyTips: {
          data: [
            {
              title: 'Switch to LED Bulbs',
              description: 'LED bulbs use up to 80% less energy than traditional incandescent bulbs.'
            }
          ]
        },
        costStrategies: {
          data: [
            {
              title: 'Time-of-Use Optimization',
              description: 'Run appliances during off-peak hours.',
              potentialSavings: '$15-30 per month'
            }
          ]
        },
        predictions: {
          data: {
            predictionTable: [
              {
                month: 'January 2025',
                currentConsumption: 450,
                predictedConsumption: 420
              }
            ],
            insights: ['Test insight message']
          }
        }
      }
    };

    // Import required modules
    const PDFDocument = require('pdfkit');
    const emailService = require('../utils/emailService');

    // Generate test PDF buffer
    const pdfBuffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers = [];
      
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);
      
      // Simple PDF content
      doc.fontSize(20).text('VoltBuddy Test Report', 50, 50);
      doc.fontSize(12).text('This is a test PDF for email functionality.', 50, 100);
      doc.end();
    });

    console.log(`📧 Generated test PDF buffer: ${pdfBuffer.length} bytes`);

    // Send test email
    await emailService.sendInsightsPDFEmail(testEmail, {
      ...testData,
      pdfBuffer
    });

    res.json({
      success: true,
      message: `Test PDF email sent successfully to ${testEmail}`,
      pdfSize: pdfBuffer.length
    });

  } catch (error) {
    console.error('❌ Test PDF email failed:', error);
    res.status(500).json({
      success: false,
      message: 'Test failed',
      error: error.message
    });
  }
});

module.exports = router;
