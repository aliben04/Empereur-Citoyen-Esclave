import { getChoosePlayer, getHistory, getPleyers } from "./storage.js";
import { afficherPlayerSelect } from "./players.js";


let player=getChoosePlayer()
afficherPlayerSelect(player)

let history=getHistory()
let historyList=document.querySelector("#historyList")
function afficherHistory(histoory){

    let newTr=document.createElement("tr")

    newTr.innerHTML=`
    <tr class="hover:bg-[#102b49] transition">
                    <td class="p-3 whitespace-nowrap">${histoory.date}</td>

                    <td class="p-3">
                        <div class="flex items-center gap-2">
                            <span class="text-lg">${histoory.joueur.avatar}</span>
                            <span class="font-semibold text-white">${histoory.joueur.pseudo}</span>
                        </div>
                    </td>

                    <td class="p-3 text-center">${histoory.playerScore} / ${histoory.computerScore}</td>

                    <td class="p-3 text-center">
                        <span class="${AfficherResult(histoory.result)} px-3 py-1 rounded-full text-xs">
                            ${histoory.result}
                        </span>
                    </td>

                    <td class="p-3 text-center">
                        <button class="text-blue-300 hover:text-red-400 transition">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
    </tr>
    `
    historyList.append(newTr)
}

function afficherAll(){
    history.reverse().forEach((h)=>{
        afficherHistory(h)
    })
}
afficherAll()

function AfficherResult(result){
    switch(result){
        case "victoire": return "bg-emerald-500/20 text-emerald-300"  
        case "égalité": return "bg-blue-500/20 text-blue-300"
        case "défaite": return "bg-red-500/20 text-red-300"
    }
}


function searchByPseudo(p){
    historyList.innerHTML=""
    let error=document.querySelector("#error")
    error.innerHTML=""
    history.forEach((ps)=>{
        if(ps.joueur.pseudo.toLowerCase().includes(p.toLowerCase())){
            afficherHistory(ps)
        }
    })

    if( historyList.innerHTML===""){
        
        error.innerHTML="<h1 class='text-center font-bold rounded-card border-2 border-ink w-full p-2 mx-auto'>Aucun pseudo trouvé !</h1>";
    }
}

let searchPlayer=document.querySelector("#searchPlayer")

searchPlayer.addEventListener("input",()=>{
    if(searchPlayer.value!==""){
        searchByPseudo(searchPlayer.value)
    }else{
        historyList.innerHTML=""
        afficherAll()
    }
})