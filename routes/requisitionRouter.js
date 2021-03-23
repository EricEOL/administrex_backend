const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');
const requisitionController = require('../controllers/requisitionController');

router.post('/register', auth, requisitionController.register);
router.get('/allrequisitions', auth, requisitionController.all);
router.get('/onerequisition/:id', auth, requisitionController.oneRequisition);
router.put('/updatelocale', auth, requisitionController.updateLocale);
router.put('/updateempenho', auth, requisitionController.updateEmpenho);
router.put('/updateliquidpay', auth, requisitionController.updateLiquidPayment);

module.exports = router;