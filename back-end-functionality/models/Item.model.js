const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    warehouse_id: [{type: mongoose.Types.ObjectId, ref:"Warehouse"}],
    item_id: String,
    description: String,
    quantity: Number,
    unit_cost: Number,
    total_cost: Number
});

const Item = mongoose.model('Warehouse Item', itemSchema, 'Warehouse Item');

module.exports = Item;