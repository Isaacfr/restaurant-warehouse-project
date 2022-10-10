import { DeleteButton, EditModeButton } from "../Buttons";
import {useState, useRef, useEffect} from "react";
import axios from "axios";


// const unitTypes = [
//     <option value="1">Each</option>,
//     <option value="6">Package(6ct)</option>,
//     <option value="12">Box(12ct)</option>
// ]

//export const WarehouseForm = ({setItemList}) => {
    
    //const [totalcost, setTotalCost] = useState(0);
    //const solveTotalCost = (unit, unitCost) => setTotalCost(totalCost = unit * unitCost);

    // const totalcountRef = useRef(0);

    // const [itemData, setItemData] = useState({
    //     itemId: '',
    //     description : '',
    //     quantity: 0,
    //     unit_cost: 0,
    //     total_cost: 0
    // })

    // const handleClear = () => {
    //     setItemData({
    //         itemId: '',
    //         description : '',
    //         quantity: 0,
    //         unit_cost: 0,
    //         total_cost: 0
    //     })
    // }

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

    // return(
    //     <form onSubmit={handleSubmit}>
    //         <div>
    //             <div>
    //                 <label htmlFor="item-name">Item Name: </label>
    //                 <input
    //                     value={itemData.description}
    //                     onChange={e => setItemData({...itemData, description: e.target.value})}
    //                     placeholder="Ex: Item Name"
    //                 />
    //             </div>
    //         </div>
    //         <div>
    //             <div>
    //                 <label htmlFor="">Quantity: </label>
    //                 <input
    //                     value={itemData.quantity}
    //                     onChange={e => {setItemData({...itemData, quantity: e.target.value});
    //                 }}
    //                     placeholder="Ex: 1"
    //                 />
    //             </div>
    //         </div>
    //         <div>
    //             <div>
    //                 <label htmlFor="unit-cost">Unit Cost: $</label>
    //                 <input
    //                     value={itemData.unit_cost}
    //                     onChange={e => {
    //                         setItemData({...itemData, unit_cost: e.target.value});
    //                     }}
    //                     placeholder="Ex: Unit Cost"
    //                 />
    //             </div>
    //         </div>
    //         <div>
    //             <div>
    //                 <label htmlFor="total-cost">Total Cost: $</label>
    //                 <input
    //                     onChange={() => {
    //                         totalcountRef.current = itemData.unit_cost * itemData.quantity;
    //                         setItemData({...itemData, total_cost: itemData.total_cost});}}
    //                     value = {totalcountRef.current = itemData.unit_cost * itemData.quantity}
    //                     placeholder="Ex: Total Cost"
                        
    //                     readOnly
    //                 />
    //             </div>
    //         </div>
    //         <div>
    //             <button type='reset' onClick={handleClear}>Clear</button>
    //             <button>Submit</button>
    //         </div>
    //     </form>
    // )
//}

export const Item = ({item: {_id, description, quantity, unit_cost, total_cost}}) =>{
    // : {item_id, description, quantity, unit_cost, total_cost}
    // console.log(_id);
    
    return(
        <tr>
            <td>{description}</td>
            <td>{quantity}</td>
            <td>{unit_cost}</td>
            <td>{total_cost}</td>
            <td><EditModeButton id={_id}/></td>
            <td><DeleteButton id={_id}/></td>
        </tr>
    )
}

export const WarehouseList = ({id}) =>{

   const [itemList, setItemList] = useState([]);

   useEffect(() =>{
    axios.get(`http://localhost:9000/warehouses/63433474050cc9e1ba183995`)
    .then(res => {
        //setItemList(res.data); 
        console.log(res.data.inventory.inventory_items);
        const items = res.data.inventory.inventory_items;
        items.map(item => axios.get(`http://localhost:9000/items/${item}`)
        .then(
            res => {
                setItemList(itemList => [...itemList, res.data]);
            })
        .catch(err => console.log(err))
        );
        
        //setItemList(itemList => [...itemList, res.data.inventory.inventory_items]);
    })
    .catch(err => console.log(err)); //change this to alert message? test for refreshing page
   }, []);

    return(
        <>
        {/* <WarehouseForm setItemList={setItemList} /> */}
        <table>
            <thead>
                <tr>
                    <th>Item Description</th>
                    <th>Quantity</th>
                    <th>Unit Cost</th>
                    <th>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                {itemList.map(item => <Item key={item._id} item={item}/>)}
            </tbody>
        </table>
        </>
    )
}