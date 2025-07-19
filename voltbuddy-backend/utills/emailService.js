const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
  port: Number(process.env.SMTP_PORT), // e.g. 587
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter configuration error:', error);
  } else {
    console.log('✅ Email server is ready to take our messages');
  }
});

async function sendNotificationEmail(to, subject, text, html) {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    console.log(`📋 Subject: ${subject}`);
    
    const result = await transporter.sendMail({
      from: '"VoltBuddy" <noreply@voltbuddy.com>',
      to,
      subject,
      text,
      html
    });
    
    console.log('✅ Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}

async function sendInsightsPDFEmail(to, data) {
  try {
    console.log(`📧 Sending AI Insights PDF to: ${to}`);
    
    const { title, generatedDate, sections, pdfBuffer } = data;
    
    // Count items for summary
    const energyTipsCount = sections.energyTips?.data?.length || 0;
    const strategiesCount = sections.costStrategies?.data?.length || 0;
    const hasPredictions = sections.predictions?.data?.predictionTable?.length > 0;
    
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>VoltBuddy AI Insights Report</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #2441E1 0%, #3B82F6 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .header p {
          margin: 10px 0 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
        }
        .section {
          margin-bottom: 30px;
          padding: 20px;
          background: #f1f5f9;
          border-radius: 8px;
          border-left: 4px solid #2441E1;
        }
        .section h3 {
          margin: 0 0 15px 0;
          color: #2441E1;
          font-size: 18px;
        }
        .stats {
          display: flex;
          gap: 20px;
          margin: 20px 0;
          flex-wrap: wrap;
        }
        .stat {
          background: white;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          min-width: 120px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .stat-number {
          font-size: 24px;
          font-weight: bold;
          color: #2441E1;
          margin-bottom: 5px;
        }
        .stat-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 600;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #2441E1 0%, #3B82F6 100%);
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin-top: 20px;
          transition: transform 0.2s;
        }
        .button:hover {
          transform: translateY(-2px);
        }
        .footer {
          background: #f1f5f9;
          padding: 30px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
          border-top: 1px solid #e2e8f0;
        }
        .attachment-note {
          background: #dcfce7;
          border: 1px solid #86efac;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          color: #166534;
        }
        .attachment-note strong {
          color: #15803d;
        }
        @media (max-width: 600px) {
          .stats {
            flex-direction: column;
          }
          .stat {
            min-width: auto;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔌 VoltBuddy AI Insights Report</h1>
          <p>Your personalized energy optimization guide</p>
        </div>
        
        <div class="content">
          <h2>Hello!</h2>
          <p>Your comprehensive AI insights report has been generated successfully. This report contains personalized recommendations to help you optimize your energy consumption and reduce electricity costs.</p>
          
          <div class="attachment-note">
            <strong>📎 PDF Report Attached</strong><br>
            Your detailed insights report is attached as a PDF document. Please download it to view all recommendations and analysis.
          </div>
          
          <div class="section">
            <h3>📊 Report Summary</h3>
            <p><strong>Generated:</strong> ${generatedDate}</p>
            
            <div class="stats">
              <div class="stat">
                <div class="stat-number">${energyTipsCount}</div>
                <div class="stat-label">Energy Tips</div>
              </div>
              <div class="stat">
                <div class="stat-number">${strategiesCount}</div>
                <div class="stat-label">Cost Strategies</div>
              </div>
              <div class="stat">
                <div class="stat-number">${hasPredictions ? '✅' : '➖'}</div>
                <div class="stat-label">Predictions</div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>🎯 What's Inside</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>Energy Saving Tips:</strong> Personalized recommendations to reduce consumption</li>
              <li><strong>Cost Reduction Strategies:</strong> Actionable plans to lower your electricity bills</li>
              <li><strong>Consumption Predictions:</strong> AI-powered forecasts for better planning</li>
              <li><strong>Professional Analysis:</strong> Detailed insights with charts and data</li>
            </ul>
          </div>
          
          <div class="section">
            <h3>💡 Next Steps</h3>
            <p>Review the attached PDF for detailed insights and start implementing the recommended energy-saving strategies. Regular monitoring through your VoltBuddy dashboard will help track your progress.</p>
          </div>
          
          <div style="text-align: center;">
            <a href="http://localhost:3000/dashboard" class="button">
              🏠 Visit Dashboard
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>VoltBuddy</strong> - Smart Home Electricity Bill Tracker</p>
          <p>This email was generated automatically. For support, contact us through the app.</p>
          <p style="margin-top: 20px; font-size: 12px;">
            © 2025 VoltBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
    `;

    const result = await transporter.sendMail({
      from: '"VoltBuddy AI Insights" <insights@voltbuddy.com>',
      to,
      subject: `🔌 Your VoltBuddy AI Insights Report - ${generatedDate}`,
      html: htmlContent,
      attachments: [
        {
          filename: `VoltBuddy-AI-Insights-${new Date().toISOString().split('T')[0]}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });
    
    console.log('✅ AI Insights PDF email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending AI Insights PDF email:', error);
    throw error;
  }
}

module.exports = { sendNotificationEmail, sendInsightsPDFEmail };
