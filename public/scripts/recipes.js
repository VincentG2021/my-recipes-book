// FRONT END FILE TO INTERACT WITH THE DOM
const addRecipeBtn = document.getElementById('btn-agregar');
const inputFromTheUser = document.getElementById('recipeInput').value;
const loadRecipeBtn = document.getElementById('btn-load');
const reffromUser = document.getElementById('ref').value;
const listContainer = document.getElementById('lista');

const sendRecipeToServer = (recipe) => {
    fetch('api/recipe/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success after add data resp from serveur back-end:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const selectAllRecipes = () => {
    allRecipes = document.querySelectorAll('#lista li')
    console.log(allRecipes)
    // addEventToAllRecipes(allRecipes)
    // addEventToAllDeleteBtns(allRecipes)
  }

  const loadreffromDB = () => {
    fetch('api/recipe/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
        // list.innerHTML="";
        console.log('Success after get data resp from serveur back-end :', data);
        data.recipesKey.forEach((recipe) => {
            listContainer.insertAdjacentHTML('beforeend', `<li data-id=${recipe.id}><a href="#">${recipe.Title}</a></li>`)
        })
        selectAllRecipes()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }




addRecipeBtn.addEventListener('click', (event) => {
    let addRecipeBtn = document.getElementById('btn-agregar');
    let inputFromTheUser = document.getElementById('recipeInput');
    console.log(inputFromTheUser.value);
    listContainer.insertAdjacentHTML('beforeend', `<li><a href="#">${inputFromTheUser.value}</a></li>`)
    sendRecipeToServer({input: inputFromTheUser.value});
    // inputFromTheUser.value = "";    
    alert('yum yum thanks for this recipe');
})

loadRecipeBtn.addEventListener('click', (event) => {
    let loadRecipeBtn = document.getElementById('btn-load');
    let reffromUser = document.getElementById('ref').value;
    console.log(reffromUser);
    loadreffromDB();
    listContainer.insertAdjacentHTML('beforeend', `<li><a href="#">${reffromUser}</a></li>`)
    // inputFromTheUser.value = "";
    alert('enjoy !');
})

