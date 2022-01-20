<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->

# Recipe React App

## Technologies used in this project.

### Create-React-App

### Material-UI

### Node.js

### Express.js

### axios Library

### React-hooks

### MySQL

### HTML5

### CSS3

### JavaScript

## Introduction of My Application

The objective was to build a Web API that will provide recipes to the users, based on the ingredients inserted in search bar by them and then the application will display a list of recipes which will use the ingredients selected by the user. The user will have filters to select the kind of recipe it wants and then the result can be sorted and filtered according to the user needs (for example if the dish has allergen content in our use case gluten). Recipe Web API project’s aim is to find out the desired recipes to the user. My project Recipe Web API suggests multiple recipes against any ingredient and it easily detects the matched and unmatched recipes.

## Functionalities

This Web API consists of four main elements: Create Recipe, Search, Read, Update/Delete which mostly represent basic CRUD operations:

### Create/ Add Recipe Operation is expressed by four main fields:

• Add Recipe Name
• Add instructions
• Add ingredients
• Checkbox for Add/ Select Gluten Free
In adding recipe to menu, chef will type recipe name, add instructions for recipe and details about the ingredients that will be used in recipe. The detail about whether the recipe is gluten free or not will also be added. When user click on add ingredient button the recipe will be added to the menu of the app.

### Read/ Search Operation:

Read, retrieve, search, or view existing entries is expressed by five elements:
• Search by Name
• Search by Ingredient
• Filter by Gluten Free
• Show all Recipes
• Hide all Recipes

Chef/waiter can search for recipe by entering a name of recipe, or can search for recipe by ingredient name by typing it in search bar on the top right of the web app. For example, if chef search for olives, it will display all recipes which include olives in it. If there is no such recipe which has olives in it, it will pop-up a message: “this item doesn’t exist”.
In our search bar user can filter recipes whether it is gluten free or not. Filter button also hovers a message “Filter for Gluten free”. If the user clicks on the dropdown button bellow recipe more details are shown like its ingredients and instructions for preparation. When user click on show all recipe box button, web app will show all the recipes available in the menu. Additionally, a message “This is gluten-free” on top of recipe details in green bar will show recipes which don’t have gluten. The same functionality is performed by pressing the button hide all recipes.

### Update:

We have two icons on the right top of the recipe drop box. One icon will use for update the recipe and another for deleting the recipe.
• Edit Specific Recipe (Update Name/Instructions/ Ingredients)
We can press on the recipe for the further information and a drop-down box will show the details about ingredients and instructions. It will also provide the information about the recipe whether it is gluten free or not.
To update a recipe, chef will search and select a recipe from menu and click on edit icon to modify the recipe. When he/she click on edit icon the details to edit will appear. Chef can edit recipe name, instruction about recipe and ingredients. Below there are two buttons: close and save. Close operation will close the recipe without changing any details and save option will make changes and update the recipe.

### Delete:

On the right top of the recipe component we have a delete icon which sends a DELETE request to the backend for that particular recipe. Clicking on delete icon, the recipe will be deleted.
