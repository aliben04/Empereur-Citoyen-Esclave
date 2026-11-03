import { afficherPlayerSelect } from "./players.js";
import { getChoosePlayer } from "./storage.js";


let plyer=getChoosePlayer()

afficherPlayerSelect(plyer)


let mainJoueur=["image/empereur.png","image/citoyen.png","image/citoyen.png","image/citoyen.png","image/citoyen.png"]
let mainOrdinateur =["image/citoyen.png","image/citoyen.png","image/citoyen.png","image/citoyen.png","image/esclave.png"]

let meCarts=document.querySelector("#meCarts")
let mainCarts=document.querySelector("#mainCarts")

let main=document.querySelector("#main")
let ordinateur=document.querySelector("#ordinateur")
function addCart(){

    for(let i=0;i<mainJoueur.length;i++){
        let img=document.createElement("img")
        let imgor=document.createElement("img")

        img.setAttribute("src",mainJoueur[i])
        imgor.setAttribute("src","image/carteRoi.png")

        img.classList="h-40 rounded-2xl cursor-pointer"
        imgor.classList="h-40 rounded-2xl"
        
        img.addEventListener("click",()=>{
                main.setAttribute("src",mainJoueur[i])
                let indexord=Math.floor(Math.random ()*mainOrdinateur.length)
                ordinateur.setAttribute("src",mainOrdinateur[indexord])
                console.log(indexord)
        })
        meCarts.append(img)
        mainCarts.append(imgor)
    }

}
addCart()






