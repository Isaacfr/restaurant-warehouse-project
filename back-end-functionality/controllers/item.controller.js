const Item = require('../models/Item.model.js'); 

const findAllItems = async () => await Item.find();

const findItemById = async id => {
    try {
       
        const item = await Item.findById(id);
        if (item == null) {
            throw {status: 204, msg: `Item with id ${id} cannot be found.`};
        }
        return item;
    } catch (err) {
        
        throw err;
    }
};

const createItem = async itemToSave => {
    try {
        const item = new Item(itemToSave);
        await item.save(); 
        return item;
    } catch (err) {
        throw err;
    }
}

const updateItem = async (id, itemToUpdate) => {
    try {
        await Item.findByIdAndUpdate(id, itemToUpdate);
    } catch (err) {
        throw { status: 400, msg: err };
    }
};

const deleteItemById = async id => await Item.findByIdAndDelete(id);

module.exports = { findAllItems, findItemById, createItem, updateItem, deleteItemById};