import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import noImg from "../../assets/img/no-image.svg";
import DataContext from "../../Context/DataContext";

function ListItem( {food} ) {

    const [ retFood, setRetfood ] = useState(null);

    const [ exFood, setExFood ] = useState(null);

    const [ warning, setWarning ] = useState(null)

    const { setCreateRes, setUpdateRes, reservations } = useContext(DataContext);

    let fullDate = new Date(food.date);
    fullDate = new Date(fullDate.setMonth(fullDate.getMonth()+1));

    const addTermination = () =>{
        let fullDateObj = new Date(Date.now());
        fullDateObj = new Date(fullDateObj.setMonth(fullDateObj.getMonth()+3));
        setRetfood(`${fullDateObj.getFullYear()}-${fullDateObj.getMonth()}-${fullDateObj.getDate()}`);  
    }

    const extendTermination = () =>{
        if(reservations?.find(r => r.food_id === food.id)?.count <= 2){
        let fullDateObj = new Date(reservations?.find(r => r.food_id === food.id)?.terminas);
        fullDateObj = new Date(fullDateObj.setMonth(fullDateObj.getMonth()+2));
        setExFood(`${fullDateObj.getFullYear()}-${fullDateObj.getMonth()}-${fullDateObj.getDate()}`);}
        setWarning('Test')
    }

    useEffect(()=>{
        if(retFood === null){
            return;
        }
        setCreateRes({
            terminas: retFood,
            count: 1,
            food_id: food.id,
        });
    }, [retFood]);

    useEffect(()=>{
        if(exFood === null){
            return;
        }
        setUpdateRes({
            terminas: retFood,
            count: 2,
            id: reservations?.find(r => r.food_id === food.id)?.id,
        });
    }, [exFood]);

    return (
        <tr className="list-item">
            <td>{food.image ? <img src={food.image} alt='food atvaizdavimas'></img> : <img src={noImg} alt='food atvaizdavimas'></img>}</td>
            <td>{food.name}</td>
            <td>{food.category}</td>
            <td>{`${fullDate.getFullYear()}-${fullDate.getMonth()}-${fullDate.getDate()}`}</td>
            <td>
                <div className="options">
                    <h4>{warning}</h4>
                    {retFood ? <span className="term">Gražinti iki: {retFood}</span> : null}
                    {reservations?.find(r => r.food_id === food.id)?.count ?
                    <button className="btn" onClick={extendTermination}>Pratesti</button>
                    :        
                    <button className="btn" onClick={addTermination}>Rezervuoti</button>
                    }
                </div>
            </td>
        </tr>
    )
}

export default ListItem;
