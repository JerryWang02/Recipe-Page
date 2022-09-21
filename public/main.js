//clears the data and stores into variable
const plusIcon = document.querySelector(".plus-icon");
const searchBar = document.querySelector(".search");
const searchIcon = document.querySelector(".search-icon");

let count = 1;
let count1 = 1;
let count2 = 1;
let place = 1;
let list = '';
var recipeTitle = '';
var prepTime = 'Prep Time: ';
var used = 'Used: ';
var needed = 'Need: ';
var foodImage = '';
var id = 0;


function getIngrediant()
{
  var name = document.getElementById('foodField').value;
  document.getElementById(count).innerText = name;
  count++;
  list = list + document.getElementById('foodField').value + ','
}

function getMealData2(id){
  fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=c9521373544946a4b40f985493759df8&includeNutrition=true`
  )
  .then((response) => response.json())
  .then(data => {
    if(count2 == 2)
    {
      place = 3;
    }
    else if(count2 == 3)
    {
      place = 2;
    }
    prepTime = 'Prep Time: '
    prepTime = prepTime + data.readyInMinutes + ' minutes';
    document.getElementById("PrepTime" + place).innerText = prepTime;
    count2++;
  })
}

function getMealData(){
  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?apiKey=c9521373544946a4b40f985493759df8&number=3&ranking=1&ignorePantry=true&ingredients=${list}`
  )
  .then((response) => response.json())
  .then(data => {
    for(i in data)
    {
      needed = 'Need: ';
      used = 'Used: ';
      recipeTitle = data[i].title;
      document.getElementById("RecipeName" + count1).innerText = recipeTitle;
      //calls function to get the prep time
      id = data[i].id;
      getMealData2(id);
    
      //used ingredients
      for(var n = 0; n < data[i].usedIngredients.length; n++)
      {
        if(n == data[i].usedIngredients.length - 1)
        {
          used += data[i].usedIngredients[n].name;
        }
        else
        {
          used += data[i].usedIngredients[n].name + ', ';
        }
      }
      document.getElementById("Use" + count1).innerText = used;

      //needed ingredients
      for(var n = 0; n < data[i].missedIngredients.length; n++)
      {
        if(n == data[i].missedIngredients.length - 1)
        {
          needed += data[i].missedIngredients[n].name;
        }
        else
        {
          needed += data[i].missedIngredients[n].name + ', ';
        }
      }
      document.getElementById("needed" + count1).innerText = needed;


      foodImage = data[i].image;
      document.getElementById("food" + count1).src = foodImage;
      count1++;
    }
  })
}

searchBar.addEventListener("keyup", () => {
    if(searchBar.value && plusIcon.style.visibility != "visible")
    {
      plusIcon.style.visibility = "visible";
    } 
    else if(!searchBar.value) 
    {
      plusIcon.style.visibility = "hidden";
    }
  });

plusIcon.addEventListener("click", getIngrediant);

plusIcon.addEventListener("click", () => {
    searchBar.value = " ";
    plusIcon.style.visibility = "hidden";
})

searchIcon.addEventListener("click", getMealData);
