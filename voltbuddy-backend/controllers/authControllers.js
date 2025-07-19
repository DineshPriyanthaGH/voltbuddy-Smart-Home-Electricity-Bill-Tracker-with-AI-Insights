const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { sendNotificationEmail } = require('../utils/emailService'); // see step 2 in previous answers

// Create JWT token helper
const createToken = (user) => {
  return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('📥 Register body:', req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Uniqueness check
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create (hashing password is recommended! Use bcrypt in production)
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Send welcome email
    try {
      console.log(`📧 Sending welcome email to: ${email}`);
      await sendNotificationEmail(
        email,
        'Welcome to VoltBuddy 🎉 - Your Smart Home Electricity Companion',
        `Hello ${username},

Welcome to the VoltBuddy family! 🏠⚡

VoltBuddy is your comprehensive Smart Home Electricity Bill Tracker with AI-powered insights designed to help you take control of your energy consumption and reduce your electricity bills.

🌟 What VoltBuddy offers you:

📊 Smart Bill Tracking
- Upload and digitize your electricity bills automatically
- Track your monthly energy consumption patterns
- View detailed bill history and analytics

🏠 Appliance Management
- Monitor individual appliance energy usage
- Get personalized recommendations for energy-efficient appliances
- Set usage alerts and reminders

🤖 AI-Powered Insights
- Receive intelligent analysis of your energy consumption
- Get personalized cost-saving strategies
- Predict future bills based on your usage patterns

💡 Energy Efficiency Tips
- Access our comprehensive library of energy-saving tips
- Get customized recommendations based on your home setup
- Learn about the latest energy-efficient technologies

📈 Dashboard & Analytics
- Real-time energy consumption monitoring
- Interactive charts and visualizations
- Compare your usage with previous months

🔔 Smart Notifications
- Bill due date reminders
- Unusual consumption alerts
- Energy-saving tips and suggestions

Getting Started:
1. Complete your profile setup
2. Upload your first electricity bill
3. Add your home appliances
4. Explore AI insights and recommendations
5. Start saving on your electricity bills!

Ready to start your energy-saving journey? Log in to your dashboard at http://localhost:3000

Need help? Our support team is always here to assist you.

Best regards,
The VoltBuddy Team 🌱`,
        `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .feature { margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #667eea; }
                .feature-title { font-weight: bold; color: #667eea; margin-bottom: 8px; }
                .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
                .footer { text-align: center; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
                .emoji { font-size: 1.2em; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Welcome to VoltBuddy! <span class="emoji">🎉</span></h1>
                <p>Your Smart Home Electricity Companion</p>
            </div>
            
            <div class="content">
                <h2>Hello ${username}! <span class="emoji">👋</span></h2>
                <p>Welcome to the VoltBuddy family! We're excited to help you take control of your energy consumption and reduce your electricity bills with our AI-powered insights.</p>
                
                <h3>🌟 What VoltBuddy offers you:</h3>
                
                <div class="feature">
                    <div class="feature-title">📊 Smart Bill Tracking</div>
                    <p>Upload and digitize your electricity bills automatically. Track monthly energy consumption patterns and view detailed bill history with interactive analytics.</p>
                </div>
                
                <div class="feature">
                    <div class="feature-title">🏠 Appliance Management</div>
                    <p>Monitor individual appliance energy usage, get personalized recommendations for energy-efficient appliances, and set usage alerts and reminders.</p>
                </div>
                
                <div class="feature">
                    <div class="feature-title">🤖 AI-Powered Insights</div>
                    <p>Receive intelligent analysis of your energy consumption, get personalized cost-saving strategies, and predict future bills based on your usage patterns.</p>
                </div>
                
                <div class="feature">
                    <div class="feature-title">💡 Energy Efficiency Tips</div>
                    <p>Access our comprehensive library of energy-saving tips, get customized recommendations based on your home setup, and learn about the latest energy-efficient technologies.</p>
                </div>
                
                <div class="feature">
                    <div class="feature-title">📈 Dashboard & Analytics</div>
                    <p>Real-time energy consumption monitoring with interactive charts and visualizations. Compare your usage with previous months and track your savings.</p>
                </div>
                
                <div class="feature">
                    <div class="feature-title">🔔 Smart Notifications</div>
                    <p>Get bill due date reminders, unusual consumption alerts, and personalized energy-saving tips and suggestions.</p>
                </div>
                
                <h3>🚀 Getting Started:</h3>
                <ol>
                    <li>Complete your profile setup</li>
                    <li>Upload your first electricity bill</li>
                    <li>Add your home appliances</li>
                    <li>Explore AI insights and recommendations</li>
                    <li>Start saving on your electricity bills!</li>
                </ol>
                
                <div style="text-align: center;">
                    <a href="http://localhost:3000" class="cta-button">Access Your Dashboard</a>
                </div>
                
                <p><strong>Need help?</strong> Our support team is always here to assist you. Simply reply to this email or contact us through the app.</p>
                
                <div class="footer">
                    <p><strong>Best regards,<br>The VoltBuddy Team 🌱</strong></p>
                    <p><em>Start your energy-saving journey today!</em></p>
                </div>
            </div>
        </body>
        </html>
        `
      );
      console.log('✅ Welcome email sent successfully');
    } catch (mailErr) {
      console.error("❌ Failed to send welcome email:", mailErr.message);
      console.error("Full email error:", mailErr);
      // Do not block registration if email fails
    }

    // Create welcome notification
    newUser.notifications.push({
      type: 'welcome',
      title: 'Welcome to VoltBuddy!',
      message: 'Your account is ready. Add your first bill or check out AI tips to get started.'
    });
    await newUser.save();

    // JWT token
    const token = createToken(newUser);

    res.status(201).json({
      status: 'success',
      data: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    console.error('❌ Register error:', err); // full error log for debugging
    res.status(400).json({
      status: 'fail',
      message: err.message || 'Registration failed',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Please provide email and password' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // In production, compare with bcrypt!
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = createToken(user);

    res.status(200).json({
      status: 'success',
      data: { userId: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
