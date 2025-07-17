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

module.exports = { sendNotificationEmail };
