import { useContext } from "react";
import DataContext from "../Context/DataContext.jsx";
import close from '../assets/img/x.svg';

function Delete(){

    const { setModalDelete, modalDelete, setDeleteFood } = useContext(DataContext);

    if(modalDelete === null){
        return null;
    }

    const deleteRecord = () =>{
        setDeleteFood(modalDelete);
        setModalDelete(null);
    }

    return(
        <div className="modal">
            <div className="modal-container">
                <img src={close} alt='Exit' className="btn-delete" onClick={() => setModalDelete(null)}></img>
                <div className="modal-info-container">
                    <h3 className="modal-info-title">Ar tikrai norite ištrinti?</h3>
                </div>
                <div className="modal-btn-container">
                    <button className="btn" onClick={() => setModalDelete(null)}>Ne</button>
                    <button className="btn" onClick={deleteRecord}>Taip</button>
                </div>
            </div>
        </div>
    );
}

export default Delete;