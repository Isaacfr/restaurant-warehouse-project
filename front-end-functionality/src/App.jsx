import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { BackButton } from './components/Buttons';
import { Item, ItemList } from "./components/List/ItemList";
import { EditFormPage, ItemPage, WarehousePage } from './pages';

export const App = () =>{
    return (
        // <ItemList></ItemList>
        <BrowserRouter>
            <BackButton/>
            <Routes>
                 <Route path="/" element={<ItemPage />}/>
                 <Route path="/edit" element={<EditFormPage/>}/>
                 <Route path="/warehouse" element={<WarehousePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}