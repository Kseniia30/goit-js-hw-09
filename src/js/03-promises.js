function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

const formField = document.querySelector(".form");
const delay = document.querySelector("[name=delay]")
const step = document.querySelector("[name=step]")
const amount = document.querySelector("[name=amount]")
const subBtn = document.querySelector("[type=submit]")