localStorage.setItem("pin", "1234");
let attempts = 0;

setTime();
setInterval(setTime, 1000);
function setTime(){
    let timeDisplay = document.querySelector("#time");
    let dateDisplay = document.querySelector("#date");

    let dateAndTime = new Date;

    let hours = formatDate(dateAndTime.getHours());
    let minutes = formatDate(dateAndTime.getMinutes());
    let seconds = formatDate(dateAndTime.getSeconds());

    let fullTime = `${hours}:${minutes}:${seconds}`

    let day = formatDate(dateAndTime.getDay());
    let month = formatDate(dateAndTime.getMonth() + 1);
    let year = dateAndTime.getFullYear();

    let fullDate = `${day}/${month}/${year}`

    timeDisplay.innerHTML = fullTime;
    dateDisplay.innerHTML = fullDate;
}    

function formatDate(number) {
    return number < 10 ? `0${number}` : number;
}

pinEntry();

function pinEntry() {
    let buttonNo = document.querySelector("#buttonNo");
    let buttonYes = document.querySelector("#buttonYes");

    let pinDisplay = document.querySelector("#pinEntryTextDisplay");
    let typedPin = "";
    
    for(let i = 0; i < 10; i++) {
        let button = document.querySelector(`#button${i}`);

        button.addEventListener("click", () => {
            if(typedPin.length !=4){
                typedPin += i;
                pinDisplay.textContent += "*";
            }
        });
    }

    buttonNo.addEventListener("click", () => {
        typedPin = "";
        pinDisplay.textContent = "";
    });  

    buttonYes.addEventListener("click", () => {
        checkPin(typedPin);
    })  
}


function checkPin(num) {
    
    if(num == localStorage.getItem("pin")){
        alert("correct pin!");
        //move onto next page
    }
    else {
        attempts += 1;
        alert(`Incorrect PIN. ${3-attempts} left.`);

        typedPin = "";
        pinDisplay.textContent = "";
        
        if(attempts == 3) {
            alert("No more tries.")
            
        }
    }
}