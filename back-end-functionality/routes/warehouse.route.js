const router = require('express').Router();
const { findItemById } = require('../controllers/item.controller.js');
const { findAllWarehouses, createWarehouse } = require('../controllers/warehouse.controller.js');
const mongoose = require('mongoose');

// Find all Warehouses
router.get('/', async (req, res) => {
    try {
        const warehouses = await findAllWarehouses();
        res.status(200).json(warehouses);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async(req, res) =>{
    try{
        const warehouse = await findWarehouseById(req.params.id);
        res.json(warehouse);
    }
    catch(err){
        console.log(err);
        res.status(err?.status ?? 500).json(err);
    }
})

//router.put
//router.delete

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