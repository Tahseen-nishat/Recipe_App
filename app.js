let search_inp=document.querySelector("#search_inp");
let search_btn=document.querySelector("#search_btn");
let meals=document.querySelector(".meals");
let body=document.querySelector("body");
let alldishes=document.querySelectorAll(".dishVal");
const searchrecipe=async (search)=>{
    try{
    let responce= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    let alldata=await responce.json();
    meals.innerHTML="";
    search_inp.value="";
    alldata.meals.forEach(function(data){
        //console.log(data);
        let div=document.createElement("div");
        div.classList.add("card");
        div.innerHTML=`
        <img src=${data.strMealThumb} alt="">
        <p id="name">${data.strMeal}</p>
        <button class="viewbtn" data-id=${data.idMeal}>Recipe</button>
        `;
        meals.append(div);
        //viewbtn=document.querySelector(".viewbtn");
        });
        document.querySelectorAll(".viewbtn").forEach(button => {
            button.addEventListener("click", function() {
                let mealId = this.getAttribute("data-id");
                getrecipidetails(mealId);
            });
        });
    }catch(error){
        alert("Meal not found");
    }
};

const getrecipidetails=async(mealId)=>{
    let responce1=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    let data1=await responce1.json();
    console.log(data1);
    meals.style.display="none";
    let newdiv=document.createElement("div");
    newdiv.classList.add("newdiv");
    console.log(newdiv);
    let ingrediats="";
    for(let i=1;i<=20;i++){
        if(data1.meals[0][`strIngredient${i}`]){
            ingrediats+=`<li>${data1.meals[0][`strIngredient${i}`]} - ${data1.meals[0][`strMeasure${i}`]}</li>`;
        }
    }
    newdiv.innerHTML=`
    <img src=${data1.meals[0].strMealThumb} alt="">
    <div class="disc">
    <h1 id="title">${data1.meals[0].strMeal}</h1>
    <p>Ingredients</p>
    <ul class="ingr">
        ${ingrediats}
    </ul>
    <p>Instructions</p>
    <p id="instructions">${data1.meals[0].strInstructions}</p>
    <div class="buttonss">
    <button id="vid"><a href="${data1.meals[0].strYoutube}">Watch Here</a></button>
    <button id="back">Back</button>
    </div>
    </div>
    `;
    console.log(newdiv);
    body.appendChild(newdiv);
    document.querySelector("#back").addEventListener("click", () => {
        newdiv.remove();
        meals.style.display = "flex";
    });
};
    
search_btn.addEventListener("click", ()=>{
    let search=search_inp.value;
    if(search==""){
        alert("Please enter the name of dish you want to search...!");
    }else{
        searchrecipe(search);
    }
});

alldishes.forEach(function(bttnval){
    bttnval.addEventListener("click", ()=>{
        let idm=bttnval.value;
        searchrecipe(idm);
    })
})

