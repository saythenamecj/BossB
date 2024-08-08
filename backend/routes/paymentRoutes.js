const express = require('express');
const router = express.Router();
const { processPayment, paytmResponse, getPaymentStatus, mockPayment } = require('../controllers/paymentController');

// Payment Routes
router.post('/process', processPayment);
router.post('/callback', paytmResponse);
router.get('/status/:id', getPaymentStatus);

// Mock Payment Route
router.post('/mock', mockPayment);

module.exports = router;
