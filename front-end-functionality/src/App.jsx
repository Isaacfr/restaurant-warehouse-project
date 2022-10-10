import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { BackButton } from './components/Buttons';
import { Item, ItemList } from "./components/List/ItemList";
import { EditFormPage, ItemPage, WarehousePage } from './pages';
import { AppNav } from './components/Nav';
import './style.css';

export const App = () =>{
    return (
        <BrowserRouter>
            <AppNav></AppNav>
            <Routes>
                 <Route path="/" element={<ItemPage />}/>
                 <Route path="/edit" element={<EditFormPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}