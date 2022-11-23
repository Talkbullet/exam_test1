import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import ListItem from "./ListItem";

function List(){

    const { food } = useContext(DataContext);

    return (
    <div className="list">
        <table>
            <thead>
                <tr>
                    <th>Nuotrauka</th>
                    <th>Pavadinimas</th>
                </tr>
                {food?.map(b => <ListItem key={b.id} book={b} />)}
            </thead>
        </table>
    </div>);
}

export default List;