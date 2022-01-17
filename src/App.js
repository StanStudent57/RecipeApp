import './App.css';
import { useState, useRef } from 'react';
import Axios from 'axios';
import Recipe from './Recipe';
import React from 'react';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button, Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import { SearchOutlined, FilterList as Filter } from "@material-ui/icons";
import { InputBase, Tooltip } from "@material-ui/core"
import { TextField } from '@material-ui/core';
import { Grid } from "@material-ui/core";
import { orange } from '@material-ui/core/colors';
import axios from 'axios';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      color: "white",
      border: "2px solid #dacd0a",
      margin: 7,
      "&.Mui-focused": {
        border: "none",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none"
        }
      }
    },
    instructions: {
      padding: 15, width: 260
    }
  })
);
const BlueOnGreenTooltip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "green"
    , fontSize: "1rem",
    padding: 10
  }
})(Tooltip)

function App() {
  const inputRef = useRef()
  const [name, setName] = useState("")
  const [isGlutenFreeChecked, setGlutenFree] = useState(false)
  // name is the state value and setName is the function used to modify it
  //I used the useState React hook to store state variables which are name,instructions,recipesList
  const [instructions, setInstructions] = useState("");
  // const [ingredient, setIngredient] = useState[]);
  const [recipesList, setRecipesList] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState("")
  const [ingredients, setIngredients] = useState([]);
  const hideRecipes = function () {
    setRecipesList([])
  }
  const addRecipe = function () {
    if (!name || !instructions || ingredients.length == 0) {
      alert("Please input all the required fields")
      return;
    }
    setInstructions("")
    setName("")
    setIngredients([])
    Axios.post("http://localhost:3001/create", {
      name: name,
      instructions: instructions,
      ingredients,
      isGlutenFree: isGlutenFreeChecked

    }).then((res) => {
      //Response from the node.js/express backend

      setRecipesList(res.data.filter(function (item) { return item.name === name && item.instructions === instructions }))
      console.log("success");
    });
  };
  const addIngredients = function () {
    setIngredients([...ingredients, inputRef.current.value])
    inputRef.current.value = ""
  }
  //this functions makes a request to our backend which is running on port 3001 and it gets all the recipes in the response
  // and upon getting all the recipes it sets the recipe list state variable to the response using the functions provided by the useState hook
  //
  const getRecipes = function () {
    Axios.get("http://localhost:3001/recipes").then((response) => {
      console.log(response);
      setRecipesList(response.data);
    });
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleFilter = function () {
    const data = recipesList.filter(function (item) {
      return item.isGlutenFree
    })
    setRecipesList(data)
  }
  const handleSearch = async function () {
    const res = await axios.get("http://localhost:3001/recipes")
    const data = res.data.map((item) => {

      if (item.ingredients) {
        console.log(searchedTerm, item.ingredients, "Search term and item ingredients")
        if (item.ingredients.includes(capitalizeFirstLetter(searchedTerm)) || item.ingredients.includes(searchedTerm)) {
          console.log(item)
          return item
        }
        else if (item.ingredients.includes(searchedTerm.toLowerCase()) || item.ingredients.includes(searchedTerm)) {
          return item
        }

      }
    }).filter(item => item && item)


    const nameResult = res.data.filter((item) => {
      return item.name.toLowerCase().includes(searchedTerm.toLowerCase())
    })
    if (data.length === 0 && nameResult.length > 0) {
      setSearchedTerm("")
      setRecipesList(nameResult)
      return
    }
    if (data.length === 0) {
      setSearchedTerm("")
      alert("This Item Does Not exist!.")
    }
    setSearchedTerm("")
    setRecipesList(data)
    console.log(data)

  }
  const classes = useStyles();

  //a Material-UI hook to get access to the classes in the makeStyles function on the top

  return (
    <div className="App" style={{ display: "flex" }}>
      <div className="RecipeForm" style={{ marginTop: 150 }}>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", position: "absolute", top: 35, right: 50, borderRadius: 8, width: 350, backgroundColor: "white", padding: 20 }}>
            <InputBase
              value={searchedTerm}
              onChange={e => setSearchedTerm(e.target.value)}
              placeholder="search by name/ingredients"
              inputProps={{ 'aria-label': 'search recipes' }}
            />
            <IconButton style={{ width: 30, height: 30 }}>
              <SearchOutlined onClick={handleSearch} />
            </IconButton>

            <BlueOnGreenTooltip title="Filter for Gluten Free" placement="top">
              <IconButton style={{ height: 20, width: 20 }} onClick={handleFilter}>
                <Filter />
              </IconButton>

            </BlueOnGreenTooltip>

          </div>

        </div>

        <label style={{ fontFamily: '"Lobster",cursive', fontSize: 30 }}>Recipe Name:</label>
        <TextField
          style={{ padding: 5, margin: 3 }}
          type="text"
          value={name}
          InputProps={{ className: classes.root }}
          className={classes.textfield}
          onChange={(event) => {
            //function setting name to event.target.value
            setName(event.target.value);
          }}
        />
        <label style={{ fontFamily: '"Lobster",cursive', fontSize: 30 }}>Recipe Instructions:</label>
        <TextField

          type="text"
          InputProps={{ className: `${classes.root} ${classes.instructions}` }}
          className={classes.textfield}
          value={instructions}
          onChange={(event) => {
            setInstructions(event.target.value);
          }}
        />

        <label style={{ fontFamily: '"Lobster",cursive', fontSize: 30 }}>Ingredients:</label>
        <TextField
          inputRef={inputRef}
          style={{ marginBottom: 7 }}
          type="text"
          InputProps={{ className: `${classes.root} ${classes.instructions}` }}
          className={classes.textfield}
          onKeyPress={e => {
            if (e.charCode === 13) {
              addIngredients()
            };
            return
          }}
        />


        <Button onClick={addIngredients} style={{ backgroundColor: "#2196f3", borderRadius: 5, color: "white" }} color="primary" variant='contained' size="large">Add Ingredient </Button>
        {ingredients.length >= 1 && <div style={{ backgroundColor: "white", minHeight: 50, minWidth: 292, marginTop: 10, padding: 12 }}>
          <h3>Ingredients</h3>

          <ul>
            {ingredients.map(ingredient => <li key={ingredient}>{ingredient} </li>)}
          </ul>
        </div>}
        <FormControlLabel control={<Checkbox checked={isGlutenFreeChecked} onChange={e => setGlutenFree(e.target.checked)} />} label="Is Gluten Free?" />
        <Button onClick={addRecipe} style={{ backgroundColor: "#2196f3", borderRadius: 5, marginBottom: 10, color: "white" }} color="primary" variant='contained' size="large">Add Recipe </Button>
        <Button onClick={getRecipes} style={{ backgroundColor: "#33eb91", height: 40, borderRadius: 5, marginBottom: 10, color: "white" }} color="primary" variant='contained' size="large">Show All Recipes </Button>
        <Button onClick={hideRecipes} style={{ backgroundColor: "#994477", height: 40, borderRadius: 5, color: "white" }} color="primary" variant='contained' size="large">Hide All Recipes </Button>
      </div>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={2}
        >
          {/* mapping over the array of recipeLists and returning the Recipe component for each item inside the recipeLists array*/}
          {recipesList.map(recipe => (
            <Recipe
              recipe={recipe}
              recipesList={recipesList}
              setRecipesList={setRecipesList}
              key={`${recipe.name} ${Math.random()}`}
              name={recipe.name}
              instructions={recipe.instructions}
            // ingredients = {recipe.ingredients} 
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
