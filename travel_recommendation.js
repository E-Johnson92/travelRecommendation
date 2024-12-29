const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("reset-btn");

function clearDiv() {
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "";
}

function searchLocation() {
    const searchInp = document.getElementById("search").value.toLowerCase().trim();
    const resultDiv = document.getElementById("results");

    fetch("./travel_recommendation.json")
        .then(response => response.json()) 
        .then(data => {
            // Combine all locations in a single array for easier search
            const allLocations = [...data.countries.flatMap(country => country.cities), 
                                  ...data.temples, 
                                  ...data.beaches];

            // Filter locations that contain "beach" in the name or description
            const filteredLocations = allLocations.filter(location =>
                location.name.toLowerCase().includes("beach") || 
                location.description.toLowerCase().includes("beach")
            );

            if (filteredLocations.length > 0) {
                resultDiv.innerHTML = ""; // Clear previous results
                filteredLocations.forEach(location => {
                    resultDiv.innerHTML += `<div>
                        <img src="${location.imageUrl}" alt="Image of ${location.name}"/><br>
                        <h1>${location.name}</h1>
                        <p>${location.description}</p>
                    </div><br>`;
                });
            } else {
                resultDiv.innerHTML = "Could not be found.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = "An error occurred.";
        });
}

searchBtn.addEventListener("click", searchLocation);
clearBtn.addEventListener("click", clearDiv);
