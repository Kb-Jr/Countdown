const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const today = new Date().toISOString().split('T')[0];

dateEl.setAttribute('min', today);


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

function updateCountdown(e){
    e.preventDefault();
    let countdownTitle = e.srcElement[0].value;
    let countdownDate = e.srcElement[1].value;

    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown value:', countdownValue)

}

countdownForm.addEventListener('submit', updateCountdown);