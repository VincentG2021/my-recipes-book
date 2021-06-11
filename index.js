// lib and imports
const express = require("express");
const app = express();

const recipeControl = require("./controllers/recipe")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  // callback
  res.render('recipes.ejs');
});


// Create here your api setup
app.post('/api/recipe/add', (req, res) => {
  console.log('Hugh fetch ADD from the brain, req.body = ', req.body, 'res = ', res)
  recipeControl.addRecipeDB(req.body)
})

app.post('/api/recipe/load', (req,res) => {
  console.log("Hugh fetch LOAD from the brain")
  recipeControl.loadRecipe(res)
})



app.listen(3000, () => console.log("Server Up and running"));
