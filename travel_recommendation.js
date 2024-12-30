const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("reset-btn");

function clearDiv() {
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "";
}

function searchLocation() {
    const searchInp = document.getElementById("search").value.toLowerCase().trim();
    const resultDiv = document.getElementById("results");

    fetch("./travel_recommendation_api.json")
        .then(response => {
            if(!response.ok){
                throw new Error("Status Error: " + response.statusText); 
            }
            return response.json()
        })
        .then(data => {
            const location = data.find(item => item.name.toLowerCase() === searchInp);

            if (location) {
                resultDiv.innerHTML = `<img src="${location.imageURL}" alt="${location.name}"><br>
                                        <h1>${location.name}</h1>
                                        <p>${location.description}</p>`;
            } else {
                resultDiv.innerHTML = "Could not find data";
            }
        })
        .catch(error => {
            resultDiv.innerHTML = "An error occurred while fetching data";
            console.error('Error fetching data:', error);
        });
}

searchBtn.addEventListener("click", searchLocation);
clearBtn.addEventListener("click", clearDiv);
