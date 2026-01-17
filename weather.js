document.getElementById("b1").addEventListener("click", search);

function search(event){
    event.preventDefault()
    var searches = document.getElementById("i1").value;
    console.log(searches);
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+searches+'&units=metric&appid=402240545e98e9fa4449782a0c9d1a88')
        .then(response => response.json())
        .then(data => {
      weatherCardUpdate(data)
  })
    
}

function weatherCardUpdate(data){
    let city = data.name;
    let temp = data.main.temp;
    let condition = data.weather[0].description;
    let humid = data.main.humidity;
    let wind = data.wind.speed * 2.237;

    document.getElementById("city-name").textContent = city;
    document.getElementById("temperature").textContent = "Temperature: " + temp.toFixed(1) + "°C";
    document.getElementById("condition").textContent = "Condition: " + condition;
    document.getElementById("humidity").textContent = "Humidity: " + humid + "%";
    document.getElementById("wind").textContent = "Wind: " + wind.toFixed(1) + "mph";

    let icon;
    if (condition.toLowerCase().includes("cloud")) {
        icon = "Icons/cloud.png";
    } 
    else if(condition.toLowerCase().includes("rain")) {
        icon = "Icons/rain.png";
    } 
    else if (condition.toLowerCase().includes("clear") || condition.toLowerCase().includes("sun")) {
        icon = "Icons/sunny.png";
    } 
    else if(condition.toLowerCase().includes("fog")){
        icon = "Icons/fog.png";
    } 
    else if (condition.toLowerCase().includes("snow")) {
        icon = "Icons/snow.png";
    }
    else if (condition.toLowerCase().includes("thunder")) {
        icon = "Icons/Thunder.png";
    }

    const iconEl = document.getElementById("icons");  
    iconEl.src = icon;                                
    iconEl.style.display = "block";                
}


const inputBox = document.getElementById("i1")
function handling() {
    const typedValue = inputBox.value

    if (typedValue.length > 2) {
        fetch('http://api.openweathermap.org/geo/1.0/direct?q='+typedValue+'&limit=5&appid=402240545e98e9fa4449782a0c9d1a88')
            .then(response => response.json())
            .then(data => {
            
            const dataList = document.getElementById("city");
            dataList.innerHTML = ""; 
            
            for(let i = 0; i < data.length; i++) {

                const value = document.createElement("option");
                value.value = data[i].name + ", " + data[i].country;
                document.getElementById("city").appendChild(value);
            }
        })
    }
}



inputBox.addEventListener("keyup", handling);

