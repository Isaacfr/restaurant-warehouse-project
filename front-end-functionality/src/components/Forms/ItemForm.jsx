import {useState, useRef} from "react";
import axios from "axios";

const unitTypes = [
    <option value="1">Each</option>,
    <option value="6">Package(6ct)</option>,
    <option value="12">Box(12ct)</option>
]

export const ItemForm = ({setItemList}) => {
    
    //const [totalcost, setTotalCost] = useState(0);
    //const solveTotalCost = (unit, unitCost) => setTotalCost(totalCost = unit * unitCost);

    const totalcountRef = useRef(0);

    const [itemData, setItemData] = useState({
        description : '',
        quantity: 0,
        unit_cost: 0,
        total_cost: 0
    })

    const handleClear = () => {
        setItemData({
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
                description: itemData.description,
                quantity: itemData.quantity,
                unit_cost: itemData.unit_cost,
                total_cost: itemData.unit_cost * itemData.quantity
            });
            console.log(res.data);

            console.log(itemData.unit);

            setItemList(itemList => [...itemList, res.data]);

            event.target.reset();
            handleClear();
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
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
                    {/* <input onChange={e =>{
                        e.target.value = itemData.unit_cost * itemData.unit;
                        setItemData({...itemData, total_cost: e.target.value});
                    }} placeholder="0" disabled></input> */}
                </div>
            </div>
            <div>
                <button type='reset' onClick={handleClear}>Clear</button>
                <button>Submit</button>
            </div>
        </form>
    )
}