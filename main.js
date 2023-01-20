// all veriables used 
const baseURL = "https://resource-ghibli-api.onrender.com";
const selectTitles = document.getElementById("titles");
const displayInfo = document.getElementById("display-info");

const title = document.createElement("h3");
const releaseYear = document.createElement("p");
const description = document.createElement("p");

const form = document.querySelector("form");
const ul = document.querySelector("ul");
const resetButton = document.getElementById("reset-reviews")

const ol = document.querySelector("ol");
const showPeopleButton = document.getElementById("show-people");
let count = 0;

//API call for films 
function run() {
    fetch(`${baseURL}/films`)
        .then(response => response.json())
        .then(result => {
        createFilmOptions(result);
        movieDetails(result);
            addReview();
    })
        .catch(err => console.error(err));
}


showPeopleButton.addEventListener("click", (event) => {
    count++;
    event.preventDefault();
    //API call for people
    fetch(`${baseURL}/people`)
        .then(response => response.json())
        .then(data => {
        showPeople(data, count);
    })
        .catch(err => console.error(err));
})

setTimeout(run, 1000);

function createFilmOptions(result) {

    for (let i=0; i<result.length; i++){
    const option = document.createElement("option");
    selectTitles.append(option);

        option.textContent = result[i].title;
        option.setAttribute("value", result[i].id);
    }
}

function movieDetails(result) {
    selectTitles.addEventListener("change", (event) => {
        ol.innerHTML = "";
        document.getElementById("show-people").disabled = false;

        event.preventDefault();

        displayInfo.append(title);
        displayInfo.append(releaseYear);
        displayInfo.append(description);


        for (let i = 0; i < result.length; i++) {
            if (selectTitles.value === result[i].id) {
                title.innerHTML = result[i].title;
                releaseYear.innerHTML = result[i].release_date;
             description.innerHTML = result[i].description;
            }
        }
    })
}

function addReview() {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (selectTitles.selectedIndex === 0) {
            alert("Please select a movie first")
        }
        else {
            const li = document.createElement("li");
            ul.append(li);

            let title = "<strong><b>" + selectTitles[selectTitles.selectedIndex].innerHTML + "</b></strong>";
            li.innerHTML = title + ": " + document.getElementById("review").value;
            form.reset();

            resetButton.addEventListener("click", () => {
                li.remove();
            })
        }
    })
}

function showPeople(data) {
    ol.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let filmID = data[i].films[0].slice(7);
        if (selectTitles.value === filmID) {
            const li = document.createElement("li");
            ol.append(li);
            li.innerHTML = data[i].name;
        }
    }
}


