const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

/**
 * An item will have the properties:
 * 
 * ID (items of the same name must have the same ID throughout all warehouses)
 * Warehouse
 * Description/Name of Item
 * Location?
 * Quantity
 * Unit (does it appear as individual? box?)
 * Unit Cost ($ amount)
 * Total Cost ($ amount)
 */

const itemSchema = new Schema({
    // item_id: String,
    // warehouse_id: [{type: mongoose.Types.ObjectId, ref:"Warehouse"}],
    description: String,
    quantity: Number,
    unit_cost: Number,
    total_cost: Number
});

const Item = mongoose.model('Warehouse Item', itemSchema, 'Warehouse Item');

module.exports = Item;