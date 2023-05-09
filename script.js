// Initializing a local storage object if not already present



if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}


const cards = document.querySelector('.cards');
let arr = JSON.parse(localStorage.getItem("favouritesList"));




// Function to show all the meals when text is entered in the search input bar


async function showMeals(search = ''){
    console.log(search);
    if (search != ''){
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        const data = await response.json();
        

        const meals = data.meals;
        let cards = document.querySelector('.cards');


        cards.innerHTML = "";
        console.log(meals);

    
        if(meals){
            meals.forEach(meal => {

                // creating food cards dynamically based on search results

                // create a card for the card container
                const card = document.createElement('div');
                
                //add the required css class to it
                card.classList.add('food-card');

                // append the card to the container
                cards.appendChild(card);
                
                
                // create elemnts within the card
                const leftSection = document.createElement('div');
                const rightSection = document.createElement('div');
                leftSection.classList.add('left-section');
                rightSection.classList.add('right-section');

                card.appendChild(leftSection);
                card.appendChild(rightSection);

                //left section
                const image = document.createElement('img');
                image["src"] = meal.strMealThumb;
                
                image.classList.add('image');
                leftSection.appendChild(image);

                //right section
                let mName = document.createElement('p');
                let mCategory = document.createElement('p');
                let mType = document.createElement('p');
                const extras = document.createElement('div');


                let name = document.createElement('span');
                let category = document.createElement('span');
                let type = document.createElement('span');

                name.innerHTML = meal.strMeal;
                category.innerHTML = meal.strCategory;
                type.innerHTML = meal.strArea;

            

                mName.innerHTML = 'Meal Name : ' ;
                mCategory.innerHTML = 'Meal Category : ' ;
                mType.innerHTML = 'Meal Area : ' ;

                mName.appendChild(name);
                mCategory.appendChild(category);
                mType.appendChild(type);
                

                extras.classList.add('extras');
                

                rightSection.appendChild(mName);
                rightSection.appendChild(mCategory);
                rightSection.appendChild(mType);
                rightSection.appendChild(extras);

                const details = document.createElement('button');
                const youtube = document.createElement('a');
                const favIcon = document.createElement('a');

                youtube["href"] = meal.strYoutube;
                youtube["target"] = "_blank";
                details.innerHTML = 'More Details';
                youtube.innerHTML = 'Watch Video';
                favIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
                details.classList.add('details');
                youtube.classList.add('video');
                favIcon.classList.add('fav-icon');



                favIcon.addEventListener( 'click' , function(){
                    
                    arr.push(meal);
                    localStorage.setItem("favouritesList", JSON.stringify(arr));
                    alert("Added To Favorites!");
                    
                    removeAll();
                    showFavMeals();

                    

                });


                // Event listener - When "More Details" button is clicked on ant meal, this will open a new card with all the details of the meal


                details.addEventListener('click', async function() {

                    let id = meal.idMeal;
                    const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const newdata = await mealData.json();
                    const newData = newdata.meals[0];
                    console.log(newData);

                    // Creating "More Details" card dynamically for the seleted meal

                    let mainBody = document.getElementById('main-body');
                    let detailsTabContainer = document.getElementById('details-tab-container');

                    let searchMeals = document.getElementById('search-meals');


                    let detailsTab = document.createElement('div');
                    let leftSectionDetails = document.createElement('div');
                    let rightSectionDetails = document.createElement('div');
                    let mealImage = document.createElement('div');
                    let mealImg = document.createElement('img');
                    let mealInfo = document.createElement('div');
                    let mealName = document.createElement('p');
                    let mealCategory = document.createElement('p');
                    let mealArea = document.createElement('p');
                    let instructions = document.createElement('div');
                    let ins = document.createElement('p');
                    let links =document.createElement('div');
                    let wv = document.createElement('a');
                    let wvb = document.createElement('button')
                    let ci = document.createElement('button');



                    detailsTabContainer.appendChild(detailsTab);
                    detailsTab.appendChild(leftSectionDetails);
                    detailsTab.appendChild(rightSectionDetails);
                    leftSectionDetails.appendChild(mealImage);
                    leftSectionDetails.appendChild(mealInfo);
                    mealImage.appendChild(mealImg);
                    mealInfo.appendChild(mealName);
                    mealInfo.appendChild(mealCategory);
                    mealInfo.appendChild(mealArea);
                    rightSectionDetails.appendChild(instructions);
                    instructions.appendChild(ins);
                    rightSectionDetails.appendChild(links);
                    wv.appendChild(wvb);


                    detailsTab.classList.add('details-tab');
                    leftSectionDetails.classList.add('left-section-details');
                    rightSectionDetails.classList.add('right-section-details');
                    mealImage.classList.add('meal-image');
                    mealImg.classList.add('mealI');
                    mealInfo.classList.add('meal-info');
                    instructions.classList.add('instructions');
                    links.classList.add('links');


                    mealImg["src"] = newData.strMealThumb;
                    mealName.innerHTML = "Meal Name : " + newData.strMeal;
                    console.log(mealName);
                    mealCategory.innerHTML = "Meal Category : " + newData.strCategory;
                    console.log(mealCategory);
                    mealArea.innerHTML = "Meal Area : " + newData.strArea;
                    ins.innerHTML = "INSTRUCTIONS : " + newData.strInstructions;
                    wvb.innerHTML = "Watch Video";
                    ci.innerHTML = " Cancel Item";
                    wv["href"] = newData.strYoutube;
                    wv["target"] = "_blank";
                    console.log(wv["href"]);
                    links.appendChild(wv);
                    links.appendChild(ci);

                    searchMeals.style.opacity = 0.7;


                    // On-click event on cancel button to close the tab with more details


                    ci.onclick = () => {
                        let detailsTabContainer = document.getElementById('details-tab-container');
                        detailsTabContainer.innerHTML = '';
                        searchMeals.style.opacity = 1;
                    }
                  });

               
                extras.appendChild(details);
                extras.appendChild(youtube);
                extras.appendChild(favIcon);
            });
        }

        // Handling the situation when no results are found based on the search text

        else{
            let noResult = document.createElement('p');
            noResult.innerHTML = "No relevant results found!";
            noResult.classList.add('noResult');
            cards.appendChild(noResult);
        }

    }

    // To remove the food cards when serch bar is empty


    else if (search == ''){
        let cards = document.querySelector('.cards');
        cards.innerHTML = '';
    }
}



