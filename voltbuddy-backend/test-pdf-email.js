// Test script to verify PDF generation and email functionality
require('dotenv').config();
const express = require('express');

// Test if dependencies are working
console.log('🔄 Testing VoltBuddy PDF and Email functionality...');

// Test 1: Check if PDFKit is working
try {
  const PDFDocument = require('pdfkit');
  console.log('✅ PDFKit loaded successfully');
  
  // Test basic PDF creation
  const doc = new PDFDocument();
  console.log('✅ PDFDocument can be created');
} catch (error) {
  console.error('❌ PDFKit error:', error.message);
}

// Test 2: Check email service
try {
  const emailService = require('./utils/emailService');
  console.log('✅ Email service loaded successfully');
  console.log('✅ Available email functions:', Object.keys(emailService));
} catch (error) {
  console.error('❌ Email service error:', error.message);
}

// Test 3: Check insights routes
try {
  const insightsRoutes = require('./routes/insightsRoutes');
  console.log('✅ Insights routes loaded successfully');
} catch (error) {
  console.error('❌ Insights routes error:', error.message);
}

// Test 4: Check environment variables
console.log('\n📧 Email Configuration:');
console.log('SMTP_HOST:', process.env.SMTP_HOST ? '✅ Set' : '❌ Not set');
console.log('SMTP_PORT:', process.env.SMTP_PORT ? '✅ Set' : '❌ Not set');
console.log('SMTP_USER:', process.env.SMTP_USER ? '✅ Set' : '❌ Not set');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '✅ Set' : '❌ Not set');

console.log('\n🎯 Test completed!');

// Test sample data structure
const sampleData = {
  title: 'Test AI Insights Report',
  generatedDate: new Date().toLocaleDateString(),
  sections: {
    energyTips: {
      data: [
        {
          title: 'Switch to LED Bulbs',
          description: 'LED bulbs use up to 80% less energy than traditional incandescent bulbs and last 25 times longer.'
        },
        {
          title: 'Optimize Air Conditioning',
          description: 'Set your thermostat to 78°F during summer months to reduce energy consumption while maintaining comfort.'
        }
      ]
    },
    costStrategies: {
      data: [
        {
          title: 'Time-of-Use Optimization',
          description: 'Run major appliances during off-peak hours when electricity rates are lower.',
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
          },
          {
            month: 'February 2025',
            currentConsumption: 380,
            predictedConsumption: 360
          }
        ],
        insights: [
          'Your energy consumption is expected to decrease by 7% next month',
          'Peak usage occurs during evening hours (6-9 PM)'
        ]
      }
    }
  }
};

console.log('\n📊 Sample data structure is ready for testing');
console.log('Energy Tips:', sampleData.sections.energyTips.data.length);
console.log('Cost Strategies:', sampleData.sections.costStrategies.data.length);
console.log('Prediction Data:', sampleData.sections.predictions.data.predictionTable.length, 'months');
