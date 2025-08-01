const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const PDFDocument = require('pdfkit');
const emailService = require('../utils/emailService');
const router = express.Router();

// Generate PDF route
router.post('/generate-pdf', authMiddleware, async (req, res) => {
  try {
    console.log('🔄 Generating AI Insights PDF...');
    const { title, generatedDate, sections } = req.body;
    
    // Create a new PDF document with better formatting
    const doc = new PDFDocument({ 
      margin: 60,
      size: 'A4',
      bufferPages: true
    });
    
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="VoltBuddy-AI-Insights-${new Date().toISOString().split('T')[0]}.pdf"`);
    
    // Pipe the PDF to the response
    doc.pipe(res);
    
    // Header with logo space and title
    doc.rect(50, 40, 500, 80)
       .fillAndStroke('#2441E1', '#2441E1');
    
    doc.fontSize(28)
       .fillColor('#FFFFFF')
       .text('⚡ VoltBuddy', 70, 60, { width: 460 });
    
    doc.fontSize(16)
       .fillColor('#E0E7FF')
       .text('Smart Home Electricity Bill Tracker', 70, 90);
    
    // Main title
    doc.fontSize(24)
       .fillColor('#2441E1')
       .text(title || 'AI Insights Report', 60, 150, { 
         width: 480, 
         align: 'center' 
       });
    
    // Generation date
    doc.fontSize(12)
       .fillColor('#666666')
       .text(`Generated on: ${generatedDate}`, 60, 180, { 
         width: 480, 
         align: 'center' 
       });
    
    // Add separator line
    doc.moveTo(60, 210)
       .lineTo(540, 210)
       .strokeColor('#e2e8f0')
       .lineWidth(2)
       .stroke();
    
    let currentY = 240;
    
    // Add Energy Tips section with better formatting
    if (sections.energyTips && sections.energyTips.data && sections.energyTips.data.length > 0) {
      currentY = addImprovedSection(doc, 'Energy Saving Tips', sections.energyTips.data, currentY, '💡');
    }
    
    // Add Cost Strategies section
    if (sections.costStrategies && sections.costStrategies.data && sections.costStrategies.data.length > 0) {
      currentY = addImprovedSection(doc, 'Cost Reduction Strategies', sections.costStrategies.data, currentY, '💰');
    }
    
    // Add Predictions section
    if (sections.predictions && sections.predictions.data) {
      currentY = addPredictionSectionImproved(doc, sections.predictions.data, currentY);
    }
    
    // Add footer on last page
    const pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      
      // Add page number
      doc.fontSize(10)
         .fillColor('#999999')
         .text(`Page ${i + 1} of ${pages.count}`, 60, doc.page.height - 60, {
           width: 480,
           align: 'right'
         });
      
      // Add footer only on last page
      if (i === pages.count - 1) {
        doc.fontSize(10)
           .fillColor('#666666')
           .text('Generated by VoltBuddy - Smart Home Electricity Bill Tracker with AI Insights', 60, doc.page.height - 40, {
             width: 480,
             align: 'center'
           });
      }
    }
    
    // Finalize the PDF
    doc.end();
    
    console.log('✅ PDF generated successfully');
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF',
      error: error.message
    });
  }
});

// Send PDF via email route
router.post('/send-pdf-email', authMiddleware, async (req, res) => {
  try {
    console.log('📧 Sending AI Insights PDF via email...');
    const { title, generatedDate, sections } = req.body;
    const userEmail = req.user.email;
    
    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'User email not found'
      });
    }
    
    console.log(`📧 Generating PDF for email to: ${userEmail}`);
    
    // Generate PDF buffer
    const pdfBuffer = await generatePDFBuffer(title, generatedDate, sections);
    
    console.log(`📧 PDF buffer generated, size: ${pdfBuffer.length} bytes`);
    
    // Send email with PDF attachment
    await emailService.sendInsightsPDFEmail(userEmail, {
      title: title || 'AI Insights Report',
      generatedDate,
      sections,
      pdfBuffer
    });
    
    res.json({
      success: true,
      message: 'AI Insights report sent successfully',
      sentTo: userEmail
    });
    
    console.log(`✅ AI Insights PDF sent to: ${userEmail}`);
    
  } catch (error) {
    console.error('❌ Error sending PDF email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send PDF email',
      error: error.message
    });
  }
});

// Helper function to add improved sections to PDF
function addImprovedSection(doc, title, items, startY, emoji) {
  let currentY = startY;
  
  // Check if we need a new page
  if (currentY > 650) {
    doc.addPage();
    currentY = 80;
  }
  
  // Section header with background
  doc.rect(60, currentY - 10, 480, 40)
     .fillAndStroke('#f8fafc', '#e2e8f0');
  
  // Section title with emoji
  doc.fontSize(18)
     .fillColor('#2441E1')
     .text(`${emoji} ${title}`, 80, currentY + 5);
  
  currentY += 50;
  
  // Section items with better spacing
  doc.fontSize(11)
     .fillColor('#000000');
  
  items.forEach((item, index) => {
    if (currentY > 720) {
      doc.addPage();
      currentY = 80;
    }
    
    // Item background (alternating colors)
    const bgColor = index % 2 === 0 ? '#ffffff' : '#f9fafb';
    doc.rect(60, currentY - 5, 480, 60)
       .fillAndStroke(bgColor, '#e5e7eb');
    
    // Item title
    doc.fontSize(12)
       .fillColor('#1f2937')
       .text(`${index + 1}. ${item.title || 'Recommendation'}`, 80, currentY + 5, {
         width: 440
       });
    
    // Item description
    doc.fontSize(10)
       .fillColor('#4b5563')
       .text(item.description || 'No description available', 80, currentY + 25, {
         width: 440,
         height: 25
       });
    
    // Additional info for cost strategies
    if (item.potentialSavings) {
      doc.fontSize(10)
         .fillColor('#059669')
         .text(`💵 Potential Savings: ${item.potentialSavings}`, 80, currentY + 45);
    }
    
    currentY += 70;
  });
  
  return currentY + 20;
}

// Helper function to add improved prediction section
function addPredictionSectionImproved(doc, predictionData, startY) {
  let currentY = startY;
  
  // Check if we need a new page
  if (currentY > 600) {
    doc.addPage();
    currentY = 80;
  }
  
  // Section header
  doc.rect(60, currentY - 10, 480, 40)
     .fillAndStroke('#f8fafc', '#e2e8f0');
  
  doc.fontSize(18)
     .fillColor('#2441E1')
     .text('📊 Energy Consumption Predictions', 80, currentY + 5);
  
  currentY += 60;
  
  // Table header
  doc.rect(60, currentY, 480, 30)
     .fillAndStroke('#2441E1', '#2441E1');
  
  doc.fontSize(12)
     .fillColor('#ffffff')
     .text('Month', 80, currentY + 8)
     .text('Current (kWh)', 180, currentY + 8)
     .text('Predicted (kWh)', 300, currentY + 8)
     .text('Variance', 420, currentY + 8);
  
  currentY += 30;
  
  // Table data with improved formatting
  if (predictionData.predictionTable && predictionData.predictionTable.length > 0) {
    predictionData.predictionTable.forEach((row, index) => {
      if (currentY > 720) {
        doc.addPage();
        currentY = 80;
      }
      
      // Alternating row colors
      const bgColor = index % 2 === 0 ? '#ffffff' : '#f9fafb';
      doc.rect(60, currentY, 480, 25)
         .fillAndStroke(bgColor, '#e5e7eb');
      
      const variance = row.currentConsumption && row.predictedConsumption 
        ? (row.predictedConsumption - row.currentConsumption).toFixed(1)
        : 'N/A';
      
      const varianceColor = variance > 0 ? '#dc2626' : '#059669';
      
      doc.fontSize(10)
         .fillColor('#374151')
         .text(row.month || 'N/A', 80, currentY + 7)
         .text(row.currentConsumption ? row.currentConsumption.toFixed(1) : 'N/A', 180, currentY + 7)
         .text(row.predictedConsumption ? row.predictedConsumption.toFixed(1) : 'N/A', 300, currentY + 7);
      
      doc.fillColor(varianceColor)
         .text(variance !== 'N/A' ? `${variance > 0 ? '+' : ''}${variance}` : variance, 420, currentY + 7);
      
      currentY += 25;
    });
  } else {
    doc.fontSize(11)
       .fillColor('#6b7280')
       .text('No prediction data available', 80, currentY + 10);
    currentY += 30;
  }
  
  // Add insights if available
  if (predictionData.insights && predictionData.insights.length > 0) {
    currentY += 20;
    
    doc.rect(60, currentY - 10, 480, 30)
       .fillAndStroke('#fef3c7', '#f59e0b');
    
    doc.fontSize(14)
       .fillColor('#92400e')
       .text('🔍 Key Insights', 80, currentY + 2);
    
    currentY += 40;
    
    predictionData.insights.forEach((insight, index) => {
      if (currentY > 720) {
        doc.addPage();
        currentY = 80;
      }
      
      doc.fontSize(10)
         .fillColor('#374151')
         .text(`• ${insight}`, 80, currentY, { 
           width: 440,
           lineGap: 5
         });
      
      currentY += 25;
    });
  }
  
  return currentY + 20;
}

// Helper function to generate PDF buffer for email
async function generatePDFBuffer(title, generatedDate, sections) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ 
      margin: 60,
      size: 'A4',
      bufferPages: true
    });
    
    const buffers = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      console.log(`✅ PDF buffer generated successfully, size: ${pdfData.length} bytes`);
      resolve(pdfData);
    });
    doc.on('error', (error) => {
      console.error('❌ PDF generation error:', error);
      reject(error);
    });
    
    try {
      // Header with logo space and title
      doc.rect(50, 40, 500, 80)
         .fillAndStroke('#2441E1', '#2441E1');
      
      doc.fontSize(28)
         .fillColor('#FFFFFF')
         .text('⚡ VoltBuddy', 70, 60, { width: 460 });
      
      doc.fontSize(16)
         .fillColor('#E0E7FF')
         .text('Smart Home Electricity Bill Tracker', 70, 90);
      
      // Main title
      doc.fontSize(24)
         .fillColor('#2441E1')
         .text(title || 'AI Insights Report', 60, 150, { 
           width: 480, 
           align: 'center' 
         });
      
      // Generation date
      doc.fontSize(12)
         .fillColor('#666666')
         .text(`Generated on: ${generatedDate}`, 60, 180, { 
           width: 480, 
           align: 'center' 
         });
      
      // Add separator line
      doc.moveTo(60, 210)
         .lineTo(540, 210)
         .strokeColor('#e2e8f0')
         .lineWidth(2)
         .stroke();
      
      let currentY = 240;
      
      // Add sections with same formatting as download version
      if (sections.energyTips && sections.energyTips.data && sections.energyTips.data.length > 0) {
        currentY = addImprovedSection(doc, 'Energy Saving Tips', sections.energyTips.data, currentY, '💡');
      }
      
      if (sections.costStrategies && sections.costStrategies.data && sections.costStrategies.data.length > 0) {
        currentY = addImprovedSection(doc, 'Cost Reduction Strategies', sections.costStrategies.data, currentY, '💰');
      }
      
      if (sections.predictions && sections.predictions.data) {
        currentY = addPredictionSectionImproved(doc, sections.predictions.data, currentY);
      }
      
      // Add footer on all pages
      const pages = doc.bufferedPageRange();
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        
        // Add page number
        doc.fontSize(10)
           .fillColor('#999999')
           .text(`Page ${i + 1} of ${pages.count}`, 60, doc.page.height - 60, {
             width: 480,
             align: 'right'
           });
        
        // Add footer only on last page
        if (i === pages.count - 1) {
          doc.fontSize(10)
             .fillColor('#666666')
             .text('Generated by VoltBuddy - Smart Home Electricity Bill Tracker with AI Insights', 60, doc.page.height - 40, {
               width: 480,
               align: 'center'
             });
        }
      }
      
      doc.end();
      
    } catch (error) {
      console.error('❌ Error in PDF generation:', error);
      reject(error);
    }
  });
}

module.exports = router;
