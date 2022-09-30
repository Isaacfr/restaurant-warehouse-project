const router = require('express').Router();
const {findAllItems, findItemById, createItem, updateItem, deleteItemById} = require ('../controllers/item.controller.js');
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(204).send();
    }
    else{
        next();
    }
}

router.get('/', async (req, res) =>{
    const items = await findAllItems();
    res.json(items);
});

router.get('/:id', async (req, res) =>{
    try{
        const items = await findItemById(req.params.id);
        res.json(items);
    }
    catch{
        console.log(err);
        res.status(err?.    status ?? 500).json(err);
    }
});