import { afficherPlayerSelect } from "./players.js";
import { getChoosePlayer } from "./storage.js";


let plyer=getChoosePlayer()

afficherPlayerSelect(plyer)




let mainJoueur=["image/empereur.png","image/citoyen.png","image/citoyen.png","image/citoyen.png","image/citoyen.png"]
let mainOrdinateur =["image/citoyen.png","image/esclave.png","image/esclave.png","image/esclave.png","image/esclave.png"]
let meCarts=document.querySelector("#meCarts")
let mainCarts=document.querySelector("#mainCarts")

function addCart(src){
    let img=document.createElement("img")
    img.setAttribute("src",src)
    img.classList="h-40 rounded-2xl"
    meCarts.append(img)

}
mainJoueur.forEach((cart)=>{
    addCart(cart)
})
mainOrdinateur.forEach(()=>{
    let img=document.createElement("img")
    img.setAttribute("src","image/carteRoi.png")
    img.classList="h-40 rounded-2xl"
    mainCarts.append(img)
})



