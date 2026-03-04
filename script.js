localStorage.setItem("pin", "1234");
localStorage.setItem("balance", "1000");
let attempts = 0;
let locationDisplay = document.querySelector("#location");
let buttonNo = document.querySelector("#buttonNo");
let buttonYes = document.querySelector("#buttonYes");

setTime();
setInterval(setTime, 1000);


function setTime() {
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
    locationDisplay.textContent = "Pin Entry";

    let pinDisplay = document.querySelector("#pinEntryTextDisplay");
    let typedPin = "";

    clearPinEntry();

    for (let i = 0; i < 10; i++) {
        let button = document.querySelector(`#button${i}`);

        button.addEventListener("click", () => {
            if (typedPin.length != 4) {
                typedPin += i;
                pinDisplay.textContent += "*";
            }
        });
    }

    buttonNo.addEventListener("click", clearPinEntry);
    buttonYes.addEventListener("click", () => {
        checkPin(typedPin);
    })

    //pin entry exclusive functions
    function clearPinEntry() {
        typedPin = "";
        pinDisplay.textContent = "";
    }

    function checkPin(num) {
        if (num == localStorage.getItem("pin")) {
            togglePinEntry();
            toggleHomeScreen();
            buttonNo.removeEventListener("click", clearPinEntry);
        }
        else {
            attempts += 1;
            alert(`Incorrect PIN. ${3 - attempts} left.`);

            if (attempts == 3) {
                togglePinEntry();
                toggleLockOutScreen();
            }
        }
    }
}
function homeScreen() {
    let buttonBalance = document.querySelector("#balanceButton");
    let buttonWithdraw = document.querySelector("#withdrawButton"); 
    let buttonPinChange = document.querySelector("#pinChangeButton"); 

    buttonNo.addEventListener("click", () => {
        toggleHomeScreen();
        togglePinEntry();
    });

    balanceButton.addEventListener("click", () => {
        toggleHomeScreen();
        //balance page
    });
    withdrawButton.addEventListener("click", () => {
        toggleHomeScreen();
        //withdraw page
    });
    pinChangeButton.addEventListener("click", () => {
        toggleHomeScreen();
        //pin change screen
    });

    
}

function toggleBalanceScreen() {

}

function toggleLockOutScreen() {
    let objects = document.getElementsByClassName("lockout");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }
}
function togglePinEntry() {
    let objects = document.getElementsByClassName("pinEntry");

    pinEntry();
    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }
}
function toggleHomeScreen() {
    locationDisplay.textContent = "Home";

    let objects = document.getElementsByClassName("home");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }

    homeScreen();
}








//remaining screens and issues
//1 - lock out screen for when there is too many tries
//2 - need a home page, withdrawal, balance and change pin
//3 - hiding screens