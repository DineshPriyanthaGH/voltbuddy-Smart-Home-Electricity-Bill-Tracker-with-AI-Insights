const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const { sendBillHistoryEmail } = require('../utils/emailService');
const { authMiddleware } = require('../middleware/authMiddleware');

// Helper function to add header to PDF
function addHeader(doc) {
  doc.fillColor('#2441E1')
     .rect(0, 0, doc.page.width, 80)
     .fill();
  
  doc.fontSize(18)
     .fillColor('white')
     .text('VOLTBUDDY', 50, 30)
     .fontSize(10)
     .text('Smart Home Electricity Bill Tracker', 50, 55);
}

// Helper function to add summary section to PDF
function addSummarySection(doc, summary) {
  const startY = 220;
  
  doc.fontSize(16)
     .fillColor('#2441E1')
     .text('Bill Summary Overview', 50, startY);
  
  // Summary cards
  const cardWidth = 120;
  const cardHeight = 80;
  const spacing = 10;
  
  const summaryData = [
    { label: 'Total Amount', value: `$${summary.totalAmount.toFixed(2)}`, color: '#3B82F6' },
    { label: 'Total Consumption', value: `${summary.totalConsumption.toFixed(2)} kWh`, color: '#10B981' },
    { label: 'Average Bill', value: `$${summary.averageAmount.toFixed(2)}`, color: '#F59E0B' },
    { label: 'Avg Consumption', value: `${summary.averageConsumption.toFixed(2)} kWh`, color: '#8B5CF6' }
  ];
  
  summaryData.forEach((item, index) => {
    const x = 50 + (index * (cardWidth + spacing));
    const y = startY + 30;
    
    // Card background
    doc.fillColor(item.color)
       .rect(x, y, cardWidth, cardHeight)
       .fill();
    
    // Card content
    doc.fontSize(10)
       .fillColor('white')
       .text(item.label, x + 5, y + 10, { width: cardWidth - 10, align: 'center' })
       .fontSize(14)
       .text(item.value, x + 5, y + 35, { width: cardWidth - 10, align: 'center' });
  });
  
  // Status summary
  doc.fontSize(12)
     .fillColor('#333333')
     .text(`Paid Bills: ${summary.paidCount}`, 50, startY + 130)
     .text(`Unpaid Bills: ${summary.unpaidCount}`, 200, startY + 130);
}

// Helper function to add bill table to PDF
function addBillTable(doc, bills, title, color) {
  const currentY = doc.y + 40;
  
  // Check if we need a new page
  if (currentY > doc.page.height - 200) {
    doc.addPage();
    doc.y = 50;
  }
  
  doc.fontSize(14)
     .fillColor(color)
     .text(title, 50, doc.y + 20);
  
  const tableTop = doc.y + 50;
  const tableLeft = 50;
  const columnWidths = [120, 80, 100, 80, 100];
  const headers = ['Billing Period', 'Amount', 'Consumption', 'Status', 'Due Date'];
  
  // Table header
  doc.fillColor('#F3F4F6')
     .rect(tableLeft, tableTop, columnWidths.reduce((a, b) => a + b), 25)
     .fill();
  
  let currentX = tableLeft;
  headers.forEach((header, index) => {
    doc.fontSize(10)
       .fillColor('#374151')
       .text(header, currentX + 5, tableTop + 8, { width: columnWidths[index] - 10 });
    currentX += columnWidths[index];
  });
  
  // Table rows
  bills.forEach((bill, index) => {
    const rowY = tableTop + 25 + (index * 25);
    
    // Alternate row colors
    if (index % 2 === 0) {
      doc.fillColor('#F9FAFB')
         .rect(tableLeft, rowY, columnWidths.reduce((a, b) => a + b), 25)
         .fill();
    }
    
    const rowData = [
      `${bill.month} ${bill.year}`,
      `$${bill.billAmount || 0}`,
      `${bill.consumption || 0} kWh`,
      bill.status || 'Unknown',
      bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : 'N/A'
    ];
    
    currentX = tableLeft;
    rowData.forEach((data, colIndex) => {
      doc.fontSize(9)
         .fillColor('#374151')
         .text(data, currentX + 5, rowY + 8, { width: columnWidths[colIndex] - 10 });
      currentX += columnWidths[colIndex];
    });
  });
  
  doc.y = tableTop + 25 + (bills.length * 25) + 20;
}

