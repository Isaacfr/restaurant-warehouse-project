import {useState, useEffect} from 'react';
import axios from 'axios';
import { ItemForm } from '../Forms/ItemForm';
import { DeleteButton, EditModeButton } from '../Buttons';


export const Item = ({item: {warehouse_number, _id, description, quantity, unit_cost, total_cost}}) =>{
    // : {item_id, description, quantity, unit_cost, total_cost}
    // console.log(_id);
    
    return(
        <tr>
            <td>{warehouse_number}</td>
            <td>{description}</td>
            <td>{quantity}</td>
            <td>{unit_cost}</td>
            <td>{total_cost}</td>
            <td><EditModeButton id={_id}/></td>
            <td><DeleteButton id={_id}/></td>
        </tr>
    )
}

export const ItemList = () =>{

   const [itemList, setItemList] = useState([]);

   useEffect(() =>{
    axios.get('http://localhost:9000/items')
    .then(res => {setItemList(res.data); console.log(res.data);})
    .catch(err => console.log(err)); //change this to alert message? test for refreshing page
   }, []);

    return(
        <>
        <ItemForm setItemList={setItemList} />
        <table>
            <thead>
                <tr>
                    <th>Warehouse Number</th>
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