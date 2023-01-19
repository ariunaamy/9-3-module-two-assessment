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

function run() {
    fetch(`${baseURL}/films`)
	.then(response => response.json())
	.then(result => {
        const people = 
        createFilmOptions(result);
        movieDetails(result);
        addReview(result);
    })
        .catch(err => console.error(err));

        fetch(`${baseURL}/people`)
        .then(response => response.json())
        .then(data => {
            showPeople(data);
        })
        .catch(err => console.error(err));
}



setTimeout(run, 1000);

function createFilmOptions(result) {

    for (let i=0; i<result.length; i++){
    const option = document.createElement("option");
    selectTitles.append(option);

    option.innerHTML=result[i].title;
    option.setAttribute("value", result[i].id);

    }
}

function movieDetails(result){
    let count = 0;
    selectTitles.addEventListener("change", (event) => {
        count++;
        displayInfo.append(title);
        displayInfo.append(releaseYear);
        displayInfo.append(description);


        for (let i = 0; i < result.length; i++) {
            if (selectTitles.value === result[i].id) {
                title.innerHTML = result[i].title;
                releaseYear.innerHTML = result[i].release_date;
         // releaseYear.setAttribute("value", result[i].release_date);
             description.innerHTML = result[i].description;
            }
        }

        if (count > 1) {
            ol.innerHTML = "";
            document.getElementById("show-people").disabled = false;
    }
    })

}

function addReview(result) {
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
    let count = 0;
    document.getElementById("show-people").addEventListener("click", () => {
        count++
        if (count > 1) {
             document.getElementById("show-people").disabled = true;
        }
        else {
            for (let i = 0; i < data.length; i++) {
                let filmID = data[i].films[0].slice(7);
                if (selectTitles.value === filmID) {
                    const li = document.createElement("li");
                    ol.append(li);
                    li.innerHTML = data[i].name;
                }
            }

        }
    })
}


// if (ol.length>0){
//    
//     }  





