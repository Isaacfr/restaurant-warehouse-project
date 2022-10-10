import {useLocation} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import axios from "axios";


export const EditModeForm = ({itemId}) => {
    
    if({itemId} == null){
        itemId = '6343e2bc5e34fd6f914bb770';
    }
    useEffect(() => {

    })

    const location = useLocation();
    const {id} = location.state;
    const totalcountRef = useRef(0);

     const [itemData, setItemData] = useState({
        warehouse_number: 1,
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
            warehouse_number : res.data.warehouse_number,
            itemId : res.data._id,
            description: res.data.description,
            quantity: res.data.quantity,
            unit_cost: res.data.unit_cost,
            total_cost: res.data.total_cost
        });
    })
     .catch(err=>setItemData({
        warehouse_number : 1,
        itemId: '',
        description : 'Food',
        quantity: 1,
        unit_cost: 1,
        total_cost: 1
    }));
    }, []);

    const resetData = {
        warehouse_number : itemData.warehouse_number,
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
            warehouse_number : res.warehouse_number,
            itemId : res.data._id,
            description: res.data.description,
            quantity: res.data.quantity,
            unit_cost: res.data.unit_cost,
            total_cost: res.data.total_cost
            });
            window.location.reload(false);
        }
        catch(err){
            console.log(err);
        }
    }

    const handlePost = async(event) => {
        event.preventDefault();
        try{
            const res = await axios.put(`http://localhost:9000/items/${id}`,{
                warehouse_number : itemData.warehouse_number,
                itemId : itemData._id,
                description: itemData.description,
                quantity: itemData.quantity,
                unit_cost: itemData.unit_cost,
                total_cost: itemData.unit_cost * itemData.quantity
            });
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <form onSubmit={handlePost}>
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
                <button type='reset' onClick={handleReset}>Reset</button>
                <button>Submit</button>
            </div>
        </form>
    )
}