"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];

let prefectCounter = 0;
let expelledCounter = 0;
let enrolledCounter = 0;

let currentlyShownCounter = 0;

let slytherinCounter = 0;
let hufflepuffCounter = 0;
let ravenclawCounter = 0;
let gryffindorCounter = 0;


let expelledStudents = []; 
// for ny liste til expelled!

const studentsNew = {
    firstName:"",
    lastName:"",
    middleName:"",
    nickName:"",
    house:"",
    image:"",
    gender:"",
    expell: false,  // true = enrolled
    prefect: false,
};



console.log(allStudents);


function start( ){
    console.log("start lol");
    loadJSON();

    // __________________sort + filter buttons_________________________

    registerSortButtons();
    registerFilterButtons();
    restoreCounters();
    showList();
    //ok, det kunne være smart at have kun én registerbuttons funktion heroppe, og så bare have filter- og sort-eventlistenerne deri, istedet for at skulle lave to funktioner med to funktioner mere. but i gotta commit. 
}


function loadJSON(){
    fetch('https://petlatkea.dk/2021/hogwarts/students.json') 
   .then(response => response.json())
   //    før skrev jeg 'response.text' og der blev det ikke ægte array. brug derfor json()
   .then (jsonData => {
       prepareStudents(jsonData);
       console.log(jsonData);
   });
  }



function capitalizeFirstCharacter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    // return = en value vi sætter i funktionen. når funktionen kaldes andre steder (fx i student.firstName) så 'returnes' den value, vi har defineret i funktionen
    // så den funktion, der kalder på returnfunktionen, modtager dens values! 
}

function prepareStudents(jsonData){
    jsonData.forEach(jsonObject => {
        const students = Object.create(studentsNew);
        const allNames = jsonObject.fullname.trim().split(" ");
        // nødvendigt med .trim() her, ellers fucker det helt op lmao. men så nehøves der ikke trim andre steder på students.!

        students.firstName = capitalizeFirstCharacter(allNames[0]);
        students.lastName = capitalizeFirstCharacter(allNames[allNames.length -1]); 
        students.middleName = allNames.slice(1, allNames.length - 1).map(part => capitalizeFirstCharacter(part)).join(" ");
        // students.nickName = allNames.slice(1, allNames.length - 1).map(part => capitalizeFirstCharacter(part.trim())).join(" ");
        // nickName virker ikke her!

        students.house = capitalizeFirstCharacter(jsonObject.house.trim());
        // på house skal der igen være trim på, da det ikke går ind under fullname! og derfor ikke går tildelt .trim() deroppe som de andre
        
        students.gender = jsonObject.gender;
        //bloodstatus skal nok også her efter ny jsonURL er loaded

        // for at få placeret navnene ordentligt + 'x'
        // kun 1 navn
        if (allNames.length === 1){
            students.lastName = 'x';
            students.middleName = 'x';
            students.nickName = 'x';

            // fornavn og efternavn
        } else if (allNames.length === 2){
            students.middleName = 'x ';
            students.nickName = 'x';

            // fornavn, mellemnavn og efternavn
        } else if (allNames.length === 3){
            students.nickName = 'x';
 
        }

        // nickname
        if (jsonObject.fullname.includes('\"') === true){
            students.middleName = 'x';
            students.nickName =  allNames.slice(1, allNames.length - 1).map(part => part.trim().charAt(1).toUpperCase() + part.trim().slice(2)).join(" ")  ;
            // virker kun hernede, ikke oppe ved de andre..
            // har bare taget præcis samme kode som fra middleName og smidt den herned under nickName. 
            // er ikke helt fixed, der er stadig det sidste " tilbage..
        }

        allStudents.push(students);

       
         
    });
    displayList(allStudents);
    //det her burde være buildList!


}

//buildList!
function displayList(allStudents){
    document.querySelector("#list tbody").innerHTML = "";
    allStudents.forEach(displayStudent);

    // counters 
    restoreCounters();
    showNumbers();
    makeHouseNumbers();
    console.log(
      `Gryffindor: ${gryffindorCounter}
      Hufflepuff: ${hufflepuffCounter}
      Ravenclaw: ${ravenclawCounter}
      Slytherin: ${slytherinCounter}
      Num of NonExpelled: ${expelledCounter}
      Num of expelled: ${enrolledCounter}
      Currently displayed: ${currentlyShownCounter}`
    );
  
}



