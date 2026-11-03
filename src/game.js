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
function addCart(handMain,handOrd){

    for(let i=0;i<handMain.length;i++){
        let img=document.createElement("img")
        let imgor=document.createElement("img")

        img.setAttribute("src",handMain[i])
        imgor.setAttribute("src","image/carteRoi.png")

        img.classList="h-35 rounded-2xl cursor-pointer"
        imgor.classList="h-35 rounded-2xl"
        
        img.addEventListener("click",()=>{
                main.classList.add("flip")
                ordinateur.classList.add("flip");

                setTimeout(()=>{
                    
                    main.setAttribute("src",handMain[i])
                    let indexord=Math.floor(Math.random ()*handOrd.length)
                    ordinateur.setAttribute("src",handOrd[indexord])
                    main.classList.remove("flip");
                    ordinateur.classList.remove("flip");
                    caseEgalite(i,indexord,duel(handMain[i],handOrd[indexord]))
                },600)
                
            })
        meCarts.append(img)
        mainCarts.append(imgor)
    }

}




function duel(cj,co){

    if(cj.includes("empereur")  &&  co.includes("citoyen")){
        return "victoire"
    }else if(cj.includes("citoyen") && co.includes("empereur")){
        return "défaite"
    }else if(cj.includes("empereur") && co.includes("esclave")){
        return "défaite"
    }else if(cj.includes("esclave") && co.includes("empereur")){
        return "victoire"
    }else if(cj.includes("esclave") && co.includes("citoyen")){
        return "défaite"
    }else if(cj.includes("citoyen") && co.includes("esclave")){
        return "victoire"
    }
    else{
        return "égalité"
    }
}



let copieJoueur = [...mainJoueur];
let copieOrdinateur = [...mainOrdinateur];
function caseEgalite(indexJ,indexO,caseEg){

    if(caseEg==="égalité"){
        meCarts.innerHTML=""
        mainCarts.innerHTML=""

        copieJoueur.splice(indexJ,1)
        copieOrdinateur.splice(indexO,1)
        addCart(copieJoueur,copieOrdinateur)
    }
    console.log(copieJoueur)
    console.log(copieOrdinateur)
     
}

addCart(copieJoueur,copieOrdinateur)


