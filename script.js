
const collection = document.getElementsByTagName('span');
const searchButton = document.getElementById('searchBtn');
var container = document.getElementById('container');


// event Listner
document.addEventListener('DOMContentLoaded', autoTimeZone);
searchButton.addEventListener('click',()=>{
        
            const input = document.getElementById('input').value.trim();
            if(input.length>5){
                console.log(input);
                searchLocation(input);
            }else{
                console.error("! Time zone could not be found !");
                let html =`Please enter valid address...`;
                container.classList.add('notFound');
                container.innerHTML = html;
            }   
});

// default location getting function
function autoTimeZone() {
    try {
        navigator.geolocation.getCurrentPosition((success) => {

            let { latitude, longitude } = success.coords
            // console.log(latitude, longitude);
            fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=6f3f2baa53e8470cb63133c5c52215a8`)
                .then(resp => resp.json())
                .then((result) => {
                    if (result) { 
                        displayDefaultResult(result.results[0]);
                    } else {
                        console.log("No location found");
                    }
                });
        })
    } catch (error) {
        console.log(error);
    }
    
}

// displaying deafault loaction details
function displayDefaultResult(data){
    console.log("data",data);
    let {name,offset_STD,offset_STD_seconds,offset_DST,offset_DST_seconds} = data.timezone;
        collection[0].innerText = name;
        collection[1].innerText = data.lat;
        collection[2].innerText = data.lon;
        collection[3].innerText = offset_STD;
        collection[4].innerText = offset_STD_seconds;
        collection[5].innerText = offset_DST;
        collection[6].innerText = offset_DST_seconds;
        collection[7].innerText = data.country;
        collection[8].innerText = data.postcode;
        collection[9].innerText = data.state_district;
}

async function searchLocation(input){
    console.log("Calling API");
    try {
        let response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${input}&format=json&apiKey=6f3f2baa53e8470cb63133c5c52215a8`);
        response = await response.json();
        // console.log(response.results[0]);
        displayInputResult(response.results[0]);
    } catch (error) {
        console.error("! Time zone could not be found !");
        let html =`!  Time zone could not be found  !`;
        container.classList.add('notFound');
        container.innerHTML = html;
    }
    

    
}

// displaying input Address loaction details
function displayInputResult(data){
    let html ='';
    let {name,offset_STD,offset_STD_seconds,offset_DST,offset_DST_seconds} = data.timezone;
    
        console.log("data",data);
        html= `
        <div class="userDetails">
        <p>Name Of Time Zone : ${name}</p>
        <div class="cordinates">
        <p>Lat : <span>${data.lat.toFixed(7)}</span></p>
        <p>Long : <span>${data.lon.toFixed(7)}</span></p>
        </div>
        <p>Offset STD : ${offset_STD}</p>
        <p>Offset STD Seconds : ${offset_STD_seconds}</p>
        <p>Offset DST : ${offset_DST}</p>
        <p>Offset DST Seconds : ${offset_DST_seconds}</p>
        <p>Country : ${data.country}</p>
        <p>Postcode : ${data.postcode}</p>
        <p>City : ${data.state_district}</p> 
        </div>
        `;
        container.classList.remove('notFound');
        container.innerHTML = html;
}