// Helper function to add consumption analysis to PDF
function addConsumptionAnalysis(doc, billHistory) {
  if (doc.y > doc.page.height - 150) {
    doc.addPage();
    doc.y = 50;
  }
  
  doc.fontSize(14)
     .fillColor('#2441E1')
     .text('Consumption Analysis', 50, doc.y + 20);
  
  const analysisY = doc.y + 50;
  
  // Calculate trends
  const sortedBills = billHistory.sort((a, b) => {
    const dateA = new Date(`${a.month} ${a.year}`);
    const dateB = new Date(`${b.month} ${b.year}`);
    return dateA - dateB;
  });
  
  if (sortedBills.length >= 2) {
    const firstBill = sortedBills[0];
    const lastBill = sortedBills[sortedBills.length - 1];
    const consumptionChange = lastBill.consumption - firstBill.consumption;
    const amountChange = lastBill.billAmount - firstBill.billAmount;
    
    doc.fontSize(12)
       .fillColor('#374151')
       .text('Consumption Trends:', 50, analysisY)
       .text(`• Consumption Change: ${consumptionChange > 0 ? '+' : ''}${consumptionChange.toFixed(2)} kWh`, 70, analysisY + 20)
       .text(`• Bill Amount Change: ${amountChange > 0 ? '+' : ''}$${amountChange.toFixed(2)}`, 70, analysisY + 40)
       .text(`• Period: ${firstBill.month} ${firstBill.year} to ${lastBill.month} ${lastBill.year}`, 70, analysisY + 60);
  }
  
  doc.y = analysisY + 100;
}

// Helper function to add footer to PDF
function addFooter(doc) {
  const footerY = doc.page.height - 100;
  
  doc.fontSize(10)
     .fillColor('#6B7280')
     .text('This report was generated by VoltBuddy - Smart Home Electricity Bill Tracker', 50, footerY, { align: 'center' })
     .text(`Generated on ${new Date().toLocaleString()}`, 50, footerY + 15, { align: 'center' })
     .text('For support, contact: support@voltbuddy.com', 50, footerY + 30, { align: 'center' });
}

// Main function to generate PDF
async function generateBillHistoryPDF(billHistory, userEmail) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        size: 'A4', 
        margin: 50,
        bufferPages: true
      });
      
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // Calculate summary statistics
      const paidBills = billHistory.filter(bill => bill.status === 'Paid');
      const unpaidBills = billHistory.filter(bill => bill.status === 'Unpaid');
      const totalAmount = billHistory.reduce((sum, bill) => sum + (bill.billAmount || 0), 0);
      const totalConsumption = billHistory.reduce((sum, bill) => sum + (bill.consumption || 0), 0);
      const averageAmount = billHistory.length > 0 ? (totalAmount / billHistory.length) : 0;
      const averageConsumption = billHistory.length > 0 ? (totalConsumption / billHistory.length) : 0;

      // Add sections to PDF
      addHeader(doc);
      
      // Title and User Info
      doc.fontSize(24)
         .fillColor('#2441E1')
         .text('VoltBuddy Bill History Report', 50, 120, { align: 'center' });
      
      doc.fontSize(12)
         .fillColor('#666666')
         .text(`Generated for: ${userEmail}`, 50, 160)
         .text(`Report Date: ${new Date().toLocaleDateString()}`, 50, 175)
         .text(`Total Bills: ${billHistory.length}`, 50, 190);

      // Summary Section
      addSummarySection(doc, {
        totalAmount,
        totalConsumption,
        averageAmount,
        averageConsumption,
        paidCount: paidBills.length,
        unpaidCount: unpaidBills.length
      });

      // Paid Bills Table
      if (paidBills.length > 0) {
        addBillTable(doc, paidBills, 'Paid Bills', '#10B981');
      }

      // Unpaid Bills Table
      if (unpaidBills.length > 0) {
        addBillTable(doc, unpaidBills, 'Unpaid Bills', '#EF4444');
      }

      // Consumption Analysis
      addConsumptionAnalysis(doc, billHistory);

      // Footer
      addFooter(doc);

      doc.end();

    } catch (error) {
      reject(error);
    }
  });
}

// Route: Generate Bill History PDF and Send Email
router.post('/send-bill-history-email', authMiddleware, async (req, res) => {
  try {
    const { userEmail, billHistory } = req.body;

    if (!userEmail || !billHistory || !Array.isArray(billHistory)) {
      return res.status(400).json({ error: 'User email and bill history data are required' });
    }

    // Generate PDF Buffer
    const pdfBuffer = await generateBillHistoryPDF(billHistory, userEmail);

    // Send Email with PDF
    await sendBillHistoryEmail(userEmail, pdfBuffer, billHistory);

    res.json({ 
      success: true, 
      message: 'Bill history report sent successfully to your email!' 
    });

  } catch (error) {
    console.error('Error sending bill history email:', error);
    res.status(500).json({ 
      error: 'Failed to send bill history report', 
      details: error.message 
    });
  }
});

// Route: Generate and Download PDF Only
router.post('/generate-pdf', authMiddleware, async (req, res) => {
  try {
    const { billHistory, userEmail } = req.body;

    if (!billHistory || !Array.isArray(billHistory)) {
      return res.status(400).json({ error: 'Bill history data is required' });
    }

    // Generate PDF Buffer
    const pdfBuffer = await generateBillHistoryPDF(billHistory, userEmail);

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="VoltBuddy-Bill-History-${new Date().toISOString().split('T')[0]}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send PDF buffer
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF', 
      details: error.message 
    });
  }
});

// Simple test route
router.get('/test', (req, res) => {
  res.json({ message: 'Bill history email routes working' });
});

module.exports = router;
