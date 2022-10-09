import {Link} from 'react-router-dom';
import {useState, useRef} from "react";
import axios from "axios";

export const EditModeButton = ({id}) => {
    
    // const handleEdit = () =>{
    //     // console.log(id);
    //     return {id};
    // }
    
    return(
         <button><Link to="/edit" state={{id}}>Edit Mode</Link></button>
        //<button onClick={handleEdit}>Edit Mode</button>
    );
}