
let users=JSON.parse(localStorage.getItem("users")) || []
let avatars=["👑","⚔️","🛡️","🦊","🐺","🐉","🦁","👻"]
let avat=""

function afficherAvatar(){
    let listavatar=document.querySelector(".avatar")
    avatars.forEach((a)=>{
        let elem=document.createElement("p")
        elem.textContent=a
        elem.classList="p-2 text-[50px] border-2 border-white rounded-[500px] cursor-pointer hover:border-green-500"
        listavatar.append(elem)
        elem.addEventListener("click",()=>{
             for (let i = 0; i < listavatar.children.length; i++) {
                listavatar.children[i].classList.remove("bg-blue-500");
            }
            elem.classList.toggle("bg-blue-500")
        })

    })
    
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
    add.addEventListener("click",()=>{
            let user={pseudo:pseudo.value,avatar:"😂"}
            users.push(user)
            localStorage.setItem("users",JSON.stringify(users))
    })

}

validatePseudo()