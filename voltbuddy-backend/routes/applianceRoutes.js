// applianceRoutes.js
const express = require('express');
const router = express.Router();
const applianceController = require('../controllers/applianceController');
const authMiddleware = require('../middleware/authMiddleware'); // your auth middleware

// Protect all routes
router.use(authMiddleware);

// Correct the endpoint paths to match the base route
router.get('/', applianceController.getAppliances); // GET /api/appliances
router.post('/', applianceController.addAppliance); // POST /api/appliances
router.put('/:id', applianceController.updateAppliance); // PUT /api/appliances/:id
router.delete('/:id', applianceController.deleteAppliance); // DELETE /api/appliances/:id

module.exports = router;
