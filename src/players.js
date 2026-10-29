
let users=JSON.parse(localStorage.getItem("users")) || []
let avatars=["👑","⚔️","🛡️","🦊","🐺","🐉","🦁","👻"]


function afficherAvatar(){
    let listavatar=document.querySelector(".avatar")
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
function afficherPlayer(player){
    let article=document.createElement("article")
    article.innerHTML=`
                <article class="flex flex-col items-center border border-white rounded-2xl gap-2 p-2">
                    <p class="p-2 text-[50px] border-2 border-white rounded-[500px]">${player.pseudo}</p>
                <h2>${player.avatar}</h2>
                <p>12 Parties</p>
                <div>
                    <button class="btn-primary bg-blue-500">Modifier</button>
                    <button class="btn-primary bg-red-500">Modifier</button>
                </div>
            </article>
    
    `
}

afficherAvatar()
function validatePseudo(){
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
        
        
        if (selectedAvatar && pseudo.value!=="") {
            let avataar = selectedAvatar.textContent;

            let user = {
                pseudo: pseudo.value,
                avatar: avataar,
                nbrPartie:0
            };

            users.push(user);

            localStorage.setItem("users", JSON.stringify(users));

        } else {
            document.querySelector(".avatar").nextElementSibling.textContent =
                "Tous les champs sont obligatoires !";
            document.querySelector(".avatar").nextElementSibling.classList="text-red-500"
        }
    });

}

validatePseudo()