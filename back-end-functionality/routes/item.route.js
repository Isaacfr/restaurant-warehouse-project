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

calculateTotalCost(){
    
}

//Read All Items 
router.get('/', async (req, res) =>{
    const items = await findAllItems();
    res.json(items);
});

//Read Item by ID
router.get('/:id', async (req, res) =>{
    try{
        const items = await findItemById(req.params.id);
        //res.json(items);
        res.json(items.description); //18-inch wok - name
        // const info = await res.json();
        // return info;
    }
    catch{
        console.log(err);
        res.status(err?.    status ?? 500).json(err);
    }
});

//Create an Item
router.post('/', async (req, res) => {
    try {
        const item = await createItem(req.body);
        res.status(201).json(item);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

//Update an Item
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        await updateItem(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

//Delete an Item
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteItemById(req.params.id);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

module.exports = router;