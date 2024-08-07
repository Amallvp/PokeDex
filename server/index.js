const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "./Database/data.json");

app.use(express.json());
app.use(cors());

// Helper function to read data from file
const readData = () => {
  const rawData = fs.readFileSync(DATA_FILE);
  return JSON.parse(rawData);
};

// Helper function to write data to file
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

//Create new user

app.post("/users", (req, res) => {
  const data = readData();
  const newUser = { ...req.body, id: uuidv4() };
  data.users.push(newUser);
  writeData(data);
  res.status(201).json(newUser);
});

// .................................get all users......................................... // 

app.get("/users", (req, res) => {
  const data = readData();
  res.json(data.users);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// get single user

app.get("/users/:id", (req, res) => {
  const data = readData();

  const user = data.users.find((user) => user.id === req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not Found" });
  }

  res.json(data.users);
});




// ...................To add new pokemon to user ..............................//

app.post('/users/:userId/pokemons', (req, res) => {
  const { userId } = req.params;
  const newPokemon = req.body;
  const data = readData();
  
  // Find user
  const user = data.users.find(user => user.id === userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  } 
  
  // Add new Pokémon
  user.pokemons.push({
    pokemonName: newPokemon.pokemonName,
    pokemonAbility: newPokemon.pokemonAbility,
    initialPositionX: newPokemon.initialPositionX,
    initialPositionY: newPokemon.initialPositionY,
    speed: newPokemon.speed,
    direction: newPokemon.direction
  });
  
  // Save data
  writeData(data);
  res.status(201).json({ message: 'Pokémon added successfully', user });
});

