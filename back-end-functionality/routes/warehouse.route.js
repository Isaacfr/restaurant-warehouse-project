const router = require('express').Router();
const { findAllWarehouses, createWarehouse, findWarehouseById, updateWarehouseById, deleteWarehouseById } = require('../controllers/warehouse.controller.js');
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(204).send();
    }
    else{
        next();
    }
}

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
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        await updateWarehouseById(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});


//router.delete
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteWarehouseById(req.params.id);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
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