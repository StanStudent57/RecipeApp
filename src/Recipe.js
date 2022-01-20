import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { TextField, Button } from "@material-ui/core"
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import axios from "axios"
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DeleteOutlined, EditOutlined } from "@material-ui/icons"
const useStyles = makeStyles((theme) => ({
  card: {
    flex: 1,
    height: '100%',
    marginTop: '10px',
  },
  cardActionArea: {
    flex: 1,
    height: '100%',
    backgroundColor: 'green',
  },
  cardMedia: {
    height: '0',
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flex: 1,
  },
  cardContentTitle: {
    flex: 1,
  },
  root: {
    marginBottom: "15px",
    position: "relative",
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    100: 56.25
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const Recipe = ({ name, instructions, recipe, setRecipesList, recipesList }) => {
  const [editState, setEditState] = useState(false)
  const [editName, setEditName] = useState(recipe.name)
  const [editInstructions, setEditInstructions] = useState(recipe.instructions)
  const [ingredient, setIngredient] = useState("")
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelete = (id) => {
    //this function runs when delete button is clicked

    axios.delete(`http://localhost:3001/delete/${id}`).then(d => {
      // d is the response from the backend
      setRecipesList(recipesList.filter(function (item) {
        return item.id !== id
      }))
    });

  }
  const handleEditSave = async (id) => {
    // this function runs when user clicks on save button after editing
    const ingredients = JSON.parse(recipe.ingredients)
    //spreading the previous ingredients using the ... spread operator
    const newIngredients = [...ingredients, ingredient]
    //using await keyword because its a network request


    const response = await axios.post(`http://localhost:3001/edit/${id}`, { name: editName, instructions: editInstructions, ingredients: newIngredients })
    setRecipesList(response.data.filter(function (item) {
      return item.name === editName
    }));
    setExpanded(false)
    console.log(response)
    setTimeout(() => {
      alert("saved")
    }, 1000)

  }
  // console.log(recipe.ingredients)
  const handleEditClick = () => {
    console.log(recipe.ingredients)
    setEditState(true)
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
      />


      <CardMedia
        className={classes.media}
        image="/images/img1.jpeg"
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        </Typography>
      </CardContent>
      <CardActions>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          id={`expand${recipe.name}`}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>

        <CardContent>
          <IconButton id={`editButton-${recipe.name}`} onClick={handleEditClick} style={{ position: "absolute", top: 0, right: 50, width: "20%" }}>
            <EditOutlined />
          </IconButton>
          <IconButton id={`deleteButton${recipe.name}`} onClick={() => handleDelete(recipe.id)} style={{ position: "absolute", top: 0, right: 0, width: "20%" }}>
            <DeleteOutlined />
          </IconButton>
          <div style={{
            backgroundColor: recipe.isGlutenFree ? "#22bb33" : "#f0ad4e",
            color: "white", padding: 20, marginBottom: 10
          }}>


            {recipe.isGlutenFree ? <span>This is gluten-free</span> : <span>This is not gluten-free </span>}

          </div>
          {editState && (
            <>
              <TextField value={editName} id={`editRecipeName${recipe.name}`} onChange={(event) => setEditName(event.target.value)} label="name" />
              <TextField value={editInstructions} id={`editRecipeInstructions${recipe.name}`} onChange={(event) => setEditInstructions(event.target.value)} label="instructions" />
              <TextField label="Add Ingredients" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
              <div>
                <Button onClick={() => setEditState(false)}>Close</Button>
                <Button id={`saveEdit${recipe.name}`} onClick={() => handleEditSave(recipe.id)} disabled={!editName && !editInstructions}> Save</Button>

              </div>
            </>
          )}
          <Typography paragraph>Ingredients:</Typography>
          <ul>
            {recipe.ingredients && JSON.parse(recipe.ingredients).map(item => <li key={item} >{item}</li>)}
          </ul>
          <Typography paragraph>Instructions to prepare:</Typography>
          <Typography paragraph>
            {instructions}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Recipe;