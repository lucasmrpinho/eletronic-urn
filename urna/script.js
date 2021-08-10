let yourVoteTo = document.querySelector('.d-1-1 span');
let position = document.querySelector('.d-1-2 span');
let description = document.querySelector('.d-1-4');
let notice = document.querySelector('.d-2');
let side = document.querySelector('.d-1-right');
let numbers = document.querySelector('.d-1-3');

let currentStep = 0
let number = ''
let whiteVote = false
let votes = []

function startStep() {
    let step = steps[currentStep]

    let numberHTML = ''
    number = ''
    whiteVote = false

    for (let i = 0; i < step.numbers; i++) {
        if (i === 0) {
            numberHTML += "<div class='number shine'></div>"
        } else {
            numberHTML += "<div class='number'></div>"
        }
    }

    yourVoteTo.style.display = 'none'
    position.innerHTML = step.title
    description.innerHTML = ''
    notice.style.display = 'none'
    side.innerHTML = ''
    numbers.innerHTML = numberHTML;
}

function updateDisplay() {
    let step = steps[currentStep]
    let candidate = step.candidates.filter((item) => {
        if (item.number === number) {
            return true;
        } else {
            return false;
        }
    })
    if (candidate.length > 0) {
        candidate = candidate[0]
        yourVoteTo.style.display = 'block'
        notice.style.display = 'block'
        description.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.politicalparty}`

        let picsHTML = ''
        for (let i in candidate.pics) {
            if (candidate.pics[i].small) {
                picsHTML += `<div class="d-1-image small"> <img src="./images/${candidate.pics[i].url}" alt="">${candidate.pics[i].subtitle}</div>`
            } else {
                picsHTML += `<div class="d-1-image"> <img src="./images/${candidate.pics[i].url}" alt="">${candidate.pics[i].subtitle}</div>`
            }
        }

        side.innerHTML = picsHTML
    } else {
        yourVoteTo.style.display = 'block'
        notice.style.display = 'block'
        description.innerHTML = `<div class="big--notice shine">VOTO NULO</div>`
    }
}

function clicked(n) {
    let elementNumber = document.querySelector('.number.shine')

    if (elementNumber !== null) {
        elementNumber.innerHTML = n
        number = `${number}${n}`

        elementNumber.classList.remove('shine')
        if (elementNumber.nextElementSibling !== null) {
            elementNumber.nextElementSibling.classList.add('shine')
        } else {
            updateDisplay()
        }
    }
}

function correction() {
    startStep()
}

function white() {
    number = '';
    whiteVote = true;

    yourVoteTo.style.display = 'block'
    notice.style.display = 'block'
    numbers.innerHTML = ''
    description.innerHTML = `<div class="big--notice shine">VOTO EM BRANCO</div>`
    side.innerHTML = ''
}

function confirm() {
    let step = steps[currentStep]

    let confirmedVote = false

    if(whiteVote === true) {
        confirmedVote = true;
        votes.push({
            step: steps[currentStep].title,
            vote: 'white'
        })
    } else if(number.length === step.numbers) {
        confirmedVote = true;
        votes.push({
            step: steps[currentStep].title,
            vote: number
        })
    }

    if(confirmedVote) {
        currentStep++;
        if(steps[currentStep] !== undefined) {
            startStep()
        } else {
            document.querySelector('.screen').innerHTML = `<div class="giant--notice shine">FIM</div>`
        }
    }
}

startStep()
