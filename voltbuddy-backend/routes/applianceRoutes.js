const express = require('express');
const router = express.Router();
const applianceController = require('../controllers/applianceController');
const authMiddleware = require('../middleware/authMiddleware'); // your auth middleware

// Protect all routes
router.use(authMiddleware);

router.get('/', applianceController.getAppliances);
router.post('/', applianceController.addAppliance);
router.put('/:id', applianceController.updateAppliance);
router.delete('/:id', applianceController.deleteAppliance);

module.exports = router;
