// routes/counterRoutes.js

const express = require('express');
const router = express.Router();
const counterController = require('../controller/counter');
const { requireAuth } = require('../middleware/authmiddleware');
const {uploadPhoto}=require("../middleware/fileUpload")
// Create a new Counter
router.post('/insertCounter',requireAuth,uploadPhoto, counterController.createCounter);

// Get all Counters
router.get('/getCounter',requireAuth, counterController.getCounters);
router.get('/getCounters', counterController.getCounters);
// Get a single Counter by ID
router.get('/getCounterById', requireAuth,counterController.getCounterById);

// Update a Counter by ID
router.put('/updateCounter',requireAuth, uploadPhoto,counterController.updateCounter);

// Delete a Counter by ID
router.delete('/deleteCounter',requireAuth, counterController.deleteCounter);

module.exports = router;
