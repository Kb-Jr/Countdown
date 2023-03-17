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

    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        inputContainer.hidden = true;

        if (distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }

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
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    savedCountdown = {
        title:countdownTitle,
        date:countdownDate,
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown)); 

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

    localStorage.removeItem('countdown');
};

function restorePreviousCountdown(){
    if (localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownDate = savedCountdown.date;
        countdownTitle = savedCountdown.title;
        countdownValue = new Date(countdownDate).getTime();

        updateDOM();
    }
}


countdownForm.addEventListener('submit', updateCountdown);
countdownElButton.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

restorePreviousCountdown();