const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownElButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const today = new Date().toISOString().split('T')[0];

dateEl.setAttribute('min', today);


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


function updateDOM(){
    const now = new Date().getTime();
    const distance = countdownValue - now;
    
    const days = Math.floor(distance/day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
    
    inputContainer.hidden = true;
    countdownEl.hidden = false;
}


function updateCountdown(e){
    e.preventDefault();
    let countdownTitle = e.srcElement[0].value;
    let countdownDate = e.srcElement[1].value;

    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown value:', countdownValue)

    updateDOM();

}

countdownForm.addEventListener('submit', updateCountdown);