function displayStudent(students){
  const clone = document.querySelector("template#students").content.cloneNode(true);

  clone.querySelector("[data-field=firstName]").textContent = students.firstName;
  clone.querySelector("[data-field=lastName]").textContent = students.lastName;
  clone.querySelector("[data-field=middleName]").textContent = students.middleName;
//   clone.querySelector("[data-field=nickName]").textContent = students.nickName;
  clone.querySelector("[data-field=house]").textContent = students.house;
  clone.querySelector("[data-field=gender]").textContent = students.gender;  
  clone.querySelector("[data-field=Details]").addEventListener("click", () => ShowStudentPopup(students));
  //activates popup for selected student
  

  
  //expell icons
 if (students.expell === true){
  clone.querySelector("[data-field=expell]").textContent ="❌";
 } else {
  clone.querySelector("[data-field=expell]").textContent ="⭐"
 }

 //prefect icons
 if (students.prefect === true){
    clone.querySelector("[data-field=prefect]").textContent = "🏆";
  } else {
    clone.querySelector("[data-field=prefect]").textContent = "x";
  }



 clone.querySelector("[data-field=expell]").addEventListener("click", clickExpell);

 function clickExpell(){
   if (students.expell === true){
    students.expell = false;
   }else{
    students.expell = true;
   }

   displayList(allStudents);
    //det burde være buildList
  }


  clone.querySelector("[data-field=prefect]").addEventListener("click", clickPrefect);


  function clickPrefect(){
    if(students.prefect === true){
      students.prefect = false;
    }else{
      tryToMakePrefect(students);
    }
  
    displayList(allStudents);
    //skal være buildList()
  }

  function tryToMakePrefect(selectedStudents){
    const prefects = allStudents.filter(students => students.prefect);
    const otherPrefect = prefects.filter(students => students.house === selectedStudents.house);
    const numberOfPrefects = otherPrefect.length;
    //hvor mange, der currently er prefects
    //for at få liste over, hvem der currently er prefect. 
    

    // sætter max amount af prefecter, max to fra hvert hus
    if (students.prefect !== true && numberOfPrefects < 2 ){
      students.prefect = true;
      prefectCounter++;
      console.log("yes girl to fra samme hus")
    }else if (students.prefect === true){
      students.prefect = false;
      prefectCounter--;
    } else {
      dontMakePrefect();
    }
    
    function dontMakePrefect(){
      alert("No more than two prefects per house!");
      }
    } 

 document.querySelector("#list tbody").appendChild(clone);
}



function makeHouseNumbers() {
  allStudents.forEach((student) => {
    enrolledCounter++;
    if (student.house === "Gryffindor") {
      gryffindorCounter++;
    } else if (student.house === "Hufflepuff") {
      hufflepuffCounter++;
    } else if (student.house === "Ravenclaw") {
      ravenclawCounter++;
    } else if (student.house === "Slytherin") {
      slytherinCounter++;
    }
    showNumbers();
  });
  
  expelledStudents.forEach((expelledStudent) => {
   numOfExpelled++;
   });
};



function restoreCounters() {
  gryffindorCounter = 0;
  hufflepuffCounter = 0;
  ravenclawCounter = 0;
  slytherinCounter = 0;
  expelledCounter = 0;
  enrolledCounter = 0;
  currentlyShownCounter = 0;
  //ikke umiddelbart den her kode der gør, at counters ikke virker
};





//_________________________-FILTERING-____________________________
function filterList(studentType){
    
    let filteredList = allStudents;
        
    // de skal skrives med stort begynderbogstav, for det står også sådan i arrayet!!!
    if (studentType === "Gryffindor"){
        filteredList = allStudents.filter(isGryffindor);
    } else if
        (studentType === "Ravenclaw"){
        filteredList = allStudents.filter(isRavenclaw);
    } else if
        (studentType === "Hufflepuff"){
        filteredList = allStudents.filter(isHufflepuff);
    } else if
        (studentType === "Slytherin"){
        filteredList = allStudents.filter(isSlytherin);
    }else if
        (studentType === "Expelled"){
        filteredList = allStudents.filter(isExpelled);
    }else if
        (studentType === "Enrolled"){
        filteredList = allStudents.filter(isEnrolled);
    }
        
   displayList(filteredList);
}


