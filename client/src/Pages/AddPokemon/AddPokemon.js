import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/Context";
import { useParams } from "react-router-dom";
import axios from "axios";
function AddPokemon() {
  const { id } = useParams();
  const { users, setUsers } = useContext(UserContext);
  const { pokedata, setPokedata } = useContext(UserContext);
  const [abilities, setAbilities] = useState([]);
  const [inputData, setInputData] = useState({

    pokemonName: "",
    pokemonAbility: "",
    initialPositionX: "",
    initialPositionY: "",
    speed: "",
    direction: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  // to get user Details

  const getUserDetails = async () => {
    try { 
      const res = await axios.get(`http://localhost:5000/users/${id}`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //get pokemon

  const getPokemon = async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");

    const response = await Promise.all(
      res.data.results.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );
    setPokedata(response);
  };

  // abilities

  const fetchPokemonAbilities = async () => {
    if (inputData.pokemonName) {
      const selectedPokemon = pokedata.find(
        (pokemonName) => pokemonName.name === inputData.pokemonName
      );
      if (selectedPokemon) {
        setAbilities(selectedPokemon.abilities.map((ab) => ab.ability.name));
      }
    }
  };

  useEffect(() => {
    getUserDetails();
    getPokemon();
    fetchPokemonAbilities();
  }, [inputData.pokemonName]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/users/${id}/pokemons`, inputData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding Pokémon', error);
      alert('Failed to add Pokémon');
    }
  };









  




  




  return (
    <div className="addpokemon">
      <div className="container">
        <form action="" className="input-NewPokemon" onSubmit={handleSubmit} >
          <input
            type="text"
            value={users.userName}
            name="userName"
            placeholder="Name"
          />

          <input
            type="number"
            name="initialPositionX"
            placeholder="x"
            value={inputData.initialPositionX}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="initialPositionY"
            placeholder="y"
            value={inputData.initialPositionY}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="speed"
            placeholder="speed"
            value={inputData.speed}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="direction"
            placeholder="direction"
            value={inputData.direction}
            onChange={handleInputChange}
          />

          <select
            name="pokemonName"
            id=""
            value={inputData.pokemonName}
            onChange={handleInputChange}
          >
            <option value="">Select Pokemon</option>

            {pokedata ? (
              pokedata.map((data) => (
                <option value={data.name} key={data.id}>
                  {data.name}
                </option>
              ))
            ) : (
              <option value="">No Data Found</option>
            )}
          </select>

          <select
            name="pokemonAbility"
            id=""
            value={inputData.pokemonAbility}
            onChange={handleInputChange}
          >
            <option value="">Select Ability</option>
            {abilities ? (
              abilities.map((data, index) => (
                <option value={data} key={index}>
                  {data}
                </option>
              ))
            ) : (
              <option value="">No Data Found</option>
            )}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddPokemon;
