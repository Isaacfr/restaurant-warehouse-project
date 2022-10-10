import {useState, useRef, useEffect} from "react";
import axios from "axios";

// const unitTypes = [
//     <option value="1">Each</option>,
//     <option value="6">Package(6ct)</option>,
//     <option value="12">Box(12ct)</option>
// ]

export const WarehouseChoice = ({_id}) => {
    return(
        <option value={_id}>{_id}</option>
    )
}

export const WarehouseNumbersList = () => {
    const [warehouseNumbers, setWarehouseNumbers] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:9000/warehouses')
        .then(res => {
            setWarehouseNumbers(res.data);
        })
        .catch(err => console.log(err));
    },[]);

    //console.log(warehouseNumbers);
    // const warehouseChoices = warehouseNumbers.map(choice => choice.warehouse_number)
    // console.log(warehouseChoices)

    return(
        warehouseNumbers.map(warehouse => <WarehouseChoice key={warehouse._id} _id= {warehouse._id}/>)
    )
}

export const ItemForm = ({setItemList}) => {
    
    //const [totalcost, setTotalCost] = useState(0);
    //const solveTotalCost = (unit, unitCost) => setTotalCost(totalCost = unit * unitCost);


    const totalcountRef = useRef(0);

    const [itemData, setItemData] = useState({
        warehouse_number: '',
        itemId: '',
        description : '',
        quantity: 0,
        unit_cost: 0,
        total_cost: 0
    })

    const handleClear = () => {
        setItemData({
            warehouse_number: '',
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
            setItemData({
                warehouse_number: itemData.warehouse_number,
                itemId : itemData._id,
                description: itemData.description,
                quantity: itemData.quantity,
                unit_cost: itemData.unit_cost,
                total_cost: itemData.unit_cost * itemData.quantity
            });
            console.log(res.data);
            console.log(res.warehouse_number);
            
            // try{
            // const newRes = await axios.put(`http://localhost:9000/warehouses/${res.data.warehouse_number}`
            // ,{
            //     // inventory.inventory_items : itemData._id
            //     inventory: {inventory_items  : [res.data._id]}
            // });
            // }
            // catch(err){
            //     console.log(err);
            // }
        

            setItemList(itemList => [...itemList, res.data]);

            event.target.reset();
            handleClear();
        }
        catch(err){
            console.log(itemData)
            console.log(err);
        }
        // try{
        //     const rRes = await axios.get(`http://localhost:9000/warehouses/6343355e45544e5984a0f05b`);
        //     console.log(rRes.data._id);
        //     console.log(itemData);
        //     const newRes = await axios.get(`http://localhost:9000/warehouses/${itemData.warehouse_number}`)
        //     console.log(newRes.data._id);
        // }
        // catch(err){
        //     console.log(err);
        // }
    }
    //setItemData({...itemData, warehouse_number : e.target.value})
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor="warehouse-number">Warehouse Number</label>
                    <select id="warehouse_number" 
                    onChange={e => setItemData({...itemData, warehouse_number : e.options[e.selectedText].target.value})}>
                        <WarehouseNumbersList/>
                        {/* <option>6343355e45544e5984a0f05b</option>
                        <option>63433474050cc9e1ba183995</option> */}
                    </select>
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
                <button type='reset' onClick={handleClear}>Clear</button>
                <button>Submit</button>
            </div>
        </form>
    )
}