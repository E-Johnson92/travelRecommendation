document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("resetBtn");

    if (!searchBtn || !clearBtn) {
        console.error('Search button or clear button not found in the DOM.');
        return;
    }

    function clearDiv() {
        const resultDiv = document.getElementById("results");
        resultDiv.innerHTML = "";
    }

    function searchLocation() {
        event.preventDefault(); 
        const searchInp = document.getElementById("search").value.toLowerCase().trim();
        console.log("Search input:", searchInp);  // Debugging log
        const resultDiv = document.getElementById("results");

        fetch("./travel_recommendation_api.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log("Data fetched:", data);

                // Combine all locations in a single array for easier search
                const allLocations = [
                    ...data.countries.flatMap(country => country.cities), 
                    ...data.temples, 
                    ...data.beaches
                ];
                console.log("All locations:", allLocations);

                // Filter locations that contain the search keyword in the name or description
                const filteredLocations = allLocations.filter(location =>
                    location.name.toLowerCase().includes(searchInp) || 
                    location.description.toLowerCase().includes(searchInp)
                );
                console.log("Filtered locations:", filteredLocations);

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
});
