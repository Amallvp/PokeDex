import React from "react";
import AddUser from "./Pages/AddUser/AddUser";
import UsersList from "./Pages/Users/UsersList";
import { Route, Routes } from "react-router-dom";
import AddPokemon from "./Pages/AddPokemon/AddPokemon";
import EditUser from "./Pages/EditUser/EditUser";


function App() {
  return (
    <div>
     
      <Routes>
        <Route path={"/"} element={<AddUser />} />
        <Route path={"/list"} element={<UsersList />} />
        <Route path={"/user-addpokemon/:id"} element={<AddPokemon />} />
        <Route path={"/user-edit/:id"} element={<EditUser />} />
      </Routes>
   
    </div>
  );
}

export default App;
