"use strict";

const introBeskeder = [
  "Hej med dig! Er du klar på at lege gemmeleg?",
  "Er du klar? Jeg tæller ned fra 3",
];

const slutBeskeder = [
  "Jubi! Du fandt mig!",
  "Tak for denne gang, jeg håber vi ses igen!",
];

const talebobleTekst = document.querySelector(".taleboble-tekst");
const fisk = document.querySelector(".fisk");
const overlay = document.querySelector(".overlay");
const fiskGif = document.querySelector(".fisk-gif");
const talebobleContainer = document.querySelector(".taleboble-container");
let introIndex = 0;

// Viser introbeskeder én ad gangen
function visIntroBesked() {
  if (introIndex < introBeskeder.length) {
    talebobleTekst.textContent = introBeskeder[introIndex++];
    fiskGif.classList.remove("skjult");
    fisk.classList.add("skjult");
  } else {
    startGemmeleg();
  }
}

// Starter nedtælling og gemmeleg
function startGemmeleg() {
  let count = 3;
  fiskGif.classList.add("skjult");
  fisk.classList.remove("skjult");
  talebobleTekst.textContent = count;
  const countdown = setInterval(() => {
    count--;
    if (count > 0) {
      talebobleTekst.textContent = count;
    } else {
      clearInterval(countdown);
      talebobleTekst.textContent = "";
      overlay.classList.add("active");
      setTimeout(() => {
        fisk.classList.add("hidden");
        fisk.style.width = "200px";
        talebobleContainer.classList.add("skjult");
        setTimeout(() => {
          overlay.classList.remove("active");
          talebobleContainer.classList.add("skjult");
          // Nu kan man finde og klikke på fisken
        }, 1000);
      }, 1000);
    }
  }, 1000);
}

// Viser slut-beskeder automatisk med timeout
function visSlutBeskederAutomatisk() {
  let slutIndex = 0;
  function visNæste() {
    if (slutIndex < slutBeskeder.length) {
      talebobleTekst.textContent = slutBeskeder[slutIndex++];
      fiskGif.classList.remove("skjult");
      fisk.classList.add("skjult");
      setTimeout(visNæste, 3500); // Skift besked efter 3,5 sekunder
    } else {
      talebobleTekst.textContent = "";
      overlay.classList.add("active"); // Viser overlay, dette skal indikerer at spillet er slut.
      talebobleContainer.classList.add("skjult"); // Skjul taleboblen
    }
  }
  visNæste();
}

// Klik på GIF for at vise introbeskeder
fiskGif.addEventListener("click", visIntroBesked);

// Klik på fisken (når den er lille/skjult) for at starte automatisk slutbeskeder
fisk.addEventListener("click", function () {
  if (fisk.classList.contains("hidden")) {
    fisk.classList.remove("hidden");
    fisk.style.width = "500px";
    fiskGif.classList.remove("skjult");
    talebobleContainer.classList.remove("skjult");
    visSlutBeskederAutomatisk();
  }
});

// Start første besked
visIntroBesked();