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

async function sendProfileUpdateEmail(to, username, updatedFields) {
  try {
    console.log('🔧 sendProfileUpdateEmail called with:', { to, username, updatedFields });
    
    const subject = "Profile Updated - VoltBuddy";
    
    // Create a list of updated fields
    const fieldLabels = {
      username: 'Username',
      firstName: 'First Name',
      lastName: 'Last Name',
      address: 'Address',
      contactNo: 'Contact Number',
      dateOfBirth: 'Date of Birth',
      profileImage: 'Profile Image'
    };

    const updatedFieldsList = Object.keys(updatedFields)
      .map(field => `• ${fieldLabels[field] || field}: ${updatedFields[field]}`)
      .join('\n');

    const text = `
Hello ${username},

Your VoltBuddy profile has been successfully updated!

Updated Information:
${updatedFieldsList}

Update Time: ${new Date().toLocaleString()}

If you didn't make these changes, please contact our support team immediately.

Best regards,
VoltBuddy Team
    `;

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Updated - VoltBuddy</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #2441E1, #3B82F6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Profile Updated</h1>
        <p style="color: #E0E7FF; margin: 10px 0 0 0; font-size: 16px;">Your VoltBuddy account information has been updated</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #2441E1; margin-top: 0;">Hello ${username}! 👋</h2>
        <p style="margin-bottom: 20px;">Your VoltBuddy profile has been successfully updated with the following changes:</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2441E1;">
            <h3 style="color: #333; margin-top: 0;">Updated Information:</h3>
            ${Object.keys(updatedFields).map(field => 
              `<p style="margin: 8px 0; padding: 8px; background: #f1f5f9; border-radius: 4px;">
                <strong>${fieldLabels[field] || field}:</strong> ${updatedFields[field]}
              </p>`
            ).join('')}
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e1f5fe; border-radius: 8px; border-left: 4px solid #0288d1;">
            <p style="margin: 0; color: #01579b;">
                <strong>🕒 Update Time:</strong> ${new Date().toLocaleString()}
            </p>
        </div>
    </div>
    
    <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; margin-bottom: 25px;">
        <h3 style="color: #856404; margin-top: 0;">⚠️ Security Notice</h3>
        <p style="margin: 0; color: #856404;">
            If you didn't make these changes, please contact our support team immediately at 
            <a href="mailto:support@voltbuddy.com" style="color: #2441E1;">support@voltbuddy.com</a>
        </p>
    </div>
    
    <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px;">
        <p style="margin: 0; color: #666;">
            Best regards,<br>
            <strong style="color: #2441E1;">VoltBuddy Team</strong>
        </p>
        <div style="margin-top: 20px;">
            <a href="http://localhost:3000/dashboard" 
               style="background: linear-gradient(135deg, #2441E1, #3B82F6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Go to Dashboard
            </a>
        </div>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 12px; margin: 0;">
            This is an automated message from VoltBuddy. Please do not reply to this email.
        </p>
    </div>
</body>
</html>
    `;

    return await sendNotificationEmail(to, subject, text, html);
  } catch (error) {
    console.error('❌ Error sending profile update email:', error);
    throw error;
  }
}

async function sendBillTrackingEmail(user, billDetails) {
  try {
    console.log('📧 sendBillTrackingEmail called with:', { 
      userEmail: user.email, 
      billAmount: billDetails.billAmount,
      month: billDetails.month,
      year: billDetails.year 
    });
    
    const subject = `Bill Tracking Started - ${billDetails.month} ${billDetails.year} - VoltBuddy`;
    
    // Format the due date
    const dueDate = new Date(billDetails.dueDate);
    const formattedDueDate = dueDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Calculate days until due
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    const text = `
Hello ${user.firstName || user.username || 'Valued Customer'},

Your electricity bill tracking has started for ${billDetails.month} ${billDetails.year}!

Bill Details:
• Billing Period: ${billDetails.month} ${billDetails.year}
• Bill Amount: Rs. ${billDetails.billAmount.toFixed(2)}
• Energy Consumption: ${billDetails.consumption} kWh
• Energy Charge: Rs. ${billDetails.energyCharge?.toFixed(2) || 'N/A'}
• Fixed Charge: Rs. ${billDetails.fixedCharge?.toFixed(2) || 'N/A'}
• SSCL (2.5%): Rs. ${billDetails.sscl?.toFixed(2) || 'N/A'}
• Due Date: ${formattedDueDate}
• Days Until Due: ${daysUntilDue} days

Your bill has been added to your VoltBuddy dashboard for tracking and management. You'll receive reminders as the due date approaches.

Manage your bill: Log in to your VoltBuddy dashboard to view detailed analytics and energy-saving tips.

Best regards,
VoltBuddy Team
    `;

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bill Tracking Started - VoltBuddy</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #2441E1, #3B82F6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 28px;">📊 Bill Tracking Started</h1>
        <p style="color: #E0E7FF; margin: 10px 0 0 0; font-size: 16px;">${billDetails.month} ${billDetails.year} Electricity Bill</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #2441E1; margin-top: 0;">Hello ${user.firstName || user.username || 'Valued Customer'}! 👋</h2>
        <p style="margin-bottom: 20px;">Your electricity bill tracking has started! Here are your bill details:</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2441E1; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0; display: flex; align-items: center;">
                💡 Bill Summary
            </h3>
            <div style="display: grid; gap: 12px;">
                <div style="padding: 12px; background: #f1f5f9; border-radius: 6px; display: flex; justify-content: space-between;">
                    <span><strong>Billing Period:</strong></span>
                    <span style="color: #2441E1; font-weight: bold;">${billDetails.month} ${billDetails.year}</span>
                </div>
                <div style="padding: 12px; background: #f1f5f9; border-radius: 6px; display: flex; justify-content: space-between;">
                    <span><strong>Total Amount:</strong></span>
                    <span style="color: #dc2626; font-weight: bold; font-size: 18px;">Rs. ${billDetails.billAmount.toFixed(2)}</span>
                </div>
                <div style="padding: 12px; background: #f1f5f9; border-radius: 6px; display: flex; justify-content: space-between;">
                    <span><strong>Energy Consumption:</strong></span>
                    <span style="color: #059669; font-weight: bold;">${billDetails.consumption} kWh</span>
                </div>
            </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">💰 Charge Breakdown</h3>
            <div style="display: grid; gap: 8px;">
                ${billDetails.energyCharge ? `
                <div style="padding: 8px; background: #f0fdf4; border-radius: 4px; display: flex; justify-content: space-between;">
                    <span>Energy Charge:</span>
                    <span style="font-weight: bold;">Rs. ${billDetails.energyCharge.toFixed(2)}</span>
                </div>` : ''}
                ${billDetails.fixedCharge ? `
                <div style="padding: 8px; background: #f0fdf4; border-radius: 4px; display: flex; justify-content: space-between;">
                    <span>Fixed Charge:</span>
                    <span style="font-weight: bold;">Rs. ${billDetails.fixedCharge.toFixed(2)}</span>
                </div>` : ''}
                ${billDetails.sscl ? `
                <div style="padding: 8px; background: #f0fdf4; border-radius: 4px; display: flex; justify-content: space-between;">
                    <span>SSCL (2.5%):</span>
                    <span style="font-weight: bold;">Rs. ${billDetails.sscl.toFixed(2)}</span>
                </div>` : ''}
            </div>
        </div>
        
        <div style="background: ${daysUntilDue <= 7 ? '#fef3c7' : '#dbeafe'}; padding: 20px; border-radius: 8px; border-left: 4px solid ${daysUntilDue <= 7 ? '#f59e0b' : '#3b82f6'}; margin-bottom: 20px;">
            <h3 style="color: ${daysUntilDue <= 7 ? '#92400e' : '#1e40af'}; margin-top: 0;">📅 Payment Information</h3>
            <div style="display: grid; gap: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span><strong>Due Date:</strong></span>
                    <span style="color: ${daysUntilDue <= 7 ? '#dc2626' : '#059669'}; font-weight: bold;">${formattedDueDate}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span><strong>Days Until Due:</strong></span>
                    <span style="color: ${daysUntilDue <= 7 ? '#dc2626' : '#059669'}; font-weight: bold; font-size: 16px;">
                        ${daysUntilDue} days ${daysUntilDue <= 7 ? '⚠️' : '✅'}
                    </span>
                </div>
            </div>
        </div>
    </div>
    
    <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; border-left: 4px solid #0288d1; margin-bottom: 25px;">
        <h3 style="color: #01579b; margin-top: 0;">🎯 What's Next?</h3>
        <ul style="margin: 0; padding-left: 20px; color: #01579b;">
            <li>Your bill is now being tracked in your VoltBuddy dashboard</li>
            <li>You'll receive reminder emails as the due date approaches</li>
            <li>Check your dashboard for personalized energy-saving tips</li>
            <li>Monitor your consumption patterns and predictions</li>
        </ul>
    </div>
    
    <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px;">
        <p style="margin: 0 0 20px 0; color: #666;">
            Best regards,<br>
            <strong style="color: #2441E1;">VoltBuddy Team</strong>
        </p>
        <div style="margin-top: 20px;">
            <a href="http://localhost:3000/dashboard" 
               style="background: linear-gradient(135deg, #2441E1, #3B82F6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin-right: 10px;">
                View Dashboard
            </a>
            <a href="http://localhost:3000/bill-history" 
               style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Bill History
            </a>
        </div>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 12px; margin: 0;">
            This is an automated message from VoltBuddy. Please do not reply to this email.<br>
            You received this email because bill tracking is enabled for your account.
        </p>
    </div>
</body>
</html>
    `;

    return await sendNotificationEmail(user.email, subject, text, html);
  } catch (error) {
    console.error('❌ Error sending bill tracking email:', error);
    throw error;
  }
}

