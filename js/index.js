let pageNum = 1;
let pageURL = `http://localhost:3000/monsters/?_limit=50&_page=${pageNum }`

document.addEventListener("DOMContentLoaded", function() {
    getAllMonsters();
    document.querySelector(".create-monster-form").addEventListener("submit", newMonster)
    document.querySelector("#forward").addEventListener("click", nextPage)
    document.querySelector("#back").addEventListener("click", previousPage)
})



function getAllMonsters(){
    fetch(pageURL)
    .then(response => response.json())
    .then(monsterArray => {
        monsterArray.forEach(generateMonster)
    })
}

function generateMonster(monster) {

    let monsterDiv = document.createElement('div')
    document.querySelector('#monster-container').appendChild(monsterDiv)
    monsterDiv.id = `monster-${monster.id}`
    monsterDiv.classList.add("monster-div")

    //creating the monster's name section
    monsterName = document.createElement('h2')
    monsterName.innerText = `${monster.name} and I am ID # ${monster.id}`
    monsterDiv.appendChild(monsterName)

    //creating the monster's age section
    monsterAge  = document.createElement('h4')
    monsterAge.innerText = `${monster.age}`
    monsterDiv.appendChild(monsterAge)

    //creare the p element
    monstNote = document.createElement('p')
    monstNote.innerText = monster.description
    monsterDiv.appendChild(monstNote)
}

function newMonster(e){
    event.preventDefault()
    let monsterData = {
        name:  event.currentTarget[0].value,
        age:  event.currentTarget[1].value,
        description:  event.currentTarget[2].value
    }

    fetch(pageURL, configObject)
    .then(response => response.json())
    .then(generateMonster)
   
   let configObject = {
       methodd: "POST",
       headers: {'Content-Type' :'application/json'},
       body: JSON.stringify(monsterData)
   }


}

function previousPage(e){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum -= 1}`)
    .then(response => response.json())
    .then(monsterArray => {
        document.querySelector("#monster-container").innerHTML=""
        monsterArray.forEach(generateMonster)
    })
}

function nextPage(e){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum += 1}`)
    .then(response => response.json())
    .then(monsterArray => {
        document.querySelector("#monster-container").innerHTML=""
        monsterArray.forEach(generateMonster)
    })
}
