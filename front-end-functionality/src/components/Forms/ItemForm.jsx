import {useState} from "react";
import axios from "axios";

const unitTypes = [
    <option>Each</option>,
    <option>Package(6ct)</option>,
    <option>Box(12ct)</option>,
    <option>Custom Container</option>
]

export const ItemForm = ({setItemList}) => {
    const [itemData, setItemData] = useState({
        itemName : '',
        quantity: 0,
        unit: '', //checkbox
        unit_cost: 0,
        total_cost: 0
    })

    const handleClear = () => {
        setItemData({
            itemName : '',
            quantity: 0,
            unit: '', //checkbox
            unit_cost: 0,
            total_cost: 0
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const res = await axios.post('http://localhost:9000/items',{
                description: itemData.itemName,
                quantity: itemData.quantity,
                unit: itemData.unit,
                unit_cost: itemData.unit_cost,
                total_cost: itemData.unit
            })
        }
        catch(err){
            
        }
    }
}