function isGryffindor(student){
    return student.house === "Gryffindor";
}
function isRavenclaw(student){
    return student.house === "Ravenclaw";
}
function isHufflepuff(student){
    return student.house === "Hufflepuff";
}
function isSlytherin(student){
    return student.house === "Slytherin";
}


function isExpelled(student){
  return student.expell === true;
}
function isEnrolled(student){
  return student.expell === false;
}
//  THIS WORKS! Men tror fordi jeg ikke har lavet buildList() men bruger displayList, så kan man ikke sortere inde i de forskellige filtreringer!



document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", registerFilterButtons));


function registerFilterButtons(){
    document.querySelectorAll("[data-action='filter']").forEach(button => button.addEventListener("click", selectedStudentFilter));
}

function selectedStudentFilter(event){
    const filter =  event.target.dataset.filter;
    console.log(`selected ${filter}`);
    filterList(filter);

}


//_________________________SORTING__________________________

document.querySelectorAll(".sort").forEach((th) => th.addEventListener("click", registerSortButtons));

function registerSortButtons(){
    document.querySelectorAll("[data-action='sort']").forEach(th => th.addEventListener("click", selectedStudentSorting));
}

function selectedStudentSorting(event) {
  const sortBy = event.target.dataset.sort;
  console.log(`selected ${sortBy}`);
  sortList(sortBy);
}

function sortList(sortBy){
  let sortedList = allStudents;
  //future fix: kunne ændre alfabetisk retning i sort

  // kan sorteres  i dem her (ikke middlename)
  if(sortBy === "firstName"){
    sortedList = sortedList.sort(sortByFirstName);
  }else if (sortBy === "lastName"){
    sortedList = sortedList.sort(sortByLastName);
  }else if (sortBy === "house"){
    sortedList = sortedList.sort(sortByHouse);
  }else if (sortBy === "expell"){
    sortedList = sortedList.sort(sortByExpell);
  }else if (sortBy === "prefect"){
    sortedList = sortedList.sort(sortByPrefect);
  }

  displayList(sortedList);
}

function sortByFirstName(studentA, studentB){
  if(studentA.firstName < studentB.firstName){
    return -1;
  }else{
    return 1;
  }
}
function sortByLastName(studentA, studentB){
  if(studentA.lastName < studentB.lastName){
    return -1;
  }else{
    return 1;
  }
}

function sortByHouse(studentA, studentB){
  if(studentA.house < studentB.house){
    return -1;
  }else{
    return 1;
  }
}

function sortByExpell(studentA, studentB){
  if(studentA.expell < studentB.expell){
    return 1;
  }else{
    return -1;
  }
  //find lige hoved og hale i hvad der er expelled og enrolled, her viser den stjernen øverst, selvom 1 og -1 er omvendt end de andre!
  //på den her måde kommer vi uden om problemet med, at expell ikke er string og derfor ikke kunne laves på samme måde som de andre med localcompare!

} 

function sortByPrefect(studentA, studentB){
  if(studentA.prefect < studentB.prefect){
    return 1;
  }else{
    return -1;
  }
  
} 

//_________________________POPUP__________________________

