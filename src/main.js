import { getChoosePlayer, setChoosePlayer } from "./storage.js";
import { afficherPlayerSelect, confirmationPlayer, confirmationPopUp, preventLaunch } from "./players.js";


let pleyer =getChoosePlayer()
afficherPlayerSelect(pleyer)


preventLaunch()

confirmationPlayer()



let btnRules = document.querySelector("#btnRules");
let rulesPopup = document.querySelector("#rulesPopup");
let closeRules = document.querySelector("#closeRules");

btnRules.addEventListener("click", () => {
    rulesPopup.classList.remove("hidden");
});

closeRules.addEventListener("click", () => {
    rulesPopup.classList.add("hidden");
});

rulesPopup.addEventListener("click", (e) => {
    if (e.target === rulesPopup) {
        rulesPopup.classList.add("hidden");
    }
});
