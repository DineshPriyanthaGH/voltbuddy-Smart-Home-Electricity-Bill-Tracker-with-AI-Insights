# VoltBuddy - Smart Home Electricity Bill Tracker with AI Insights

A comprehensive full-stack web application designed to help Sri Lankan households track, analyze, and optimize their electricity consumption using AI-powered insights and modern web technologies.

## Overview

VoltBuddy addresses the critical challenge of electricity bill management in Sri Lanka by providing users with accurate bill calculations, personalized energy-saving recommendations, and comprehensive consumption analytics. The application integrates Google Gemini AI to deliver actionable insights that can help households reduce their monthly electricity costs by Rs. 500 or more.

## Features

- **Smart Bill Calculator** - Implements accurate Sri Lankan CEB tariff structure with tier-based pricing (Rs. 4-52/kWh)
- **AI-Powered Insights** - Personalized energy-saving recommendations and cost predictions via Google Gemini
- **Interactive Dashboard** - Real-time analytics, consumption tracking, and bill visualization
- **Appliance Management** - Individual device tracking with efficiency ratings and usage optimization
- **Automated Notifications** - Email alerts with PDF bill reports and consumption warnings
- **Intelligent Chatbot** - 24/7 support for electricity-related queries and guidance
- **Bill History Management** - Comprehensive tracking with trend analysis and historical comparisons
- **Responsive Design** - Optimized user experience across mobile and desktop platforms

## Technology Stack

**Frontend**
- React.js with Next.js framework
- TailwindCSS for styling
- Recharts for data visualization
- React Toastify for notifications

**Backend**
- Node.js runtime environment
- Express.js web application framework
- RESTful API architecture
- Mongoose ODM for MongoDB

**Database & Storage**
- MongoDB for primary data storage
- JSON Web Tokens (JWT) for authentication
- bcrypt for password encryption

**AI & External Services**
- Google Gemini API for AI insights
- Nodemailer for email services
- PDF generation for bill reports

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/DineshPriyanthaGH/voltbuddy-Smart-Home-Electricity-Bill-Tracker-with-AI-Insights.git

# Install frontend dependencies
cd voltbuddy-frontend
npm install

# Install backend dependencies
cd ../voltbuddy-backend
npm install

# Set up environment variables
# Create .env files in both frontend and backend directories

# Start the development servers
npm run dev
```

## Key Benefits

- Accurate bill calculations using official Sri Lankan CEB tariff rates
- Potential monthly savings of Rs. 500+ through AI-driven recommendations
- Real-time consumption monitoring and predictive analytics
- Comprehensive appliance efficiency tracking
- Automated bill management with email notifications
- User-friendly interface designed for Sri Lankan households

## Project Architecture

The application follows a modern full-stack architecture with clear separation of concerns:
- Client-side rendering with React/Next.js
- RESTful API backend with Express.js
- NoSQL database design with MongoDB
- AI integration through external API services
- Secure authentication and authorization systems

## Future Development Roadmap

**Phase 1 Enhancements**
- SMS notification integration using Twilio API
- Mobile application development with React Native
- Advanced user analytics and reporting features

**Phase 2 Expansions**
- Solar panel savings calculator and ROI analysis
- OCR technology for automatic bill scanning
- Smart meter integration and real-time data collection
- Machine learning models for enhanced consumption predictions

**Phase 3 Scaling**
- Multi-provider support (CEB, LECO, private suppliers)
- Enterprise features for commercial users
- API marketplace for third-party integrations

## Contributing

This project was developed as part of a Programming II Capstone Project. Contributions and feedback are welcome for educational and improvement purposes.

## Impact & Significance

VoltBuddy addresses a real-world problem faced by millions of Sri Lankan households in understanding and managing their electricity consumption. By combining modern web technologies with artificial intelligence, the application provides practical solutions for energy optimization and cost reduction, contributing to more sustainable energy usage patterns in Sri Lankan communities.

## License

This project is developed for educational purposes as part of a university capstone project.

---

**Developed by Group 26 - Programming II Capstone Project**  
**Solving real-world energy management challenges through innovative technology solutions**