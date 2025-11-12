"use strict";

// Her er mine arrays placeret, som der bliver brugt inde i min taleboble

const introBeskeder = [
  "Hej med dig! Er du klar på at lege gemmeleg?",
  "Er du klar? Jeg tæller ned fra 3",
];

const slutBeskeder = [
  "Jubi! Du fandt mig!",
  "Tak for denne gang, jeg håber vi ses igen!",
];


document.addEventListener("DOMContentLoaded", () => {
  const talebobleTekst = document.querySelector(".taleboble-tekst");
  const slutparagraf = document.querySelector(".slutparagraf");

  const fisk = document.querySelector(".fisk");
  const overlay = document.querySelector(".overlay");
  const slutoverlay = document.querySelector(".slutoverlay");
  const fiskGif = document.querySelector(".fisk-gif");
  const fiskGif2 = document.querySelector(".fisk-gif2");
  const boblerfisk = document.querySelector(".boblerfisk");
  const talebobleContainer = document.querySelector(".taleboble-container");

  let introIndex = 0; //Denne linje holder styr på hvilken besked i introBesked-arrayet der skal vises"
  let slutIndex = 0;

  // Viser introbeskeder én ad gangen
  function visIntroBesked() {
    if (introIndex < introBeskeder.length) {
      talebobleTekst.textContent = introBeskeder[introIndex++];
      fiskGif.classList.remove("skjult");
      fisk.classList.add("skjult");
      fiskGif2.classList.add("skjult");
    } else {
      startGemmeleg();
    }
  }

  fiskGif.addEventListener("click", visIntroBesked);

  // Starter nedtælling og gemmeleg
  function startGemmeleg() {
    let count = 3;
    fiskGif.classList.remove("skjult");
    fisk.classList.add("skjult");
    fiskGif2.classList.add("skjult");
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
          fiskGif.classList.add("skjult");
          fisk.classList.remove("skjult");
          fiskGif2.classList.add("skjult");
          fisk.classList.add("hidden"); //Dette er min lille fisk
          fisk.style.width = "200px";
          talebobleContainer.classList.add("skjult"); //Taleblen skal væk i mens den gemmer sig
          setTimeout(() => {
            overlay.classList.remove("active");
            talebobleContainer.classList.add("skjult");
            boblerfisk.classList.add("skjult");
            // Nu kan man finde og klikke på fisken
            // Under denne linje ser man nedtællingen på tegneboblen, de er sat til 1sek (1000ms)
          }, 1000);
        }, 1000);
      }
    }, 1000);
  }
  function visSlutBesked() {
    if (slutIndex < slutBeskeder.length) {
      talebobleTekst.textContent = slutBeskeder[slutIndex++];
      fiskGif.classList.add("skjult");
      fiskGif2.classList.remove("skjult");
      fisk.classList.add("skjult");

      // Efter sidste besked, så er der timeout delay på 3sek, så slutOverlayet vises.
      if (slutIndex >= slutBeskeder.length) {
        setTimeout(() => {
          talebobleContainer?.classList.add("skjult");
          slutoverlay?.classList.add("active");
        }, 3000);
      }
    }
  }

  fiskGif.addEventListener("click", visIntroBesked);
  fiskGif2.addEventListener("click", visSlutBesked);

  fisk.addEventListener("click", function () {
    if (fisk.classList.contains("hidden")) {
      fisk.classList.remove("hidden");
      fisk.style.width = "500px";
      fiskGif.classList.add("skjult");
      fiskGif2.classList.remove("skjult");
      talebobleContainer.classList.remove("skjult");
      boblerfisk.classList.remove("skjult");
      visSlutBesked();
    }
  });

  // Start første besked
  visIntroBesked(); //Funktionen står til sidst, så den kører med det samme når siden er klar og viser den første introbesked uden at du behøver klikke.
});
