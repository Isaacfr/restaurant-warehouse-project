const router = require('express').Router();
const { findAllWarehouses, createWarehouse } = require('../controllers/warehouse.controller.js');

// Find all Warehouses
router.get('/', async (req, res) => {
    try {
        const warehouses = await findAllWarehouses();
        res.status(200).json(warehouses);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Create a new Warehouse
router.post('/', async (req, res) => {
    try {
        const warehouse = await createWarehouse(req.body);
        res.status(201).json(warehouse);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
})

module.exports = router;