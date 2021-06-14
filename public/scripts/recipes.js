// FRONT END FILE TO INTERACT WITH THE DOM
// const searchRecipeBtn = document.getElementById('btn-search');
// const lookintoMealDB = document.getElementById('lookinto').value;
// const addRecipeBtn = document.getElementById('btn-agregar');
// const inputFromTheUser = document.getElementById('recipeInput').value;
// const loadRecipeBtn = document.getElementById('btn-load');
// const reffromUser = document.getElementById('ref').value;
const listContainer = document.getElementById('lista');


const searchRecipe = (recipe) => {
  // recipeContainer.innerHTML = ""
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
    // .then (res => console.log(res))
    .then(response => response.json())
    .then((data) => {
      console.log(data.meals);
      listContainer.insertAdjacentHTML('beforeend', `<li><img src=${data.meals.strMealThumb} style="background-image: url(${recipe.strMealThumb})"></img></li>`)
    })
}

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
      console.log('Success sendRecipeToServer client js :', data);
      data.forEach((recipe) => {
        
        listContainer.insertAdjacentHTML('beforeend', 
        
        `<li data-id=${recipe.id}><a href="#">${recipe.Title}</a></li>`
        )
      })
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
        console.log('Success loadreffromDB client js :', data);
        data.recipesKey.forEach((recipe) => {
          listContainer.insertAdjacentHTML('beforeend', `<li data-id=${recipe.id}><a href="#">${recipe.Title}</a></li>`)
        })
        selectAllRecipes()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }


  // let recipeCard = `<section>
  //         <div id="card" class="card" data-img=${recipe.Content} style="background-image: url(${recipe.Content})">
  //           <div class="inner">
  //             <div class="header">
  //               <i class="fa fa-info-circle" aria-hidden="true"></i>
  //               <h1 class="main-title">${recipe.Title}</h1>
  //               <div class="stars">
  //                 <i class="fa fa-star" aria-hidden="true"></i>
  //                 <i class="fa fa-star" aria-hidden="true"></i>
  //                 <i class="fa fa-star" aria-hidden="true"></i>
  //                 <i class="fa fa-star" aria-hidden="true"></i>
  //                 <i class="fa fa-star-half" aria-hidden="true"></i>
  //               </div>
  //             </div>
  //             <div class="content">
  //               <p class="type">${movie.Type}</p>
  //               <a class="year" href="#">${movie.Year}</a>
  //             </div>
  //             <div class="btn_row">
  //               <a href="#" id=${movie.imdbID} class="card-action">Add to my DB<i class="fa fa-caret-right" aria-hidden="true"></i>
  //               </a>
  //             </div>
  //           </div>
  //           <!-- the trailer -->
  //         </div>
  //       </section>`
let searchRecipeBtn = document.getElementById('btn-search');

searchRecipeBtn.addEventListener('click', (event) => {
  let lookintoMealDB = document.getElementById('lookinto');
  console.log(lookintoMealDB.value);
  alert('get inspired');
  searchRecipe(lookintoMealDB.value);
})




let addRecipeBtn = document.getElementById('btn-agregar');
addRecipeBtn.addEventListener('click', (event) => {
   
    let inputFromTheUser = document.getElementById('recipeInput');
    console.log(inputFromTheUser.value);
    listContainer.insertAdjacentHTML('beforeend', `<li><a href="#">${inputFromTheUser.value}</a></li>`)
    sendRecipeToServer({input: inputFromTheUser.value});
    // inputFromTheUser.value = "";    
    alert('yum yum thanks for this recipe');
})

let loadRecipeBtn = document.getElementById('btn-load');
loadRecipeBtn.addEventListener('click', (event) => {
    
    let reffromUser = document.getElementById('ref').value;
    console.log(reffromUser);
    loadreffromDB();
    listContainer.insertAdjacentHTML('beforeend', `<li><a href="#">${reffromUser}</a></li>`)
    // inputFromTheUser.value = "";
    alert('enjoy !');
})



