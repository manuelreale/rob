let armadio;
let idBlacklist = []

let armadio0 = [];
let armadio1 = [];
let armadio2 = [];
let armadio3 = [];
let armadio4 = [];
let armadio5 = [];
let armadio6 = [];
let phase=1;

let stile = "Ufficio"
let peso = 1;

let clothOfTheDay;

fetch('./armadio.json')
.then(response => {
  return response.json();
})
.then(jsondata => {
  armadio = jsondata;
  hexToRGB()

});


// >85 opposite
// <15 same
// >60 <70 triarchic


function showCloth(id){
  idBlacklist.push(id)

  let stop=0;
  for(let j=0; j<armadio.length && stop==0; j++){
    if(armadio[j].Cloth_ID==id){
      id=j;
      stop = 1;
    }
  }
  
  const card = document.createElement("div");
  card.id= 'card';

  const thumbnail = document.createElement("img");
  thumbnail.id= 'thumbnail';
  thumbnail.src = armadio[id].Image

  thumbnail.title =  
  armadio[id].Nome + "\n" +
  'Brand ' + armadio[id].Brand + "\n" +
  'Made in ' + armadio[id].Production_place + "\n" +
  'Materiale: ' + armadio[id].Material_maxPerc + "\n" +
  'Prezzo ' + armadio[id].Cost + "\n" +
  'Style: ' +armadio[id].Style + "\n" +
  'Numero utilizzi ultimo mese ' + armadio[id].N_utilizzi_ultimo_mese+ "\n" +
  armadio[id].Description_keywords + "\n" +
  'ID, Peso, Compatibilità '+ armadio[id].Cloth_ID +' '+ armadio[id].Pesantezza +' '+ armadio[id].ColorCompatibility;

  card.appendChild(thumbnail);

  const title = document.createElement("p");
  title.id= 'name';
  title.innerHTML = armadio[id].Nome;
  card.appendChild(title);

  const layer = document.createElement("p");
  layer.id= 'layer';
  layer.innerHTML = 'Layer: ' + armadio[id].Layer;
  card.appendChild(layer);


  document.getElementById(phase).appendChild(card);

}



function findClothOfTheDay(){
  let flag=0;
  for(let i=0; i<armadio.length && flag==0; i++){
    if(armadio[i].layer != 5 && armadio[i].layer != 6){
      flag=1;
      clothOfTheDay=armadio[i];
    }
  }
}



function isColorCompatible(val){

  let colorDistance = deltaE(clothOfTheDay.Color_code, val.Color_code)

  if((colorDistance>80) || (colorDistance<25) || (colorDistance>55 && colorDistance<75)){
    return true;
  }else{
    return false;
  }

}



function rankColorCompatibility(group){

  let colorDistance;

  for(let i=0; i<group.length; i++){
    colorDistance = deltaE(clothOfTheDay.Color_code, group[i].Color_code)
    group[i].flag = 0;

    if((colorDistance>75) || (colorDistance<30) || (colorDistance>50 && colorDistance<75)){
      group[i].ColorCompatibility = 1
    }else{
      group[i].ColorCompatibility = 0
    }   
    if((colorDistance>80) || (colorDistance<25) || (colorDistance>55 && colorDistance<75)){
      group[i].ColorCompatibility = 2
    }
    if((colorDistance>90) || (colorDistance<10) || (colorDistance>60 && colorDistance<70)){
      group[i].ColorCompatibility = 3
    }

  }

}


function createOutfit(){
let dice = 0;
dice = Math.floor(Math.random()*2)

if(dice==0 || clothOfTheDay.Layer!=1){

  if(armadio0.length>0 && clothOfTheDay.Layer!=0){showAvailableCloth(armadio0)}
  if(armadio2.length>0 && clothOfTheDay.Layer!=2){showAvailableCloth(armadio2)}
  if(armadio3.length>0 && clothOfTheDay.Layer!=3){showAvailableCloth(armadio3)}
  if(armadio4.length>0 && clothOfTheDay.Layer!=4){showAvailableCloth(armadio4)}
  if(armadio5.length>0){showAvailableCloth(armadio5)}
  if(armadio6.length>0){showAvailableCloth(armadio6)}

}else{

  if(armadio1.length>0 && clothOfTheDay.Layer!=1){showAvailableCloth(armadio1)}
  if(armadio5.length>0){showAvailableCloth(armadio5)}
  if(armadio6.length>0){showAvailableCloth(armadio6)}

}

}

function isNotBlacklisted(id){
let flag =0;
  for(let i=0; i<idBlacklist.length; i++){
    if(idBlacklist[i]==id){
      flag=1;
    }
  }
  if(flag==0){return true;}else{return false;}
}

function showAvailableCloth(group){

  for(i=0; i<group.length; i++){                      //loop all clothes in the group

    if(isNotBlacklisted(group[i].Cloth_ID)){            // if 
      showCloth(group[i].Cloth_ID)
      return;
    }else {}

  }

}

function createSuggestions(){
  armadio = armadio.filter(isCorrectStyle)
  armadio = armadio.filter(isCorrectWeight)
  armadio.sort(sortUtilizzi);

  findClothOfTheDay()
  //armadio = armadio.filter(isColorCompatible)
  rankColorCompatibility(armadio)

  armadio0 = armadio.filter(isLayer0)
  armadio1 = armadio.filter(isLayer1)
  armadio2 = armadio.filter(isLayer2)
  armadio3 = armadio.filter(isLayer3)
  armadio4 = armadio.filter(isLayer4)
  armadio5 = armadio.filter(isLayer5)
  armadio6 = armadio.filter(isLayer6)

  armadio0.sort(sortColorCompatibility);
  armadio1.sort(sortColorCompatibility);
  armadio2.sort(sortColorCompatibility);
  armadio3.sort(sortColorCompatibility);
  armadio4.sort(sortColorCompatibility);
  armadio5.sort(sortColorCompatibility);
  armadio6.sort(sortColorCompatibility);


  
  showCloth(clothOfTheDay.Cloth_ID)
  phase++
  createOutfit()
  phase++
  createOutfit()
  phase++
  createOutfit()

  console.log(idBlacklist)
}



function elegante(){stile = "Elegante"; document.getElementById('setupOpen').id = 'setupClose'; createSuggestions() }
function ufficio(){stile = "Ufficio"; document.getElementById('setupOpen').id = 'setupClose'; createSuggestions() }
function casual(){stile = "Casual"; document.getElementById('setupOpen').id = 'setupClose'; createSuggestions() }
function glamour(){stile = "Glamour"; document.getElementById('setupOpen').id = 'setupClose'; createSuggestions() }
function comfy(){stile = "Comfy"; document.getElementById('setupOpen').id = 'setupClose'; createSuggestions() }
function vintage(){stile = "Vintage"; document.getElementById('setupOpen').id = 'setupClose'; createSuggestions() }
function sport(){stile = "Sport"; document.getElementById('setupOpen').id = 'setupClose'; createSuggestions() }
function cerimonia(){stile = "Cerimonia"; document.getElementById('setupOpen').id = 'setupClose'; createSuggestions() }

// function removeCards(){
//   var paras = document.getElementsByClassName('hi');

// while(paras[0]) {
//     paras[0].parentNode.removeChild(paras[0]);
// }​
// }

