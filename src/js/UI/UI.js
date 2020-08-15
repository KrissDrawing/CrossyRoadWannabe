import { setControlsEnable, setPoints, resetFinalScore, finalScore } from "../helpers";
import { getResults, postResult } from "../api/api";

export const HandleButtons = () => {
  const startButton = document.querySelector(".menu__Button");
  const menuWrapper = document.querySelector(".menu");
  const returnButton = document.querySelector(".button__return");
  const resultButton = document.querySelector(".button__results");
  const resultWrapper = document.querySelector(".menu__results");

  const saveButton = document.querySelector(".button__save");
  const usernameWrapper = document.querySelector(".username__container");

  const saveBackButton = document.querySelector(".save__back");
  const saveProceedButton = document.querySelector(".save__proceed");
  const usernameInput = document.querySelector(".username__input");

  startButton.addEventListener("click", () => {
    menuWrapper.classList.add("hide");
    resetFinalScore();
    setControlsEnable(true);
  });

  startButton.addEventListener("click", () => {
    menuWrapper.classList.add("hide");
    resetFinalScore();
    setControlsEnable(true);
  });

  returnButton.addEventListener("click", () => {
    resultWrapper.classList.add("hide");
    clearResults();
  });

  resultButton.addEventListener("click", () => {
    resultWrapper.classList.remove("hide");
    getResults();
  });

  saveButton.addEventListener("click", () => {
    usernameWrapper.classList.remove("hide");
  });

  saveBackButton.addEventListener("click", () => {
    usernameWrapper.classList.add("hide");
  });

  saveProceedButton.addEventListener("click", () => {
    postResult(usernameInput.value, finalScore);
    usernameWrapper.classList.add("hide");
  });
};

export const showFinalScoreButton = () => {
  console.log("finale score: " + finalScore);
  if (finalScore > 5) {
    const SaveScoreButton = document.querySelector(".button__save");
    SaveScoreButton.classList.remove("hide");
    console.log("done my job");
  }
};

export const showMenuButton = () => {
  const menuWrapper = document.querySelector(".menu");
  menuWrapper.classList.remove("hide");
};

const clearResults = () => {
  var e = document.querySelector(".entry__container");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
};

export const createResultElement = (result = 0, index = 0) => {
  const resultWrapper = document.querySelector(".entry__container");
  const entryWrapper = document.createElement("div");
  entryWrapper.classList.add("menu__entry");
  const count = document.createElement("p");
  count.innerHTML = index;
  const username = document.createElement("h4");
  username.innerHTML = result.username;
  const resultElement = document.createElement("p");
  resultElement.innerHTML = result.result;
  entryWrapper.append(count, username, resultElement);
  resultWrapper.appendChild(entryWrapper);
};
