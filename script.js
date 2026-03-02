localStorage.setItem("pin", "1234");

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
    let button1 = document.querySelector("#button1");
    let button2 = document.querySelector("#button2");
    let button3 = document.querySelector("#button3");
    let button4= document.querySelector("#button4");
    let button5 = document.querySelector("#button5");
    let button6 = document.querySelector("#button6");
    let button7 = document.querySelector("#button7");
    let button8 = document.querySelector("#button8");
    let button9 = document.querySelector("#button9");
    let buttonNo = document.querySelector("#buttonNo");
    let button0 = document.querySelector("#button0");
    let buttonYes = document.querySelector("#buttonYes");

    let pinDisplay = document.querySelector("#pinEntryTextDisplay");
    let typedPin = "";

    button1.addEventListener("click", (e) => {
        if(pinDisplay.textContent.length == 4){
            checkPin(typedPin);
        }
        else {
            typedPin += "1";
            pinDisplay.textContent += "*";
        }
    });
    button2.addEventListener("click", (e) => {
        if(pinDisplay.textContent.length == 4){
            checkPin(typedPin);
        }
        else {
            typedPin += "2";
            pinDisplay.textContent += "*";
        }
    });
    button3.addEventListener("click", (e) => {
        if(pinDisplay.textContent.length == 4){
            checkPin(typedPin);
        }
        else {
            typedPin += "3";
            pinDisplay.textContent += "*";
        }
    });
    button4.addEventListener("click", (e) => {
        if(pinDisplay.textContent.length == 4){
            checkPin(typedPin);
        }
        else {
            typedPin += "4";
            pinDisplay.textContent += "*";
        }
    });
    button5.addEventListener("click", (e) => {
        if(pinDisplay.textContent.length == 4){
            checkPin(typedPin);
        }
        else {
            typedPin += "5";
            pinDisplay.textContent += "*";
        }
    });
    button6.addEventListener("click", (e) => {
        if(pinDisplay.textContent.length == 4){
            checkPin(typedPin);
        }
        else {
            typedPin += "6";
            pinDisplay.textContent += "*";
        }
    });
    button7.addEventListener("click", (e) => {
        if(pinDisplay.textContent.length == 4){
            checkPin(typedPin);
        }
        else {
            typedPin += "7";
            pinDisplay.textContent += "*";
        }
    });
    button8.addEventListener("click", (e) => {
        if(pinDisplay.textContent.length == 4){
            checkPin(typedPin);
        }
        else {
            typedPin += "8";
            pinDisplay.textContent += "*";
        }
    });
    button9.addEventListener("click", (e) => {
        if(pinDisplay.textContent.length == 4){
            checkPin(typedPin);
        }
        else {
            typedPin += "9";
            pinDisplay.textContent += "*";
        }    
    });
    button0.addEventListener("click", (e) => {
        if(pinDisplay.textContent.length < 4){
            typedPin += "0";
            pinDisplay.textContent += "*";
        }
    });

    buttonNo.addEventListener("click", (e) => {
        typedPin = "";
        pinDisplay.textContent = "";
    });  

    buttonYes.addEventListener("click", (e) => {
        checkPin(typedPin);
    })  
}

let attempts = 0;
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
            //lock out1
        }
    }
}