function ShowStudentPopup(students){
  const popup = document.querySelector("#popup");
  document.getElementById("closePopup").addEventListener("click", clearPopup );
  popup.style.display = "flex";
  popup.querySelector("h2").textContent = "Student Name: " + students.firstName + " " + students.middleName + " " + students.nickName + " " + students.lastName;
  //ikke helt perfekt lmao, x'er når 0 middle name

  popup.querySelector("#house").textContent = "House of " + students.house;
  popup.querySelector("#gender").textContent = "Gender: " + students.gender;
  popup.querySelector("#prefect").textContent = "Is the student a prefect? " + students.prefect;
  popup.querySelector("#expelled").textContent = "Is the students expelled? " + students.expell;
  // popup.querySelector("#inquis").textContent = "Inquisitorial member:  " + students.inquis;
  // popup.querySelector("#bloodstatus").textContent = "Bloodstatus: " + students.blood;
  popup.querySelector("#student_id").textContent = "Student ID: ";
  

  if (students.firstName === "Leanne"){
    popup.querySelector("#student_id_img").textContent = "none found";
    //virker ikke - hvordan fjerner jeg hendes?
    //lave en div rundt om img i html og så class list add hide/none på leannes kun? men tænker det er det samme problem som classlist add hide/none påpopup jeg prøvede. idk try
  }else if(students.lastName === "Patil") {
    popup.querySelector("#student_id_img").src = `images/${students.lastName[0].toLowerCase()}${students.lastName.substring(1)}_${students.firstName.toLowerCase()}.png`;
  }else if(students.lastName === "Potter"){
    popup.querySelector("#student_id_img").src = `images/${students.lastName.toLowerCase()}.png`;
  }else {
    popup.querySelector("#student_id_img").src =`images/${students.lastName.toLowerCase()}_${students.firstName[0].toLowerCase()}.png`;
  }


  changePopupColor(students);
}


function clearPopup(){

  document.querySelector("#popup").classList.add(popup.style.display = "none");
  popup.querySelector("h2").textContent = "Student Name:" + "";
  popup.querySelector("#house").textContent = "House of" + "";
  popup.querySelector("#gender").textContent = "Gender:" + "";
  // popup.querySelector("#inquis").textContent += " " + students.inquis;
  // popup.querySelector("#bloodstatus").textContent += " " + students.blood;
  // popup.querySelector("p").textContent += " " + students.image;

  
}

function changePopupColor(students){
  //ændrer border color alt efter house valgt
  const popup = document.querySelector("#popup_article");
  if(students.house === "Hufflepuff"){
    popup.style.border = "10px solid #d0c327";

  } else if (students.house === "Gryffindor"){
    popup.style.border = "10px solid #9f2929";

  }else if (students.house === "Slytherin"){
    popup.style.border = "10px solid #248324";

  }else if (students.house === "Ravenclaw"){
    popup.style.border = "10px solid #29699f";
  }
}


//_________________________COUNTERS_________________________
function showNumbers() {
    document.querySelector("#prefectNumber").textContent = "Prefects: " + prefectCounter;
    document.querySelector("#expelledNumber").textContent = "Expelled students: " +expelledCounter;
    document.querySelector("#enrolledNumber").textContent = "Enrolled students: " + enrolledCounter;
    document.querySelector("#currentlyShownNumber").textContent = "Currently shown: "+ currentlyShownCounter;
    document.querySelector("#slytherinNumber").textContent = "Slytherin: " + slytherinCounter;
    document.querySelector("#HufflepuffNumber").textContent = "Hufflepuff: "+ hufflepuffCounter;
    document.querySelector("#ravenclawNumber").textContent = "Ravenclaw: " + ravenclawCounter;
    document.querySelector("#gryffindorNumber").textContent = "Gryffindor: " + gryffindorCounter;
  
  }
  
  showNumbers();
  
  function displayCounters(){
    document.querySelector
  }
  
  restoreCounters();

//_________________________SEARCH_________________________


const search = document.getElementById("student_search");
//input element
const results = document.querySelector("ul")

//ny liste for resultaterne (overvej at få direkte ind på den anden liste..)
let search_term = "";
//whatever tf people write in the search field

const showList = () => {
  results.innerHTML = "";
  allStudents.filter((student) => {
      return (
        student.firstName.toLowerCase().includes(search_term) ||
        student.lastName.toLowerCase().includes(search_term)
      );
    })
    .forEach((e) => {
      const searchList = document.createElement('li');
      searchList.innerHTML = `<i>firstname:</i> ${e.firstName}  || <i>lastname:</i> ${e.lastName}`;
      results.appendChild(searchList);
    });
};


search.addEventListener("input", (event) => {
  search_term = event.target.value.toLowerCase();
  showList();
});

