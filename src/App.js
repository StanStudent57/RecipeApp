import './App.css';
import { useState,useRef } from 'react';
import Axios from 'axios';
import Recipe from './Recipe';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import {InputBase } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  cardGrid: {
      flexGrow: 1,
      paddingTop: 16,
  },
}));

function App() {
  const inputRef=useRef()
  const [name, setName] = useState("")
  // name is the state value and setName is the function used to modify it
 //I used the useState React hook to store state variables which are name,instructions,recipesList
  const [instructions, setInstructions] = useState("");
  // const [ingredient, setIngredient] = useState[]);
  const [recipesList, setRecipesList] = useState([]);
  const [searchedTerm,setSearchedTerm]=useState("")
const[ingredients,setIngredients]=useState([]);
  const addRecipe = () => {
    if(!name || !instructions || ingredients.length==0){
      alert("Please input all the required fields")
      return;
    }
    Axios.post("http://localhost:3001/create", {
      name: name,
      instructions: instructions,
      ingredients
      
    }).then((res) => {
      //Response from the node.js/express backend
  
      setRecipesList(res.data)
      console.log("success");
    });
  };
  const addIngredients=()=>{
    setIngredients([...ingredients,inputRef.current.value])  
    inputRef.current.value=""
  }
//this functions makes a request to our backend which is running on port 3001 and it gets all the recipes in the response
// and upon getting all the recipes it sets the recipe list state variable to the response using the functions provided by the useState hook
//
  const getRecipes = () => {
    Axios.get("http://localhost:3001/recipes").then((response) => {
      console.log(response);
      setRecipesList(response.data);
    });
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 const handleSearch=()=>{
   const data=recipesList.map((item)=>{
   
      if(item.ingredients)  {
        console.log(searchedTerm,item.ingredients,"Search term adn item ingredients")
       if(item.ingredients.includes(capitalizeFirstLetter(searchedTerm)) || item.ingredients.includes(searchedTerm) ){
         console.log(item)
         return item
       }
        else if(item.ingredients.includes(searchedTerm.toLowerCase())  || item.ingredients.includes(searchedTerm) ){
          return item
        }
      
      } 
    }).filter(item=>item && item)
  
  setRecipesList(data)
  console.log(data)
  
 }
  const classes = useStyles();
  //a Material-UI hook to get access to the classes in the makeStyles function on the top

  return (
    <div className="App">
      <div className="RecipeForm">
  
     <div style={{display:"flex",justifyContent:"space-between",position:"absolute",top:100,right:100,width:350,backgroundColor:"white",padding:20}}> 
      <InputBase
      value={searchedTerm}
      onChange={e=>setSearchedTerm(e.target.value)}
        placeholder="find recipes by ingredients"
        inputProps={{ 'aria-label': 'search recipes' }}
      />
        <SearchOutlined   onClick={handleSearch} />
    </div>
      <label>Recipe Name:</label>
      <input
        type="text"
        onChange={(event) => {
          //function setting name to event.target.value
          setName(event.target.value);
        }}
      />
      <label>Recipe Instruction:</label>
      <textarea
        type="text"
        onChange={(event) => {
          setInstructions(event.target.value);
        }}
      />
     
  <label>Ingredients</label>
        <input type="text" ref={inputRef}   onKeyPress={e=>{
        if(e.charCode===13){
          addIngredients()
        };
        return
      }}  />
      <button onClick={addIngredients}>Add Ingredient</button>

      <div style={{backgroundColor:"white",minHeight:50,minWidth:292,marginTop:10,padding:12}}>
     { ingredients.length>=1 &&  <h3>Ingredients</h3>}
       
        <ul>
      {ingredients.map(ingredient=><li key={ingredient}>{ingredient} </li>)}
      </ul>
      </div>
      <button onClick={addRecipe}>Add Recipe</button>
      <button onClick={getRecipes}>Show All Recipes</button>
      </div>
      <Container className={classes.cardGrid} maxWidth="xl">
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
        setRecipesList={setRecipesList}
          key = {`${recipe.name} ${Math.random()}`}
          name = {recipe.name}
          instructions = {recipe.instructions}
          // ingredients = {recipe.ingredients} 
        />
        ))}
      </Grid>
      </Container>
    </div>
  );
}

export default App;
