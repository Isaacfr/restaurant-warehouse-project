const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    warehouse_number : Number,
    warehouse_total_space : Number,
    warehouse_vacant_space : Number,
    inventory: {
        inventory_items : [{
            type: mongoose.Types.ObjectId,
            ref: 'Warehouse Item'
        }],
    }
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema, 'Warehouse');
module.exports = Warehouse;