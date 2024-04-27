
const express = require('express');
const router = express.Router();
const doctorController = require('./doctorController');

const roleCheck = require("../middleware/roleCheck");


router.post('/', roleCheck('admin'), doctorController.create);
router.get('/', doctorController.findAll);
router.get('/:id', doctorController.findOne);
router.put('/:id', roleCheck('admin'), doctorController.update);
router.delete('/:id', roleCheck('admin'), doctorController.delete);

module.exports = router;
