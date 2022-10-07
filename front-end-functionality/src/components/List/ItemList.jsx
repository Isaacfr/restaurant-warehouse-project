import {useState, useEffect} from 'react';
import axios from 'axios';
import { ItemForm } from '../Forms/ItemForm';

export const Item = ({item: {description, quantity, unit, unit_cost, total_cost}}) =>{
    return(
        <tr>
            <td>{description}</td>
            <td>{quantity}</td>
            <td>{unit}</td>
            <td>{unit_cost}</td>
            <td>{total_cost}</td>
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
        <table>
            <thead>
                <tr>
                    <th>Item Description</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Unit Cost</th>
                    <th>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                {itemList.map(item => <Item key={item._id} item={item}/>)}
            </tbody>
        </table>
    )
}