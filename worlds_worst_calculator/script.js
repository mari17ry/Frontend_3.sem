
"use strict";

console.log("hvad så lmao");

// eventet 'load' sker automatisk når 'window' er loaded - altså alle sidens elementer og stylesheets osv.
// omvendt er 'domcontentloaded fyret af så snart dom'en fra html er læst. så I guess hurtigere load?? idk
window.addEventListener("load", sidenVises);

// konstanter fra vores DOM 
const calculate = document.querySelector("#calculate");
const result = document.querySelector("#results");
// skal jeg bruge både 'result' og 'results'?
const clear = document.querySelector("#clear");

// variabler til funktioner/calculations
// de skal være 'blank' her, fordi vi skal ændre dem senere? så vi definerer dem først nede i calculate funktionen?
// kunne ma n ikke godt definere dem heroppe også? med document.qsl osv.?

let firstNumber;
let secondNumber;
let operator;




function sidenVises(){
    console.log("siden vises");
    calculate.addEventListener("click", beginCalculation);
    clear.addEventListener("click", clearResult);
}

function beginCalculation(){
    console.log("calculations");
    // her definerer vi variablerne til inputfields, oppe over er de blot 'blanke'. ER DET NØDVENDIGT SÅDAN HER?
    let firstNumber = parseFloat(document.querySelector("#firstnumber").value);
    let secondNumber = parseFloat(document.querySelector("#secondnumber").value);
    let operator = document.querySelector("#operator").value;
    //   let results = document.querySelector("#firstnumber").value;
  

// ________________________
// if/else fra Jonas' opgave 
    if (operator === "add") {
      console.log(firstNumber + secondNumber);
      results = firstNumber + secondNumber;
    } else if (operator === "sub") {
      console.log(firstNumber - secondNumber);
      results = firstNumber - secondNumber;
    } else if (operator === "mul") {
      console.log(firstNumber * secondNumber);
      results = firstNumber * secondNumber;
    } else {
      console.log(firstNumber / secondNumber);
      results = firstNumber / secondNumber;

    //   ingen 'div' '/', fordi det vel er den sidste mulighed i if/else
    }
     document.querySelector("#firstnumber").value = results;
    //  fungerer kun når den er hernede, ikke oppe ved de andre. skal vel læses i en bestemt rækkefølge.. 
    //  fungferer = skriver resultatet i #firstnumber-field, så det kan rbuges som input til næste operator
}






// #results = let result 



// round result?? ikke mandatory
// i en if/else????


// append result to end of list
// scroll list to the bottom


function clearResult(){
    console.log("clear result");
    result.innerHTML = "";
    // innerHTML retter i id'et i DOM'en, som konstanten henviser til.
    // derfor skriver vi "", fordi funktionen skal ændre teksten i DOM til 'blank'. 
    // vi har lavet konstanten, derfr kan vi hente DOM-elementet via konstanten. 
    // ellers bruges document.getElementById(#results).innerHTML = "";

}

// clear list of results - optional

