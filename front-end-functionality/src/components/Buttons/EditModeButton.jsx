import {Link} from 'react-router-dom';
import {useState, useRef} from "react";
import axios from "axios";
import Button from '@mui/material/Button';

export const EditModeButton = ({id}) => {
    
    return(
         <button><Link to="/edit" state={{id}}>Edit Mode</Link></button>
    );
}