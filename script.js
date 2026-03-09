let attempts = 0;
let locationDisplay = document.querySelector("#location");
let pinDisplay = document.querySelector("#pinEntryTextDisplay");
let balanceDisplay = document.querySelector("#balanceDisplayText");
let customAmountDisplay = document.querySelector("#customAmountDisplay");

let buttonNo = document.querySelector("#buttonNo");
let buttonYes = document.querySelector("#buttonYes");

initSetup();

setTime();
setInterval(setTime, 1000);

pinEntry();

function initSetup() {
    if (localStorage.getItem("pin") == null) {
        localStorage.setItem("pin", "1234")
        localStorage.setItem("balance", "1000")
    }
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
    buttonYes.addEventListener("click", checkPin);

   


    //pin entry exclusive functions
    function clearPinEntry() {
        typedPin = "";
        pinDisplay.textContent = typedPin;
    }

    function checkPin() {
        if (typedPin == localStorage.getItem("pin")) {

            removeListeners();

            togglePinEntry();
            toggleHomeScreen();
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
    function removeListeners() {
        buttonYes.removeEventListener("click", checkPin);
        buttonNo.removeEventListener("click", clearPinEntry);
    }

}
function homeScreen() {
    let balanceButton = document.querySelector("#balanceButton");
    let withdrawButton = document.querySelector("#withdrawButton"); 
    let pinChangeButton = document.querySelector("#pinChangeButton"); 

    buttonNo.addEventListener("click", reset);
    buttonYes.addEventListener("click", reset);

    balanceButton.addEventListener("click", () => {
        toggleHomeScreen();
        toggleBalanceScreen();

        buttonNo.removeEventListener("click", reset);
    });
    withdrawButton.addEventListener("click", () => {
        toggleHomeScreen();
        toggleWithdrawScreen()

        buttonNo.removeEventListener("click", reset);
    });
    pinChangeButton.addEventListener("click", () => {
        toggleHomeScreen();
        togglePinChangeScreen();

        buttonNo.removeEventListener("click", reset);
    });    
}

function balance() {
    locationDisplay.textContent = "Balance";
    balanceDisplay.textContent = `£${localStorage.getItem("balance")}.31`

    buttonNo.addEventListener("click", goBack);

    function goBack(){
        toggleBalanceScreen();
        toggleHomeScreen();
    }
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

    document.querySelector("#withdrawCustom").addEventListener("click", () => {
        buttonNo.removeEventListener("click", goBack);

        toggleWithdrawScreen();
        toggleCustomWithdrawScreen();
    });

    function postWithdraw(amount) {
        alert(`You successfully withdrew £${amount}. Have a nice day!`)
        reset();
    }
    function insufficientFunds() {
        alert("You have insufficient funds :(");
        reset();
    }

    

    buttonNo.addEventListener("click", goBack);

    function goBack() {
        toggleWithdrawScreen();
        toggleHomeScreen();
        buttonNo.removeEventListener("click", goBack);
    }
}
function customWithdraw() {

    let typedAmount = "";
    
    for (let i = 0; i < 10; i++) {
        let button = document.querySelector(`#button${i}`);

        button.addEventListener("click", () => {
            typedAmount += i;
            customAmountDisplay.textContent = typedAmount;
        });
    }

    buttonYes.addEventListener("click", () => {
        checkAmount(parseInt(typedAmount));
    });

    buttonNo.addEventListener("click", goBack);

    function goBack() {
        toggleCustomWithdrawScreen();
        toggleWithdrawScreen();
        buttonNo.removeEventListener("click", goBack);
    }

    function checkAmount(amount) {
        let curBalance = parseInt(localStorage.getItem("balance"))
        if(amount % 5 == 0 && curBalance - amount < 0) {
            localStorage.setItem("balance", `${curBalance - amount}`)
            alert(`You successfully withdrew ${amount}. Have a nice day!`);
        } 
    }
}

function pinChange() {
    
}




function toggleBalanceScreen() {
    let objects = document.getElementsByClassName("balance");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }

    balance();
}
function toggleWithdrawScreen() {
    let objects = document.getElementsByClassName("withdraw");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }
    withdraw();
}
function toggleCustomWithdrawScreen() {
    let objects = document.getElementsByClassName("customWithdraw");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }
    customWithdraw(); 
}
function togglePinChangeScreen() {
    let objects = document.getElementsByClassName("pinChange");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }
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

    homeScreen();
}








//remaining screens and issues
//1 - lock out screen for when there is too many tries
//2 - need a home page, withdrawal, balance and change pin
//3 - hiding screens