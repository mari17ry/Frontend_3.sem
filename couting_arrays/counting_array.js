"use strict";

window.addEventListener("DOMContentLoaded", arrayFunction);


const array = [];
// let counter = 0;
// let setInterval;
let counter = 0;
// starter med at sige [3] de tre første lmao why

function arrayFunction(){
    // console.log(arrayFunction);
    counter++;
    array.unshift(counter);
  if (counter <= 9) {
    // hvis counter er less than eller equal to 9, så kører unshift (add)
    // array.shift(); idk nogle steder stod den, skal ikke bruge den tho


  } else if (counter > 9) {
    array.pop(counter);
    // > 9 = når coutner overstier 9 bliver pop kørt, og trækker de næste tal fra i guess idk it works. så længden ikke bliver mere end 9!
    // pop = sørger for, at (x) ikke overstiger (9). uden den fortsætter den op
    }
  console.log(array);
  setTimeout(arrayFunction, 1000);
//   setInterval(arrayFunction, 1000); den her fucker denhelt op lmao
//   sætter timeout, så den nye linje kommer hvert 1000. millisekundt = 1 sek
 
}
  



// function secondsCounter(){
//     seconds += 1;
//     // console.log(secondsCounter);
//     // virker! gider bare ikke se den køre hele tiden lmao
    

// }
// let cancel = setInterval(secondsCounter, 1000);



// // const array1 = [0];
// // let seconds = 0;
// let result;

// const array1 = Array();
// // const array1 = [0];


// // new Array
// // let counter = 0;

// // result = array1.unshift(1);
// // result = array1.splice(0,1, 1);



// console.log(array1);
// // console.log(result);



// function addToArray(){
//  console.log("addToArray");
   
//  for (let i = 0; i < 10; i++){
//  console.log(i);
 
// //  adder en masse numre i hver sin linje
  
// result = array1.push(i);
// }



// }

