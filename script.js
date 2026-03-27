let attempts = 0;
let locationDisplay = document.querySelector("#location");
let pinDisplay = document.querySelector("#pinEntryTextDisplay");
let balanceDisplay = document.querySelector("#balanceDisplayText");
let customAmountDisplay = document.querySelector("#customAmountDisplay");

let timesVisitedPE = 0;
let timesVisitedCW = 0;
let timesVisitedPC = 0;

let typedAmount = "";

let typedPin = "";

let newPin = "";
let confirmNewPin = "";

let newPinEntryDisplay = document.querySelector("#newPinEntryDisplay");
let confirmNewPinEntryDisplay = document.querySelector("#confirmNewPinEntryDisplay");

let buttonNoPinEntry = document.querySelector("#buttonNoPinEntry");
let buttonNoHomeScreen = document.querySelector("#buttonNoHomeScreen");
let buttonNoBalance = document.querySelector("#buttonNoBalance");
let buttonNoWithdraw = document.querySelector("#buttonNoWithdraw");
let buttonNoCustomWithdraw = document.querySelector("#buttonNoCustomWithdraw");
let buttonNoPinChange = document.querySelector("#buttonNoPinChange");

let buttonYesPinEntry = document.querySelector("#buttonYesPinEntry");
let buttonYesCustomWithdraw = document.querySelector("#buttonYesWithdraw");
let buttonYesPinChange = document.querySelector("#buttonYesPinChange");
let buttonYesBlank = document.querySelector("#buttonYesBlank");

initSetup();
addEventListeners();

function addEventListeners() {
    buttonNoPinEntry.addEventListener("click", () => {
        clearPinEntry();
    });
    buttonNoHomeScreen.addEventListener("click", () => {
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
        toggleCustomWithdrawScreen();
        toggleWithdrawScreen();
        
        resetTypedAmount();
    });
    buttonNoPinChange.addEventListener("click", () => {
        togglePinChangeScreen();
        toggleHomeScreen();
    });



    buttonYesPinEntry.addEventListener("click", () => {
        checkPin(typedPin);
    });

    buttonYesCustomWithdraw.addEventListener("click", () => {
        checkCustomAmount(parseInt(typedAmount));
    })

    buttonYesPinChange.addEventListener("click", () => {
        checkNewPin(newPin,confirmNewPin)
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

    if(timesVisitedPE == 0) {
        for (let i = 0; i < 10; i++) {
            
            let button = document.querySelector(`#button${i}`);

            button.addEventListener("click", () => {
                if (typedPin.length != 4) {
                    typedPin += i;
                    pinDisplay.textContent += "*";
                } 
            });
        }
    }
    timesVisitedPE++;
}

function clearPinEntry() {
    typedPin = "";
    pinDisplay.textContent = "";
}

function checkPin(pin) {
    if (pin == localStorage.getItem("pin")) {
        togglePinEntry();
        toggleHomeScreen();
    }
    else {
        attempts += 1;
        alert(`Incorrect PIN. ${3 - attempts} attempts left.`);
        clearPinEntry();
        if (attempts == 3) {
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

    document.querySelector("#withdrawCustom").addEventListener("click", () => {
        toggleWithdrawScreen();
        toggleCustomWithdrawScreen();
    })
}

function postWithdraw(amount) {
    alert(`You successfully withdrew £${amount}. Have a nice day!`)
    reset();
}

function insufficientFunds() {
    alert("You have insufficient funds, cancelling transaction");
    reset();
}

function notMultipleOfFive() {
    alert("You can only withdraw in multiples of 5, cancelling transaction");
    reset();
}

function customWithdraw() {
    locationDisplay.textContent = "Custom Withdrawal  ";
    
    if(timesVisitedCW == 0) {
        for (let i = 0; i < 10; i++) {
        let button = document.querySelector(`#button${i}`);

        button.addEventListener("click", () => {
            if (typedAmount.length < 3) {
                typedAmount += i;
                customAmountDisplay.textContent = `£${typedAmount}`;
            }
        });
        }    
    }
    timesVisitedCW++;
}

function resetTypedAmount() {
    typedAmount = "";
    customAmountDisplay.textContent = `£${typedAmount}`;
}

function checkCustomAmount(amount) {
    let curBalance = parseInt(localStorage.getItem("balance"));

    if(amount % 5 == 0 && curBalance >= amount && amount != 0) {
        localStorage.setItem("balance", `${curBalance - amount}`)
        postWithdraw(amount);
    }
    else if (amount % 5 != 0 || amount == 0){
        notMultipleOfFive();
        resetTypedAmount();
    }
    else if (curBalance < amount) {
        insufficientFunds();
        resetTypedAmount();
    }
}

function pinChange() {
    locationDisplay.textContent = "Change Pin"

    if(timesVisitedPC == 0) {
        for (let i = 0; i < 10; i++) {
            let button = document.querySelector(`#button${i}`);

            button.addEventListener("click", () => {
                if (newPin.length != 4) {
                    newPin += i;
                    newPinEntryDisplay.textContent += "*";
                }
                else if(confirmNewPin.length != 4) {
                    confirmNewPin += i;
                    confirmNewPinEntryDisplay.textContent += "*"
                }
            });
        }
    }
    timesVisitedPC++;
}

function checkNewPin(newPin, confirmNewPin) {
    let oldPin = localStorage.getItem("pin");

    if(newPin != confirmNewPin) {
        pinsDoNotMatch();
    }

    else if(newPin == oldPin){
        sameAsOldPin();
    }

    else if(newPin == "" || confirmNewPin == "") {
        pinsNull();
    }

    else {
        localStorage.setItem("pin", `${confirmNewPin}`);
        pinsMatch();
    }
}

function sameAsOldPin() {
    alert("Pin is the same as old pin, aborting process");
    reset();
}

function pinsDoNotMatch() {
    alert("Pins do not match, aborting process");
    reset();
}

function pinsMatch() {
    alert("Pin change successful, Enjoy your day!");
    reset();
}

function pinsNull() {
    alert("Please enter two full pins, aborting process.");
    reset();
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

function toggleCustomWithdrawScreen() {
    let objects = document.getElementsByClassName("customWithdraw");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }

    toggleNoButtons(buttonNoCustomWithdraw);
    toggleYesButtons(buttonYesCustomWithdraw);

    customWithdraw();
}

function togglePinChangeScreen() {
    let objects = document.getElementsByClassName("pinChange");



    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }
    
    toggleNoButtons(buttonNoPinChange);
    toggleYesButtons(buttonYesPinChange);
    pinChange();
}

function toggleLockOutScreen() {
    let objects = document.getElementsByClassName("lockout");

    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.toggle("hidden");
    }

    toggleYesButtons(buttonYesBlank);
    
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
    
    toggleNoButtons(buttonNoHomeScreen);
    toggleYesButtons(buttonYesBlank);
    homeScreen();
}

function toggleNoButtons(exception) {
    let noButtons = [buttonNoPinEntry, buttonNoHomeScreen, buttonNoWithdraw, 
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

function toggleYesButtons(exception) {
    let yesButtons = [buttonYesBlank, buttonYesCustomWithdraw,
        buttonYesPinChange, buttonYesPinEntry]

    yesButtons.forEach(element => {
        if(element != exception && element.classList != "hidden") {
            element.classList.add("hidden");
        }
        else if(element == exception) {
            element.classList.remove("hidden");
        }
    });
}
