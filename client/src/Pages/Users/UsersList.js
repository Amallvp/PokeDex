import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./userList.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/Context";


function UsersList() {
 
  const { users,setUsers } = useContext(UserContext)
  const{ pokedata , setPokedata } = useContext(UserContext)
console.log(pokedata);

  

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    };

    getAllUsers();
  }, [setUsers]);


  const getLatestPokemonData = (users) => {
    return users.map(user => {
      
      const latestPokemon = user.pokemons[user.pokemons.length - 1];
      return {
        ...user,
        latestPokemon,
        numberOfPokemons: user.pokemons.length,
      };
    });
  };

  
  const transformedUsers = getLatestPokemonData(users)

  return (
   
 <div className="container">
      <div className="user-details">
        <div className="buttons">
          <button>Delete all</button>
          <button>Button</button>
        </div>
        <div className="Table-Details">
        <table className="userList">
      <thead>
        <tr>
          <th>OwnerName</th>
          <th>PokemonName</th>
          <th>PokemonAbility</th>
          <th>Number of Pokemon</th>
          <th>Add Pokemon</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {transformedUsers.map(user => (
          <tr key={user.id}>
            <td>{user.userName}</td>
            <td>{user.latestPokemon ? user.latestPokemon.pokemonName : 'N/A'}</td>
            <td>{user.latestPokemon ? user.latestPokemon.pokemonAbility : 'N/A'}</td>
            <td>{user.numberOfPokemons}</td>
            <td><Link to={`/user-addpokemon/${user.id}`} ><button>+</button></Link></td>
            <td><Link  to={`/user-edit/${user.id}`} ><button>Edit</button></Link></td>
            <td><button>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
      </div>
    </div>


  );
}

export default UsersList;

