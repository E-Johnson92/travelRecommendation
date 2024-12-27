const searchBtn = document.getElementById("search-btn");
const searchInp = document.getElementsById("search").value; 
const clearBtn = document.getElementById("reset-btn");  

function searchLocation(searchInp) {
    let filtered = searchInp.toLowerCase().trim();  
    const resultDiv; 

    fetch("./travel_recommendation.json")
        .then(response => response.json)
        .then(data =>{
            const destination = data.destination.find(place => place.name.toLowerCase() === searchInp); 
            

        })
}