import {useState, useRef} from "react";
import axios from "axios";

export const DeleteButton = ({id}) => {
    
    function refreshPage() {
        window.location.reload(false);
    }

    const handleDelete = async(event) => {
        try{
            const res = await axios.delete(`http://localhost:9000/items/${id}`);
            refreshPage();
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <button onClick={handleDelete}>Delete</button>
    );
}