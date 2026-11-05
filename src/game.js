import { afficherPlayerSelect } from "./players.js";
import { getChoosePlayer, getHistory, setChoosePlayer, setHistory } from "./storage.js";

let game = {
    joueur: {
        pseudo: "",
        avatar: "",
        score: 0
    },

    ordinateur: {
        score: 0
    },

    partie: {
        manche: 0,
        groupe: 1,
        totalManches: 12
    },

    duel: {
        resultat: ""
    }
};

let history=getHistory()
let plyer=getChoosePlayer()
game.joueur.pseudo=plyer.pseudo
game.joueur.avatar=plyer.avatar

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

        img.classList=" h-20 md:h-30 lg:35 rounded-2xl cursor-pointer"
        imgor.classList="h-20 md:h-30 lg:35 rounded-2xl"
        
        img.addEventListener("click",()=>{
                main.classList.add("flip")
                ordinateur.classList.add("flip");

                setTimeout(()=>{
                    
                    main.setAttribute("src",handMain[i])
                    let indexord=Math.floor(Math.random ()*handOrd.length)
                    ordinateur.setAttribute("src",handOrd[indexord])

                    main.classList.remove("flip");
                    ordinateur.classList.remove("flip");
                    let res=duel(handMain[i],handOrd[indexord])

                    game.joueur.score+=res.scorj
                    game.ordinateur.score+=res.scorO

                    localStorage.setItem("game",JSON.stringify(game))
                    caseEgalite(i,indexord,res.result)
                    AfficherResult(res.result)
                    displayScore()
                },600)
                
            })
        meCarts.append(img)
        mainCarts.append(imgor)
    }

}




function duel(cj,co){

    if(cj.includes("empereur")  &&  co.includes("citoyen")){
        return {result:"victoire",scorj:1,scorO:0}
    }
    else if(cj.includes("citoyen") && co.includes("empereur")){
        return  {result:"défaite",scorj:0,scorO:1}
    }
    else if(cj.includes("empereur") && co.includes("esclave")){
        return {result:"défaite",scorj:0,scorO:5}
    }
    else if(cj.includes("esclave") && co.includes("empereur")){
        return  {result:"victoire",scorj:5,scorO:0}
    }
    else if(cj.includes("esclave") && co.includes("citoyen")){
        return {result:"défaite",scorj:0,scorO:1}
    }
    else if(cj.includes("citoyen") && co.includes("esclave")){
        return {result:"victoire",scorj:1,scorO:0}
    }
    else{
        return  {result:"égalité",scorj:0,scorO:0}
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
    }else{
        meCarts.innerHTML=""
        mainCarts.innerHTML=""
        game.partie.manche++
        changerMain()
        copieJoueur = [...mainJoueur]
        copieOrdinateur = [...mainOrdinateur]
        addCart(mainJoueur,mainOrdinateur)

    }
    game.partie.groupe=Math.floor(game.partie.manche/3)+1
     manageRounds()
     if(game.partie.manche===game.partie.totalManches){
        showResult()
        plyer.nbrPartie++
        setChoosePlayer(plyer)
         let histor_y={
            id: "g_"+ Date.now(),
            joueur:getChoosePlayer(),
            date: new Date().toString().slice(0,21),
            playerScore: game.joueur.score,
            computerScore: game.ordinateur.score,
            result: game.duel.resultat     // "victoire", "défaite" ou "égalité"
        }
         history.push(histor_y)
         setHistory(history)
       
    }
    console.log(game.partie.manche)

     
}

addCart(copieJoueur,copieOrdinateur)


function AfficherResult(result){
    let caseR=document.querySelector(".result")
    switch(result){
        case "victoire": caseR.textContent="🏆 victoire"; break
        case "égalité": caseR.textContent="😒 égalité"; break
        case "défaite": caseR.textContent=" 😔 défaite";break
    }
}


function displayScore(){
    let monS=document.querySelector("#monS")
    let scoreO=document.querySelector("#scoreO")

    monS.textContent=game.joueur.score
    scoreO.textContent=game.ordinateur.score
}

function manageRounds(){
    let rounds=document.querySelector("#rounds")
    let groupe=document.querySelector("#groupe")

    rounds.textContent=game.partie.manche
    groupe.textContent=game.partie.groupe
}

function changerMain(){
    if(game.partie.manche % 3 === 0){
        let newlist=mainJoueur
        mainJoueur=mainOrdinateur
        mainOrdinateur=newlist
        
    }
        
}


function showResult(){
    let result = document.querySelector("#result")
    let casePlayer=document.querySelector("#casePlayer")
    let finalPlayerScore=document.querySelector("#finalPlayerScore")
    let finalComputerScore=document.querySelector("#finalComputerScore")
    let replay=document.querySelector("#replay")
    let caseR=document.querySelector(".result")

    let scorePl=game.joueur.score
    let scoreOr=game.ordinateur.score
        
    result.classList.remove("hidden")

    if(scorePl>scoreOr){
        casePlayer.textContent="🏆 victoire"
        game.duel.resultat="victoire"
    }else if((scorePl<scoreOr)){
        casePlayer.textContent="😔 défaite"
        game.duel.resultat="défaite"
    }else{
        casePlayer.textContent="😒 égalité"
        game.duel.resultat="égalité"
    }

    finalPlayerScore.textContent=game.joueur.score
    finalComputerScore.textContent=game.ordinateur.score

    replay.addEventListener("click",()=>{
        game.partie.manche=0
        game.partie.groupe=Math.floor(game.partie.manche/3)+1

        game.joueur.score=0
        game.ordinateur.score=0
        caseR.textContent="Start Game"

        main.setAttribute("src","")
        ordinateur.setAttribute("src","")

        manageRounds()
        displayScore()
        result.classList.add("hidden")
        
    })

}