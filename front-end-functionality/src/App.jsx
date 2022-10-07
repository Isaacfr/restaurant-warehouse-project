//use import here
import { Item, ItemList } from "./components/List/ItemList";
import { ItemForm } from "./components/Forms/ItemForm";

export const App = () =>{
    return (
        <div>
            <ItemForm></ItemForm>
            <ItemList></ItemList>
        </div>
    )
}