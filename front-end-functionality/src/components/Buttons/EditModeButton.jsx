import {Link} from 'react-router-dom';
import {useState, useRef} from "react";
import axios from "axios";
import Button from '@mui/material/Button';

export const EditModeButton = ({id}) => {
    
    // const handleEdit = () =>{
    //     // console.log(id);
    //     return {id};
    // }
    
    return(
         <Button variant="outlined"><Link to="/edit" state={{id}}>Edit Mode</Link></Button>
        //<button onClick={handleEdit}>Edit Mode</button>
    );
}