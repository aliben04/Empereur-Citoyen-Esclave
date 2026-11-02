import { getPleyers,setPlayers,getChoosePlayer,setChoosePlayer } from "./storage.js"
let users=getPleyers() || []
let avatars=["👑","⚔️","🛡️","🦊","🐺","🐉","🦁","👻"]
let play=getChoosePlayer() ;


let listavatar=document.querySelector(".avatar")
export function afficherAvatar(){
    avatars.forEach((a)=>{
        let elem=document.createElement("p")
        elem.textContent=a
        elem.classList="p-2 text-[50px] border-2 border-white rounded-[500px] cursor-pointer hover:border-green-500"
        listavatar.append(elem)
        elem.addEventListener("click",()=>{
             for (let i = 0; i < listavatar.children.length; i++) {
                listavatar.children[i].classList.remove("bg-blue-100");
            }
            elem.classList.toggle("bg-blue-100")
        })

    })
    
}


export function validatePseudo(){
    let pseudo=document.querySelector("[name=\"pseudo\"]")
    let add=document.querySelector("#add")
    let error=pseudo.nextElementSibling
    let reg = /^[a-zA-Z0-9_]{3,20}$/;
    
    
    pseudo.addEventListener("input",()=>{
        let exist=false
        users.forEach(element => {
            if(element.pseudo===pseudo.value){
                exist=true
            }
        });
        if(reg.test(pseudo.value )&& !exist){
          error.textContent="pseudo is valid"
          error.classList="text-green-500"
          pseudo.style.border="green 2px solid"
          pseudo.style.boxShadow="2px 2px 5px green"
        }else if(exist){
            error.textContent="pseudo is already exist !"
            error.classList="text-red-500"
            pseudo.style.border="red 2px solid"
            pseudo.style.boxShadow="2px 2px 5px red"
        } else{
            error.textContent="pseudo is invalid !"
            error.classList="text-red-500"
            pseudo.style.border="red 2px solid"
            pseudo.style.boxShadow="2px 2px 5px red"
        }
    })
    add.addEventListener("click", (e) => {
        e.preventDefault();

        let selectedAvatar = document.querySelector("form .bg-blue-100");
        
        
        if (selectedAvatar && pseudo.value.trim() !=="") {
            let avataar = selectedAvatar.textContent;

            let user = {
                pseudo: pseudo.value,
                avatar: avataar,
                nbrPartie:0
            };

            users.push(user);

            setPlayers(users)
            afficherPlayer(user)
            pseudo.value=""
            selectedAvatar.classList.remove("bg-blue-100");
        } else {
            document.querySelector(".avatar").nextElementSibling.textContent =
                "Tous les champs sont obligatoires !";
            document.querySelector(".avatar").nextElementSibling.classList="text-red-500"
        }
    });

}


let confirmation=document.querySelector("#confirmation")
let playerSelected = null;
let articleSelected = null;
let aside = document.querySelector("aside");
export function afficherPlayer(player){
    let listPlayes=document.querySelector("#listPlayes")
    let article=document.createElement("article")
    article.innerHTML=`
            <article class="flex flex-col items-center border border-white rounded-2xl gap-2 p-2 hover:shadow-[0_0_15px_yellow] focus:bg-gray-400">
                    <p class="p-2 text-[50px] border-2 border-white rounded-[500px]">${player.avatar}</p>
                    <h2>${player.pseudo}</h2>
                    <p>${player.nbrPartie} Parties</p>
                    <div>
                        <button id="update" class="btn-primary bg-blue-500">Modifier</button>
                        <button id="supprimer" class="btn-primary bg-red-500 hover:bg-amber-400">Supprimer</button>
                    </div>
            </article>
    
    `
    if (play && play.pseudo === player.pseudo) {
            article.classList.add("bg-gray-400", "rounded-2xl");
    }
    article.addEventListener("click",()=>{
        for (let i = 0; i < listPlayes.children.length; i++) {
                listPlayes.children[i].classList.remove("bg-gray-400");
        }

        article.classList.add("bg-gray-400")
        article.classList.add("rounded-2xl")
        setChoosePlayer(player)
        afficherPlayerSelect(player)
    })
    listPlayes.append(article)
    article.querySelector("#supprimer").addEventListener("click",()=>{
        confirmation.classList.remove("hidden")
        playerSelected = player;
        articleSelected = article;
    })
    article.querySelector("#update").addEventListener("click",()=>{
        document.querySelector("[name=\"add\"]").classList.add("hidden")
        document.querySelector("[name=\"update\"]").classList.remove("hidden")

        aside.querySelector("h1").textContent="modifier un profile"
        let pseudo=document.querySelector("form [name=\"pseudo\"]")
        pseudo.value=player.pseudo

        for (let i = 0; i < listavatar.children.length; i++) {
            if(listavatar.children[i].textContent===player.avatar){
                listavatar.children[i].classList.add("bg-blue-100");
            }
        }
        document.querySelector("[name=\"update\"]").addEventListener("click",(e)=>{
            if(pseudo.value===""){

                e.preventDefault()
            }else{
                let newpl={
                pseudo: pseudo.value,
                avatar:  document.querySelector("form .bg-blue-100").textContent,
                nbrPartie:0
            }
                updateProfile(newpl,player.pseudo) 
                setChoosePlayer(player)
            }
           
        })

    })
    
}
export function confirmationPopUp(){
    confirmation.querySelector("#yes").addEventListener("click",()=>{
        deletPlayer(playerSelected)
        articleSelected.remove()
        confirmation.classList.add("hidden")
        if(playerSelected.pseudo===getPleyers().pseudo){
            localStorage.removeItem("player")
        }
        afficherPlayerSelect()
    })
    confirmation.querySelector("#no").addEventListener("click",()=>{
        confirmation.classList.add("hidden")
    })
}

export function afficherAllPlayers(){
    users.forEach((u)=>{
        afficherPlayer(u)
    })
}


function deletPlayer(player){

    let index=users.indexOf(player)
    users.splice(index,1)
    setPlayers(users)
    localStorage.removeItem("player")
}

function updateProfile(player,pseudo){
    users.forEach((u)=>{
        if(u.pseudo===pseudo){
            u.pseudo=player.pseudo
            u.avatar=player.avatar
        }
    })
    setPlayers(users)
}





export function afficherPlayerSelect(player){
    let p=document.querySelector("#player")
    if(player && player.pseudo){

        p.innerHTML=`
                    <p class="p-2 text-[30px] border-2 border-white rounded-[500px] cursor-pointer ">${player.avatar}</p>
                    <div>
                        <h3 class="font-bold text-xl">${player.pseudo}</h3>
                        <p class="text-mist-500">(Joueur actif)</p>
                    </div>
        `

    }else{
         p.innerHTML=`
                <p class="p-2 text-[30px] border-2 border-white rounded-[500px] cursor-pointer ">👤</p>
                <div>
                    <h3 class="font-bold text-xl">*******</h3>
                    <p class="text-mist-500">(Joueur actif)</p>
                </div>
    `
    }
    
    
}

let cnfPlayer=document.querySelector("#confirmationPlayer")
export function preventLaunch(){
    let btn=document.querySelector("#btnStart")
    btn.addEventListener("click",(e)=>{
        if(play===null){
            e.preventDefault()
            cnfPlayer.classList.remove("hidden")
        }
    })
}


export function confirmationPlayer(){
    cnfPlayer.addEventListener("click",()=>{
        cnfPlayer.classList.add("hidden")
    })
}

