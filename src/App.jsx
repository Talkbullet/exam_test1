import './Styles/Base/App.css';
import DataContext from './Context/DataContext.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Home from './Components/client/Home.jsx';
import Create from './Components/admin/Create';
import { LoginPage, LogoutPage, RequireAuth } from './Components/Auth/Auth';
import Footer from './Components/Footer';
import { useEffect } from 'react';
import axios from 'axios';
import { authConfig } from './Functions/auth';

// const reList = data => {
//   const d = new Map();
//   data.forEach(line => {
//       if (d.has(line.title)) {
//           d.set(line.title, [...d.get(line.title), line]);
//       } else {
//           d.set(line.title, [line]);
//       }
//   });
//   return [...d].map((d1, i) => ([...d1, {show: true}]));
//   //or
//   return [...d];
// }

function App() {

  const [refresh, setRefresh] = useState(Date.now());
  const [refreshStatus, setRefreshStatus] = useState(Date.now());

  const [status, setStatus] = useState(1);

  const [modalEdit, setModalEdit] = useState(null);
  const [modalDelete, setModalDelete] = useState(null);
  const [modalReserve, setModalReserve] = useState(null);

  const [Foods, setFoods] = useState(null);
  const [reservations, setReservations] = useState(null);
  const [createRes, setCreateRes] = useState(null);
  const [updateRes, setUpdateRes] = useState(null);

  const [saveFood, setSaveFood] = useState(null);
  const [editFood, setEditFood] = useState(null);
  const [deleteFood, setDeleteFood] = useState(null);

// GET
  useEffect(()=>{
    if(status === 1){
        return;
    }
    axios.get('http://localhost:3007/Foods', authConfig())
    .then(res => {
      setFoods(res.data.map((d, i) => ({...d, show: true, row: i})))
    })
    .catch(_ => setFoods('error'));
  }, [refresh, status]);

// GET RESERVATIONS
  useEffect(()=>{
    if(status === 1){
        return;
    }
    axios.get('http://localhost:3007/reservations', authConfig())
    .then(res => {
      setReservations(res.data.map((d, i) => ({...d, show: true, row: i})))
    })
    .catch(_ => setReservations('error'));
  }, [refresh, status]);

//CREATE
useEffect(()=>{
  if(saveFood === null){
    return;
  }
  axios.post('http://localhost:3007/Foods', saveFood, authConfig())
  .then(res => setRefresh(Date.now()));
}, [saveFood]);

//CREATE RESERVATION
useEffect(()=>{
  if(createRes === null){
    return;
  }
  axios.post('http://localhost:3007/reservations', createRes, authConfig())
  .then(res => setRefresh(Date.now()));
}, [createRes]);

//UPDATE
useEffect(()=>{
  if(editFood === null){
    return;
  }
  axios.put('http://localhost:3007/Foods/' + editFood.id, editFood, authConfig())
  .then(res => setRefresh(Date.now()));
}, [editFood]);

//UPDATE RESERVATION
useEffect(()=>{
  if(updateRes === null){
    return;
  }
  axios.put('http://localhost:3007/reservations/' + updateRes.id, updateRes, authConfig())
  .then(res => setRefresh(Date.now()));
}, [updateRes]);

//DELETE
useEffect(() => {
  if (null === deleteFood) {
      return;
  }
  axios.delete('http://localhost:3007/Foods/'+ deleteFood.id, authConfig())
  .then(res => setRefresh(Date.now()));
}, [deleteFood]);

  return (
    <BrowserRouter>
    <DataContext.Provider value={{
      refreshStatus,
      status,
      setStatus,
      setRefresh,
      refresh,
      setModalEdit,
      modalEdit,
      setModalDelete,
      modalDelete,
      setModalReserve,
      modalReserve,
      Foods,
      reservations,
      setFoods,
      setSaveFood,
      setEditFood,
      setDeleteFood,
      setCreateRes,
      setUpdateRes,
    }}>
      <div className="App">
        <header className="App-header">
          {/* <ShowNav /> */}
          <Routes>
            <Route path='/' element={<LoginPage setRefreshStatus={setRefreshStatus} />}> </Route>
            <Route path='/login' element={<LoginPage setRefreshStatus={setRefreshStatus} />}> </Route>
            <Route path='/logout' element={<LogoutPage setRefreshStatus={setRefreshStatus} />}> </Route>
            <Route path='/home' element={<RequireAuth role='user'><Home /></RequireAuth>}></Route>
            <Route path='/admin/foods' element={<RequireAuth role='admin'><Create /></RequireAuth>}></Route>
          </Routes>
          <Footer />
        </header>
      </div>
    </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