async function sendInsightsPDFEmail(to, reportData) {
  try {
    console.log(`📧 Starting to send AI Insights PDF to: ${to}`);
    
    if (!to) {
      throw new Error('Email address is required');
    }
    
    if (!reportData || !reportData.pdfBuffer) {
      throw new Error('PDF buffer is required');
    }
    
    const { title, generatedDate, sections, pdfBuffer } = reportData;
    
    console.log(`📧 PDF buffer size: ${pdfBuffer.length} bytes`);
    console.log(`📧 Report sections:`, {
      energyTips: sections?.energyTips?.data?.length || 0,
      costStrategies: sections?.costStrategies?.data?.length || 0,
      predictions: sections?.predictions?.data ? 'Available' : 'Not available'
    });
    
    const subject = "Your VoltBuddy AI Insights Report";
    
    const text = `
Hello,

Please find attached your comprehensive AI Insights Report from VoltBuddy.

Report Generated: ${generatedDate}
Report Includes:
- ${sections.energyTips?.data?.length || 0} Energy Saving Tips
- ${sections.costStrategies?.data?.length || 0} Cost Reduction Strategies
- Energy Consumption Predictions and Analysis

This professional report contains personalized recommendations to help you optimize your energy consumption and reduce electricity costs.

Best regards,
VoltBuddy Team
    `;

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Insights Report - VoltBuddy</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #2441E1, #3B82F6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🤖 AI Insights Report</h1>
        <p style="color: #E0E7FF; margin: 10px 0 0 0; font-size: 16px;">Your personalized energy optimization guide</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #2441E1; margin-top: 0;">📊 Your AI Insights Report is Ready!</h2>
        <p style="margin-bottom: 20px;">We've analyzed your energy consumption patterns and generated a comprehensive report with personalized recommendations.</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2441E1; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">📋 Report Details:</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Generated:</strong> ${generatedDate}</li>
                <li><strong>Energy Tips:</strong> ${sections.energyTips?.data?.length || 0} personalized recommendations</li>
                <li><strong>Cost Strategies:</strong> ${sections.costStrategies?.data?.length || 0} money-saving strategies</li>
                <li><strong>Predictions:</strong> Advanced consumption forecasting</li>
            </ul>
        </div>
        
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; border-radius: 8px; color: white; text-align: center;">
            <h3 style="margin: 0 0 10px 0;">💡 What's Inside Your Report</h3>
            <ul style="margin: 0; padding-left: 20px; text-align: left;">
                <li>Personalized energy-saving recommendations</li>
                <li>Cost reduction strategies tailored to your usage</li>
                <li>Future consumption predictions and trends</li>
                <li>Professional charts and visual insights</li>
                <li>Actionable steps to reduce your electricity bills</li>
            </ul>
        </div>
    </div>
    
    <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
        <h3 style="color: #856404; margin-top: 0;">📎 Report Attachment</h3>
        <p style="color: #856404; margin: 0;">Your detailed AI Insights Report is attached as a PDF file. Download it to access all your personalized recommendations and insights.</p>
    </div>
    
    <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px;">
        <p style="margin: 0 0 20px 0; color: #666;">
            Best regards,<br>
            <strong style="color: #2441E1;">VoltBuddy AI Team</strong>
        </p>
        <div style="margin-top: 20px;">
            <a href="http://localhost:3000/ai-insights" 
               style="background: linear-gradient(135deg, #2441E1, #3B82F6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin-right: 10px;">
                View AI Insights
            </a>
            <a href="http://localhost:3000/dashboard" 
               style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Dashboard
            </a>
        </div>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 12px; margin: 0;">
            This is an automated message from VoltBuddy. Please do not reply to this email.<br>
            You received this email because you requested an AI Insights Report.
        </p>
    </div>
</body>
</html>
    `;

    const mailOptions = {
      from: '"VoltBuddy AI" <noreply@voltbuddy.com>',
      to,
      subject,
      text,
      html,
      attachments: [
        {
          filename: `VoltBuddy-AI-Insights-${new Date().toISOString().split('T')[0]}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    console.log(`📧 Attempting to send email with attachment size: ${pdfBuffer.length} bytes`);
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ AI Insights PDF email sent successfully:', result.messageId);
    console.log('✅ Email sent to:', to);
    return result;
    
  } catch (error) {
    console.error('❌ Error sending AI Insights PDF email:', error);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// Bill History Email Function
async function sendBillHistoryEmail(to, pdfBuffer, billHistory) {
  try {
    console.log(`📧 Sending bill history email to: ${to}`);
    
    const paidBills = billHistory.filter(bill => bill.status === 'Paid');
    const unpaidBills = billHistory.filter(bill => bill.status === 'Unpaid');
    const totalAmount = billHistory.reduce((sum, bill) => sum + (bill.billAmount || 0), 0);
    const totalConsumption = billHistory.reduce((sum, bill) => sum + (bill.consumption || 0), 0);
    
    const subject = "Your VoltBuddy Bill History Report";
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VoltBuddy Bill History Report</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 600px; 
                margin: 0 auto; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 20px;
            }
            .container { 
                background: white; 
                border-radius: 20px; 
                padding: 30px; 
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .header { 
                background: linear-gradient(135deg, #2441E1, #3B82F6); 
                color: white; 
                padding: 30px; 
                border-radius: 15px; 
                text-align: center; 
                margin-bottom: 30px;
            }
            .header h1 { 
                margin: 0; 
                font-size: 28px; 
                font-weight: 700;
            }
            .header p { 
                margin: 10px 0 0 0; 
                opacity: 0.9;
                font-size: 16px;
            }
            .summary-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin: 30px 0;
            }
            .summary-card {
                background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                padding: 20px;
                border-radius: 15px;
                text-align: center;
                border: 2px solid #e2e8f0;
            }
            .summary-card h3 {
                margin: 0 0 10px 0;
                color: #2441E1;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .summary-card .value {
                font-size: 24px;
                font-weight: 700;
                color: #1a202c;
                margin: 0;
            }
            .status-section {
                background: #f8fafc;
                padding: 25px;
                border-radius: 15px;
                margin: 30px 0;
            }
            .status-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 0;
                border-bottom: 1px solid #e2e8f0;
            }
            .status-row:last-child {
                border-bottom: none;
            }
            .status-label {
                font-weight: 600;
                color: #4a5568;
            }
            .status-value {
                font-weight: 700;
                font-size: 18px;
            }
            .paid { color: #10B981; }
            .unpaid { color: #EF4444; }
            .attachment-notice {
                background: linear-gradient(135deg, #3B82F6, #2441E1);
                color: white;
                padding: 20px;
                border-radius: 15px;
                text-align: center;
                margin: 30px 0;
            }
            .attachment-notice h3 {
                margin: 0 0 10px 0;
                font-size: 18px;
            }
            .footer {
                text-align: center;
                padding: 30px 0;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
                margin-top: 30px;
            }
            .footer h3 {
                color: #2441E1;
                margin-bottom: 15px;
            }
            @media (max-width: 600px) {
                .summary-grid {
                    grid-template-columns: 1fr;
                }
                .status-row {
                    flex-direction: column;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📊 Bill History Report</h1>
                <p>Your comprehensive electricity bill analysis</p>
            </div>
            
            <h2 style="color: #2441E1; margin-bottom: 20px;">Summary Overview</h2>
            
            <div class="summary-grid">
                <div class="summary-card">
                    <h3>Total Bills</h3>
                    <p class="value">${billHistory.length}</p>
                </div>
                <div class="summary-card">
                    <h3>Total Amount</h3>
                    <p class="value">$${totalAmount.toFixed(2)}</p>
                </div>
                <div class="summary-card">
                    <h3>Total Consumption</h3>
                    <p class="value">${totalConsumption.toFixed(2)} kWh</p>
                </div>
                <div class="summary-card">
                    <h3>Average Bill</h3>
                    <p class="value">$${(totalAmount / billHistory.length).toFixed(2)}</p>
                </div>
            </div>
            
            <div class="status-section">
                <h3 style="color: #2441E1; margin-bottom: 20px;">Bill Status Breakdown</h3>
                <div class="status-row">
                    <span class="status-label">✅ Paid Bills:</span>
                    <span class="status-value paid">${paidBills.length}</span>
                </div>
                <div class="status-row">
                    <span class="status-label">❌ Unpaid Bills:</span>
                    <span class="status-value unpaid">${unpaidBills.length}</span>
                </div>
                <div class="status-row">
                    <span class="status-label">💰 Paid Amount:</span>
                    <span class="status-value paid">$${paidBills.reduce((sum, bill) => sum + bill.billAmount, 0).toFixed(2)}</span>
                </div>
                <div class="status-row">
                    <span class="status-label">⏳ Outstanding Amount:</span>
                    <span class="status-value unpaid">$${unpaidBills.reduce((sum, bill) => sum + bill.billAmount, 0).toFixed(2)}</span>
                </div>
            </div>
            
            <div class="attachment-notice">
                <h3>📎 Detailed Report Attached</h3>
                <p>A comprehensive PDF report with detailed tables, consumption analysis, and trends is attached to this email.</p>
            </div>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 15px; margin: 30px 0;">
                <h3 style="color: #2441E1; margin-bottom: 15px;">💡 Smart Insights</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Your average monthly consumption is <strong>${(totalConsumption / billHistory.length).toFixed(2)} kWh</strong></li>
                    <li>Payment completion rate: <strong>${((paidBills.length / billHistory.length) * 100).toFixed(1)}%</strong></li>
                    ${unpaidBills.length > 0 ? 
                        `<li style="color: #EF4444;">You have <strong>${unpaidBills.length} unpaid bills</strong> totaling <strong>$${unpaidBills.reduce((sum, bill) => sum + bill.billAmount, 0).toFixed(2)}</strong></li>` : 
                        '<li style="color: #10B981;">🎉 All bills are paid! Great job managing your electricity costs.</li>'
                    }
                </ul>
            </div>
            
            <div class="footer">
                <h3>VoltBuddy Team</h3>
                <p>Smart Home Electricity Bill Tracker with AI Insights</p>
                <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                <p style="margin-top: 15px; font-size: 12px;">
                    This is an automated email. For support, contact us at support@voltbuddy.com
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    const result = await transporter.sendMail({
      from: '"VoltBuddy" <noreply@voltbuddy.com>',
      to,
      subject,
      html,
      attachments: [
        {
          filename: `VoltBuddy-Bill-History-${new Date().toISOString().split('T')[0]}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });
    
    console.log('✅ Bill history email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending bill history email:', error);
    throw error;
  }
}

module.exports = { sendNotificationEmail, sendProfileUpdateEmail, sendBillTrackingEmail, sendInsightsPDFEmail, sendBillHistoryEmail };


