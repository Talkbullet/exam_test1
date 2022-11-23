import { useContext } from "react";
import noImg from "../../assets/img/no-image.svg";
import DataContext from "../../Context/DataContext";

function ListItem( {food} ) {

    const { setModalEdit, setModalDelete } = useContext(DataContext);
    let fullDate = new Date(food.date);
    fullDate = new Date(fullDate.setMonth(fullDate.getMonth()+1));
    return (
        <tr className="list-item">
            <td>{food.image ? <img src={food.image} alt='food atvaizdavimas'></img> : <img src={noImg} alt='food atvaizdavimas'></img>}</td>
            <td>{food.name}</td>
            <td>{food.category}</td>
            <td>{`${fullDate.getFullYear()}-${fullDate.getMonth()}-${fullDate.getDate()}`}</td>
            <td>
                <div className="options">
                    <button className="btn" onClick={() => setModalEdit(food)}>Edit</button>
                    <button className="btn" onClick={() => setModalDelete(food)}>Delete</button>
                </div>
            </td>
        </tr>
    )
}

export default ListItem;