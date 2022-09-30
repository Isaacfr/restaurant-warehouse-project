const Warehouse = require('../models/Warehouse.model.js');

const findAllWarehouses = async () => await Warehouse.find().populate('inventory');

const createWarehouse = async warehouseToCreate => {
    try{
        const wareHouse = new Warehouse(warehouseToCreate);
        await wareHouse.save();
        return wareHouse;
    }catch(err){
        throw {status: 500, msg: err.message};
    }
};

module.exports = {findAllWarehouses, createWarehouse};