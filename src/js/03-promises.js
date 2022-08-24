import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formField = document.querySelector(".form");

let delayNew = null
let stepNew = null
let amountNew = null

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
}



function submit(evt) {
  evt.preventDefault();
  if (!evt.target.tagName === "BUTTON") {
    return
  }

    const {elements: { delay, step, amount}, } = evt.currentTarget;

  delayNew = Number(delay.value)
  stepNew = Number(step.value)
  amountNew = Number(amount.value)

  for (let i = 1; i <= amountNew; i += 1) {
    createPromise(i, delayNew)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    
    delayNew += stepNew
  }

  evt.currentTarget.reset();
}

formField.addEventListener("submit", submit)