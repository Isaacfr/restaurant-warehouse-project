import {useState, useRef, useEffect} from "react";
import axios from "axios";
import Button from '@mui/material/Button'

export const ItemForm = ({setItemList}) => {
    
    const totalcountRef = useRef(0);

    const [itemData, setItemData] = useState({
        warehouse_number: 1,
        itemId: '',
        description : '',
        quantity: 0,
        unit_cost: 0,
        total_cost: 0
    })

    const handleClear = () => {
        setItemData({
            warehouse_number: 1,
            itemId: '',
            description : '',
            quantity: 0,
            unit_cost: 0,
            total_cost: 0
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        
        try{
            const res = await axios.post('http://localhost:9000/items',{
                warehouse_number: itemData.warehouse_number,
                itemId : itemData._id,
                description: itemData.description,
                quantity: itemData.quantity,
                unit_cost: itemData.unit_cost,
                total_cost: itemData.unit_cost * itemData.quantity
            });

            setItemList(itemList => [...itemList, res.data]);

            let link = "";

            switch(itemData.warehouse_number)
            {
                case 1:
                    link = 'http://localhost:9000/warehouses/63433474050cc9e1ba183995';
                    break;
                case 2:
                    link = 'http://localhost:9000/warehouses/6343355e45544e5984a0f05b';
                    break;
                case 3:
                    link = 'http://localhost:9000/warehouses/6343e1da5e34fd6f914bb76d';
                    break;
                default:
                    link = 'http://localhost:9000/warehouses/63433474050cc9e1ba183995';
                    break;
            }
            
            const newRes = await axios.put(link,{
                inventory: {inventory_items  : [itemData._id]}
            })

            event.target.reset();
            handleClear();
        }
        catch(err){
            console.log(itemData)
            console.log(err);
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor="warehouse-number">Warehouse Number</label>
                    <input id="warehouse_number" 
                    onChange={e => setItemData({...itemData, warehouse_number : e.target.value})}> 
                    </input>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="item-name">Item Name: </label>
                    <input
                        value={itemData.description}
                        onChange={e => setItemData({...itemData, description: e.target.value})}
                        placeholder="Ex: Item Name"
                    />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="">Quantity: </label>
                    <input
                        value={itemData.quantity}
                        onChange={e => {setItemData({...itemData, quantity: e.target.value});
                    }}
                        placeholder="Ex: 1"
                    />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="unit-cost">Unit Cost: $</label>
                    <input
                        value={itemData.unit_cost}
                        onChange={e => {
                            setItemData({...itemData, unit_cost: e.target.value});
                        }}
                        placeholder="Ex: Unit Cost"
                    />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="total-cost">Total Cost: $</label>
                    <input
                        onChange={() => {
                            totalcountRef.current = itemData.unit_cost * itemData.quantity;
                            setItemData({...itemData, total_cost: itemData.total_cost});}}
                        value = {totalcountRef.current = itemData.unit_cost * itemData.quantity}
                        placeholder="Ex: Total Cost"
                        
                        readOnly
                    />
                </div>
            </div>
            <div>
                <Button type='reset' onClick={handleClear} variant="contained">Clear</Button>
                <Button variant="contained">Submit</Button>
            </div>
        </form>
    )
}