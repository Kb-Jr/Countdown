//create constants
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownElButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

const today = new Date().toISOString().split('T')[0];


//Ensure older dates will be disabled
dateEl.setAttribute('min', today);


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive = '';
let savedCountdown ='';

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Function to manipulate DOM
function updateDOM(){
    // update DOM every second 
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        // subtract the current time from the countdown date set to get the time left to complete the countdown
        const distance = countdownValue - now;
        
        // get the values for days, hours, minutes and seconds from the distance
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        inputContainer.hidden = true;

        // display when the countdown is completed
        if (distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }

        // display when the countdown is active
        else {
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }

    }, second);
};

function updateCountdown(e){
    // Prevent automatic reload
    e.preventDefault();

    // set countdown date and title to the submitted values
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    //create a countdown object to save
    savedCountdown = {
        title:countdownTitle,
        date:countdownDate,
    }

    // save object to local storage as a string
    localStorage.setItem('countdown', JSON.stringify(savedCountdown)); 

    // notify user to input a date if empty
    if (countdownDate === '') {
        alert('Kindly enter a date');
    }

    else {
        countdownValue = new Date(countdownDate).getTime();    
        updateDOM();
    }

};

// function to reset countdown
function reset(){
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    completeEl.hidden = true;

    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';

    //remove countdown object
    localStorage.removeItem('countdown');
};


function restorePreviousCountdown(){
    // check if there is a countdown saved in local storage
    if (localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        // get countdown item from local storage and save as an object
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownDate = savedCountdown.date;
        countdownTitle = savedCountdown.title;
        countdownValue = new Date(countdownDate).getTime();

        updateDOM();
    }
}


// Add event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownElButton.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

restorePreviousCountdown();