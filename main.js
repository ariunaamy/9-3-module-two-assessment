const baseURL = "https://resource-ghibli-api.onrender.com";
const selectTitles = document.getElementById("titles");
const displayInfo = document.getElementById("display-info");

const title = document.createElement("h3");
const releaseYear = document.createElement("p");
const description = document.createElement("p");
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch(`${baseURL}/films`)
	.then(response => response.json())
	.then(result => {
        createFilmOptions(result);
        movieDetails(result);
    })
	.catch(err => console.error(err));


 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);




// option elements should have a value of the movie id and the text should be the movie title.
// Movie div id=display-info
// h3(movie title)
// p (moves release year)
// p (description of the movie)




function createFilmOptions(result) {
    for (let i=0; i<result.length; i++){
    const option = document.createElement("option");
    selectTitles.append(option);

    option.innerHTML=result[i].title;
    option.setAttribute("value", result[i].id);
    }
}

function movieDetails(result){
 selectTitles.addEventListener("click",()=>{
   
   displayInfo.append(title);
   displayInfo.append(releaseYear);
   displayInfo.append(description);

   for (let i=0; i<result.length; i++){
    if (selectTitles.value === result[i].id){
        title.innerHTML = result[i].title;
        releaseYear.innerHTML = result[i].release_date;
        description.innerHTML = result[i].description;
    }
   }
  })
}
