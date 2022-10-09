import {useLocation} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import axios from "axios";

// const unitTypes = [
//     <option value="1">Each</option>,
//     <option value="6">Package(6ct)</option>,
//     <option value="12">Box(12ct)</option>
// ]

// function obtainId () {
//     const location = useLocation();
//     const {id} = location.state;
//     return id;
// }

export const EditModeForm = ({itemId}) => {
    
    const location = useLocation();
    const {id} = location.state;
    //const [totalcost, setTotalCost] = useState(0);
    //const solveTotalCost = (unit, unitCost) => setTotalCost(totalCost = unit * unitCost);

    //console.log(id);
    const totalcountRef = useRef(0);

     const [itemData, setItemData] = useState({
        itemId: '',
        description : '',
        quantity: 0,
        unit_cost: 0,
        total_cost: 0
     });

    useEffect(() =>{
     axios.get(`http://localhost:9000/items/${id}`)
     .then(res => {
        setItemData({
            itemId : res.data._id,
            description: res.data.description,
            quantity: res.data.quantity,
            unit_cost: res.data.unit_cost,
            total_cost: res.data.total_cost
        });
    })
     .catch(err => console.log(err)); //change this to alert message? test for refreshing page
    }, []);

    const resetData = {
        itemId : itemData.itemId,
        description: itemData.description,
        quantity: itemData.quantity,
        unit_cost: itemData.unit_cost,
        total_cost: itemData.total_cost
    }

    const handleReset = async(event) => {
        event.preventDefault();
        try{
            const res = await axios.get(`http://localhost:9000/items/${id}`);
            setItemData({
            itemId : res.data._id,
            description: res.data.description,
            quantity: res.data.quantity,
            unit_cost: res.data.unit_cost,
            total_cost: res.data.total_cost
            });
        }
        catch(err){
            console.log(err);
        }
    }

    const handlePost = async(event) => {
        event.preventDefault();
        try{
            const res = await axios.put(`http://localhost:9000/items/${id}`,{
                itemId : itemData._id,
                description: itemData.description,
                quantity: itemData.quantity,
                unit_cost: itemData.unit_cost,
                total_cost: itemData.unit_cost * itemData.quantity
            });
            window.location.reload(false);
        }
        catch(err){
            console.log(err);
        }
    }
    // const handleSubmit = async(event) => {
    //     event.preventDefault();
    //     try{
    //         const res = await axios.post('http://localhost:9000/items',{
    //             itemId : itemData._id,
    //             description: itemData.description,
    //             quantity: itemData.quantity,
    //             unit_cost: itemData.unit_cost,
    //             total_cost: itemData.unit_cost * itemData.quantity
    //         });
    //         console.log(res.data);

    //         console.log(itemData._id);

    //         setItemList(itemList => [...itemList, res.data]);

    //         event.target.reset();
    //         handleClear();
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }

    return(
        <form onSubmit={handlePost}>
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
                <button type='reset' onClick={handleReset}>Reset</button>
                <button>Submit</button>
            </div>
        </form>
    )
}