import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";


function AddUser() {
 
    const navigate = useNavigate()
    const{ pokedata , setPokedata } = useContext(UserContext)
    const [abilities, setAbilities] = useState([]);
    const [inputData, setInputData] = useState({
      userName: "",
      pokemon: "",
      ability: "",
      positionX: "",
      positionY: "",
      speed: "",
      direction: "",
    });
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prev) => ({ ...prev, [name]: value }));
      };



// //<................to get pokemon details.................................>//
    
const getPokemon = async () => {
 try { const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");

  const response = await Promise.all(
    res.data.results.map(async (item) => {
      const result = await axios.get(item.url);
      return result.data;
    })
  );
  console.log('Fetched Pokémon data:', response); // Log fetched data
  setPokedata(response);
}
catch(error){

  console.error('Error fetching Pokémon data:', error);
}
 
};



// //<................function to get the abilities whech seleting pokemon.................................>//

useEffect(() => {
    const fetchAbilities = async (e) => {
      if (inputData.pokemon) {
        try {
          const pokemonNameSelected = pokedata.find(
            (pokemon) => pokemon.name === inputData.pokemon
          );

          if (pokemonNameSelected) {  
            const abilities = await pokemonNameSelected.abilities.map(
              (ability) => ability.ability.name

            );
            setAbilities(abilities);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        setAbilities([]);
      }
    };  getPokemon();
    fetchAbilities();
    
  }, [inputData.pokemon , setPokedata]);


  const formatData = () => {
    return {
      userName: inputData.userName,
      pokemons: [
        {
          pokemonName: inputData.pokemon,
          pokemonAbility: inputData.ability,
          initialPositionX: inputData.positionX,
          initialPositionY: inputData.positionY,
          speed: inputData.speed,
          direction: inputData.direction,
        }
      ]
    };
  };



  const handleSubmit = async(e) => {
    e.preventDefault();
    const formattedData = formatData()
   try{

    const res = await axios.post ("http://localhost:5000/users",formattedData) 
    console.log('Response:', res.data);
    navigate("/list")

   }catch  (error){
    console.error('Error submitting form:', error);

   }
  }


  return (
<div className="addUser">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            value={inputData.userName}
            placeholder="ownername"
            onChange={handleChange}
          />
          <input
            type="number"
            name="positionX"
            value={inputData.positionX}
            placeholder="x"
            onChange={handleChange}
          />
          <input
            type="number"
            name="positionY"
            value={inputData.positionY}
            placeholder="y"
            onChange={handleChange}
          />
          <input
            type="number"
            name="speed"
            value={inputData.speed}
            placeholder="speed"
            onChange={handleChange}
          />
          <input
            type="text"
            name="direction"
            value={inputData.direction}
            placeholder="direction"
            onChange={handleChange}
          />

          <select
            name="pokemon"
            id=""
            value={inputData.pokemon}
            onChange={handleChange}
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
            name="ability"
            id=""
            value={inputData.ability}
            onChange={handleChange}
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
  )
}

export default AddUser