// function to search for meals


async function searchMeals() {
    const searchInput = document.getElementById('search-bar').value;
    showMeals(searchInput);
  }



// function to implement the cancel button for search bar


async function cancelSearch(){
    let searchInput = document.getElementById('search-bar');
    searchInput.value = '';
    let cards = document.querySelector('.cards');
    cards.innerHTML = "";

    

  }


// Function to remove all the entries from the HTML list - This is used when we are updating the list by adding or removing elements

function removeAll(){
    let container = document.getElementById('favourites-body');
    let child = container.lastElementChild;
    while (child){
        container.removeChild(child);
        child = container.lastElementChild;
    }
  }


  // Function to show the favorite meals list


async function showFavMeals(){
    removeAll();
    let favoritesBody = document.getElementById('favourites-body');

    if(arr.length == 0){

        let message = document.createElement('p');
        favoritesBody.appendChild(message);
        message.innerHTML = " No meals added to favorites!";

    }


    // Creating dynamic cards for favorite meals section

    for (let i = 0 ; i < arr.length ; i++){
        let favItem = document.createElement('div');
        let favItemImage = document.createElement('div');
        let favImage = document.createElement('img');
        let favItemDetails = document.createElement('div');
        let favName = document.createElement('p');
        let remove = document.createElement('button');

        favoritesBody.appendChild(favItem);
        favItem.appendChild(favItemImage);
        favItem.appendChild(favItemDetails);
        favItemImage.appendChild(favImage);
        favItemDetails.appendChild(favName);
        favItemDetails.appendChild(remove);

        favItem.classList.add('fav-item');
        favItemImage.classList.add("fav-item-image");
        favItemDetails.classList.add("fav-item-details");
        remove.classList.add('remove-button');

        favImage['src'] = arr[i].strMealThumb;
        favName.innerHTML = "Name : " + arr[i].strMeal;
        remove.innerHTML = "Remove";



        // Event listener to remove single element from the local storage

        remove.addEventListener('click', function(){
            
            const index = arr.findIndex((meal) => meal.strMeal === arr[i].strMeal);
            console.log(index);
            arr.splice(index,1);
            localStorage.setItem('favouritesList', JSON.stringify(arr));
            removeAll();
            showFavMeals();
        })
    }
  }

showMeals();





