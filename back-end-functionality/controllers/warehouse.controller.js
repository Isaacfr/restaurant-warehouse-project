const Warehouse = require('../models/warehouse.model.js');

const findAllWarehouses = async () => await Warehouse.find().populate('inventory');

const findWarehouseById = async id => {
    try{
        const warehouse = await Warehouse.findById(id);
        if(warehouse == null){
            throw{status:204, msg: `Warehouse with id ${id} cannot be found.`};
        }
        return warehouse;
    }catch(err){
        throw err;
    }
}

const createWarehouse = async warehouseToCreate => {
    try{
        const wareHouse = new Warehouse(warehouseToCreate);
        await wareHouse.save();
        return wareHouse;
    }catch(err){
        throw {status: 500, msg: err.message};
    }
};

const updateWarehouseById = async (id, warehouseToUpdate) => {
    try {
        await Warehouse.findOneAndUpdate(id, warehouseToUpdate);
    } catch (err) {
        throw { status: 400, msg: err };
    }
};

const deleteWarehouseById = async id => await Warehouse.findByIdAndDelete(id);

module.exports = {findAllWarehouses, createWarehouse, findWarehouseById, updateWarehouseById, deleteWarehouseById};