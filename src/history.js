import { getChoosePlayer, getHistory, setHistory } from "./storage.js";
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
                        <button id="delete" class="text-blue-300 hover:text-red-400 transition">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
    </tr>
    `
    newTr.querySelector("#delete").addEventListener("click",()=>{
        showConfirmation(histoory.id)
    })
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

let searchPlayer=document.querySelector("#searchPlayer")
let filterResult=document.querySelector("#filterResult")

function filterHistory(){
    historyList.innerHTML=""
    let pseudo=searchPlayer.value.toLowerCase()
    let filterRes=filterResult.value
    let error=document.querySelector("#error")
    error.innerHTML=""


    let filter=history.filter((h)=>
        h.joueur.pseudo.toLowerCase().includes(pseudo) && (filterRes==="all" || h.result===filterRes)
    )
    filter.forEach(h => {
        afficherHistory(h)
    });
    if(historyList.innerHTML===""){
        error.innerHTML = "Aucun résultat trouvé !";
    }

}


searchPlayer.addEventListener("input",()=>{
    filterHistory()
})
filterResult.addEventListener("change",()=>{
    filterHistory()
})

function deletHistory(idHistory){
    history.forEach((h)=>{
        if(h.id===idHistory){
            history.splice(history.indexOf(h),1)
            setHistory(history)
        }
    })
    filterHistory()
    
}

let deletePopup=document.querySelector("#deletePopup")
let successPopup=document.querySelector("#successPopup")

function showConfirmation(id){
    deletePopup.classList.remove("hidden")
    let yes=deletePopup.querySelector("#confirmDelete")
    let no=deletePopup.querySelector("#cancelDelete")

    yes.addEventListener("click",()=>{
        deletHistory(id)
         deletePopup.classList.add("hidden")
         successPopup.classList.remove("hidden")
    })
    no.addEventListener("click",()=>{
        deletePopup.classList.add("hidden")
    })

}

successPopup.addEventListener("click",()=>{
    successPopup.classList.add("hidden")
})