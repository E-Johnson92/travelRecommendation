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
        .then(response => response.json()) 
        .then(data => {
       
         const location = data.find(item => item.toLowerCase() === searchInp);

         if(location){
            resultDiv.innerHTML = `<img src="${data.imageURL}"></img><br>
                                    <h1>${data.name}</h1>
                                    <p>${data.description}</p>` 
         }
         else
         {
            resultDiv.innerHTML = "Could not find data"; 
         }
            
        }); 
       
}

searchBtn.addEventListener("click", searchLocation);
clearBtn.addEventListener("click", clearDiv);
