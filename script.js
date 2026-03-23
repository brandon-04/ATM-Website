let attempts = 0;
let locationDisplay = document.querySelector("#location");
let pinDisplay = document.querySelector("#pinEntryTextDisplay");
let balanceDisplay = document.querySelector("#balanceDisplayText");
let customAmountDisplay = document.querySelector("#customAmountDisplay");

let typedPin = "";

let buttonNoPinEntryHomeScreen = document.querySelector("#buttonNoPinEntryHomeScreen");
let buttonNoBalance = document.querySelector("#buttonNoBalance");
let buttonNoWithdraw = document.querySelector("#buttonNoWithdraw");
let buttonNoCustomWithdraw = document.querySelector("#buttonNoCustomWithdraw");
let buttonNoPinChange = document.querySelector("#buttonNoPinChange");



let buttonYesPinEntry = document.querySelector("#buttonYesPinEntry");
let buttonYesCustomWithdraw = document.querySelector("#buttonYesCustomWithdraw");
let buttonYesPinChange = document.querySelector("#buttonYesPinChange");
let buttonYesBlank = document.querySelector("#buttonYesBlank");

initSetup();
addEventListeners();

function addEventListeners() {
    buttonNoPinEntryHomeScreen.addEventListener("click", () => {
        reset();
    });
    buttonNoBalance.addEventListener("click", () => {
        toggleBalanceScreen();
        toggleHomeScreen();
    });
    buttonNoWithdraw.addEventListener("click", () => {
        toggleWithdrawScreen();
        toggleHomeScreen();
    });
    buttonNoCustomWithdraw.addEventListener("click", () => {
        //toggleCustomWithdrawScreen();
        toggleWithdrawScreen();
    });
    buttonNoPinChange.addEventListener("click", () => {
        togglePinChangeScreen();
        toggleHomeScreen();
    })
}

function initSetup() {
    if (localStorage.getItem("pin") == null) {
        localStorage.setItem("pin", "1234")
        localStorage.setItem("balance", "1000")
    }
    setTime();
    setInterval(setTime, 1000);
    pinEntry();
}

function reset() {
    location.reload();
}

function setTime() {
    let timeDisplay = document.querySelector("#time");
    let dateDisplay = document.querySelector("#date");

    let dateAndTime = new Date;

    let hours = formatDate(dateAndTime.getHours());
    let minutes = formatDate(dateAndTime.getMinutes());
    let seconds = formatDate(dateAndTime.getSeconds());

    let fullTime = `${hours}:${minutes}:${seconds}`

    let day = formatDate(dateAndTime.getDate());
    let month = formatDate(dateAndTime.getMonth() + 1);
    let year = dateAndTime.getFullYear();

    let fullDate = `${day}/${month}/${year}`

    timeDisplay.innerHTML = fullTime;
    dateDisplay.innerHTML = fullDate;
}

function formatDate(number) {
    return number < 10 ? `0${number}` : number;
}

function pinEntry() {
    locationDisplay.textContent = "Pin Entry";
    
    for (let i = 0; i < 10; i++) {
        let button = document.querySelector(`#button${i}`);

        button.addEventListener("click", () => {
            if (typedPin.length != 4) {
                typedPin += i;
                pinDisplay.textContent += "*";
            }
        });
    }
    buttonYesPinEntry.addEventListener("click", () =>{
        checkPin(typedPin);
    });
}

function checkPin(pin) {
    if (pin == localStorage.getItem("pin")) {
        pinEntryActive = false;

        togglePinEntry();
        toggleHomeScreen();

        buttonYesPinEntry.classList.toggle("hidden");
        buttonYesBlank.classList.toggle("hidden");
    }
    else {
        attempts += 1;
        alert(`Incorrect PIN. ${3 - attempts} left.`);

        if (attempts == 3) {
            pinEntryActive == false;
            togglePinEntry();
            toggleLockOutScreen();
        }
    }
}

function homeScreen() {
    let balanceButton = document.querySelector("#balanceButton");
    let withdrawButton = document.querySelector("#withdrawButton"); 
    let pinChangeButton = document.querySelector("#pinChangeButton"); 

    balanceButton.addEventListener("click", () => {
        toggleHomeScreen();
        toggleBalanceScreen();
    });
    withdrawButton.addEventListener("click", () => {
        toggleHomeScreen();
        toggleWithdrawScreen();
    });
    pinChangeButton.addEventListener("click", () => {
        toggleHomeScreen();
        togglePinChangeScreen();
    });    

}

function balance() {
    locationDisplay.textContent = "Balance";
    balanceDisplay.textContent = `£${localStorage.getItem("balance")}.31`

}

function withdraw() {
    locationDisplay.textContent = "Withdraw";
    let curBalance = parseInt(localStorage.getItem("balance"));

    document.querySelector("#withdrawTen").addEventListener("click", () => {
        if(curBalance - 10 < 0) {
            insufficientFunds();
        }
        else {
          localStorage.setItem("balance",`${curBalance - 10}`);
            postWithdraw(10);  
        }
    });

    document.querySelector("#withdrawTwenty").addEventListener("click", () => {
        if(curBalance - 20 < 0) {
            insufficientFunds();
        }
        else {
          localStorage.setItem("balance",`${curBalance - 20}`);
            postWithdraw(20);  
        }
    });

    document.querySelector("#withdrawFifty").addEventListener("click", () => {
        if(curBalance - 50 < 0) {
            insufficientFunds();
        }
        else {
          localStorage.setItem("balance",`${curBalance - 50}`);
            postWithdraw(50);  
        }
    });

    document.querySelector("#withdrawHundred").addEventListener("click", () => {
        if(curBalance - 100 < 0) {
            insufficientFunds();
        }
        else {
          localStorage.setItem("balance",`${curBalance - 100}`);
            postWithdraw(100);  
        }
    });



    function postWithdraw(amount) {
        alert(`You successfully withdrew £${amount}. Have a nice day!`)
        reset();
    }
    function insufficientFunds() {
        alert("You have insufficient funds :(");
        reset();
    }

    

}

function pinChange() {
    
}

function toggleBalanceScreen() {
    let objects = document.getElementsByClassName("balance");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }

    toggleNoButtons(buttonNoBalance);
    balance();
}
function toggleWithdrawScreen() {
    let objects = document.getElementsByClassName("withdraw");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }

    toggleNoButtons(buttonNoWithdraw);
    withdraw();

}

function togglePinChangeScreen() {
    let objects = document.getElementsByClassName("pinChange");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }
    
    toggleNoButtons(buttonNoPinChange);
    pinChange();
}
function toggleLockOutScreen() {
    let objects = document.getElementsByClassName("lockout");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }

    
}
function togglePinEntry() {
    let objects = document.getElementsByClassName("pinEntry");
    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }
    pinEntry();

}
function toggleHomeScreen() {
    locationDisplay.textContent = "Home";
    let objects = document.getElementsByClassName("home");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }
    
    toggleNoButtons(buttonNoPinEntryHomeScreen);
    homeScreen();
}

function toggleNoButtons(exception) {
    let noButtons = [buttonNoPinEntryHomeScreen, buttonNoWithdraw, 
        buttonNoCustomWithdraw, buttonNoPinChange, buttonNoBalance]

    noButtons.forEach(element => {
        if(element != exception && element.classList != "hidden") {
            element.classList.add("hidden");
        }
        else if(element == exception) {
            element.classList.remove("hidden");
        }
    });
}

//remaining issues
//1 - fixing back and yes buttons
//2 - finish custom withdrawal
//3 - 