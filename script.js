let armadio;
let idBlacklist = []

let armadio0 = [];
let armadio1 = [];
let armadio2 = [];
let armadio3 = [];
let armadio4 = [];
let armadio5 = [];
let armadio6 = [];

let armadio0Bl=0;
let armadio1Bl=0;
let armadio2Bl=0;
let armadio3Bl=0;
let armadio4Bl=0;
let armadio5Bl=0;
let armadio6Bl=0;

let phase=1;

let stile = "Ufficio"
let peso = 0;

let clothOfTheDay;


var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  slideToClickedSlide:true,
  cardsEffect: {
    perSlideRotate: 0,
    perSlideOffset: 20,
    slideShadows:false,
  },

});
swiper.on('progress', function () {
  console.log(swiper.progress);
  document.getElementById('wrapperS').style.marginLeft=(-300+swiper.progress*120)+'px'
});




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


function showCloth(id, layer){
  idBlacklist.push(id)
  if(layer==0){armadio0Bl++}
  if(layer==1){armadio1Bl++}
  if(layer==2){armadio2Bl++}
  if(layer==3){armadio3Bl++}
  if(layer==4){armadio4Bl++}
  if(layer==5){armadio5Bl++}
  if(layer==6){armadio6Bl++}
  

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
  thumbnail.src = armadio[id].Image
  thumbnail.id = "imgOutfit"

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

  const infoDiv = document.createElement("div");
  infoDiv.id= 'infoDiv';

  const title = document.createElement("h2");
  title.innerHTML = armadio[id].Nome;
  infoDiv.appendChild(title);

  const lastUseLabel = document.createElement("p");
  lastUseLabel.id= 'infoLabel';
  lastUseLabel.innerHTML = 'Last Use'
  infoDiv.appendChild(lastUseLabel);

  const lastUse = document.createElement("p");
  lastUse.id= 'info';
  lastUse.innerHTML = armadio[id].Ultimo_utilizzo
  infoDiv.appendChild(lastUse);

  const nUseLabel = document.createElement("p");
  nUseLabel.id= 'infoLabel';
  nUseLabel.innerHTML = 'N° of uses'
  infoDiv.appendChild(nUseLabel);

  const nUse = document.createElement("p");
  nUse.id= 'info';
  nUse.innerHTML = armadio[id].N_utilizzi_tot + ' (' + armadio[id].N_utilizzi_ultimo_mese + " times this month)"
  infoDiv.appendChild(nUse);

  card.appendChild(infoDiv);


  document.getElementById(phase).appendChild(card);

}

function showGarment(id, layer){
  idBlacklist.push(id)
  if(layer==0){armadio0Bl++}
  if(layer==1){armadio1Bl++}
  if(layer==2){armadio2Bl++}
  if(layer==3){armadio3Bl++}
  if(layer==4){armadio4Bl++}
  if(layer==5){armadio5Bl++}
  if(layer==6){armadio6Bl++}
  

  let stop=0;
  for(let j=0; j<armadio.length && stop==0; j++){
    if(armadio[j].Cloth_ID==id){
      id=j;
      stop = 1;
    }
  }
  
  const card = document.createElement("div");
  card.id= 'garmentOfTheDayCard';

  const thumbnailDiv = document.createElement("div");
  thumbnailDiv.id= 'thumbnailDiv';
  if(armadio[id].Color_code[0] == 255 && armadio[id].Color_code[1] == 255 && armadio[id].Color_code[2] == 255){
    thumbnailDiv.style.backgroundColor = 'rgb(150,150,150, 0.1)'
  }else{
    thumbnailDiv.style.backgroundColor = 'rgb('+ armadio[id].Color_code[0]+', '+ armadio[id].Color_code[1]+', '+ armadio[id].Color_code[2]+', 0.3)'
  }
  console.log(armadio[id].Color_code)

  const label = document.createElement('h3');
  label.innerHTML= 'The garment of the day'
  thumbnailDiv.appendChild(label);

  const info = document.createElement('object');
  info.id= 'infoCircle';
  info.data = "./svg/info.svg";
  info.width = "32";
  info.height = "32";
  thumbnailDiv.appendChild(info);
  //info.getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "red")

  const thumbnail = document.createElement("img");
  thumbnail.id= 'GOTDthumbnail';
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

  thumbnailDiv.appendChild(thumbnail);
  card.appendChild(thumbnailDiv);

  const title = document.createElement("h2");
  title.id= 'name';
  title.innerHTML = armadio[id].Nome;
  card.appendChild(title);


  const labelDiv1 = document.createElement("div");
  labelDiv1.id= 'labelDiv';
  labelDiv1.style.width = "135px";

  const brandLabel = document.createElement("p");
  brandLabel.id= 'infoLabel';
  brandLabel.innerHTML = 'Brand'
  brandLabel.style.width = "120px";
  labelDiv1.appendChild(brandLabel);

  const brandInfo = document.createElement("p");
  brandInfo.id= 'info';
  brandInfo.innerHTML = armadio[id].Brand
  brandInfo.style.width = "120px";
  labelDiv1.appendChild(brandInfo);

  const sizeLabel = document.createElement("p");
  sizeLabel.id= 'infoLabel';
  sizeLabel.innerHTML = 'Size'
  labelDiv1.appendChild(sizeLabel);

  const sizeInfo = document.createElement("p");
  sizeInfo.id= 'info';
  sizeInfo.innerHTML = 'M'
  labelDiv1.appendChild(sizeInfo);

  card.appendChild(labelDiv1);


  const labelDiv2 = document.createElement("div");
  labelDiv2.id= 'labelDiv';

  const lastUseLabel = document.createElement("p");
  lastUseLabel.id= 'infoLabel';
  lastUseLabel.innerHTML = 'Last use'
  labelDiv2.appendChild(lastUseLabel);

  const lastUse = document.createElement("p");
  lastUse.id= 'info';
  lastUse.innerHTML = armadio[id].Ultimo_utilizzo
  labelDiv2.appendChild(lastUse);

  const nUseLabel = document.createElement("p");
  nUseLabel.id= 'infoLabel';
  nUseLabel.innerHTML = 'N° of uses'
  labelDiv2.appendChild(nUseLabel);

  const nUse = document.createElement("p");
  nUse.id= 'info';
  nUse.innerHTML = armadio[id].N_utilizzi_tot + ' (' + armadio[id].N_utilizzi_ultimo_mese + " times this month)"
  labelDiv2.appendChild(nUse);

  card.appendChild(labelDiv2);

  const tag1 = document.createElement("div");
  tag1.id= 'tag';
  tag1.innerHTML = armadio[id].Style[0]
  if(armadio[id].Color_code[0] == 255 && armadio[id].Color_code[1] == 255 && armadio[id].Color_code[2] == 255){
    tag1.style.backgroundColor = 'rgb(150,150,150, 1)'
  }else{
    tag1.style.backgroundColor = 'rgb('+ armadio[id].Color_code[0]+', '+ armadio[id].Color_code[1]+', '+ armadio[id].Color_code[2]+', 1)'
  }
  
  card.appendChild(tag1);

  if(armadio[id].Style[1]){

    const tag2 = document.createElement("div");
    tag2.id= 'tag';
    tag2.innerHTML = armadio[id].Style[1]
    if(armadio[id].Color_code[0] == 255 && armadio[id].Color_code[1] == 255 && armadio[id].Color_code[2] == 255){
      tag2.style.backgroundColor = 'rgb(150,150,150, 1)'
    }else{
      tag2.style.backgroundColor = 'rgb('+ armadio[id].Color_code[0]+', '+ armadio[id].Color_code[1]+', '+ armadio[id].Color_code[2]+', 1)'
    }
    card.appendChild(tag2);

  }

  if(armadio[id].Style[2]){

    const tag3 = document.createElement("div");
    tag3.id= 'tag';
    tag3.innerHTML = armadio[id].Style[2]
    if(armadio[id].Color_code[0] == 255 && armadio[id].Color_code[1] == 255 && armadio[id].Color_code[2] == 255){
      tag3.style.backgroundColor = 'rgb(150,150,150, 1)'
    }else{
      tag3.style.backgroundColor = 'rgb('+ armadio[id].Color_code[0]+', '+ armadio[id].Color_code[1]+', '+ armadio[id].Color_code[2]+', 1)'
    }
    card.appendChild(tag3);

  }




  document.getElementById(phase).appendChild(card);

}



function findClothOfTheDay(){
  let flag=0;
  for(let i=0; i<armadio.length && flag==0; i++){
    if(armadio[i].Layer != 5 && armadio[i].Layer != 6){
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

dice = Math.floor(Math.random()*4)

if(armadio1.length-armadio1Bl<=0){ dice=1; } // if there are no vestiti interi mette il dice a 1

if(dice<3 || clothOfTheDay.Layer!=1 || (clothOfTheDay.Layer==2 || clothOfTheDay.Layer==3 || clothOfTheDay.Layer==4)){

  if(armadio0.length-armadio0Bl>0 && clothOfTheDay.Layer!=0){showAvailableCloth(armadio0)} //show lower if its not the clothoftheday and if there are available

  dice = Math.floor(Math.random()*2)
  if(armadio2.length -armadio2Bl<=0){dice==1} //if there are no Layer 2 show Layer 3
  if(armadio3.length -armadio3Bl<=0){dice==0}
  if((armadio3.length -armadio3Bl<=0 && armadio2.length -armadio2Bl<=0) || clothOfTheDay.Layer==3 || clothOfTheDay.Layer==2){dice=3;} //if there is nothing shown nothing
  console.log(dice+ ', '+ phase +' 2and3')
  if(dice==0){
    showAvailableCloth(armadio2)
  }
  if(dice==1){
    showAvailableCloth(armadio3)
  }


  dice = Math.floor(Math.random()*2)
  if(armadio4.length-armadio4Bl<=0){dice==1}
  if(armadio5.length-armadio5Bl<=0){dice==0}
  if((armadio5.length-armadio5Bl<=0 && armadio4.length-armadio4Bl<=0) || clothOfTheDay.Layer==4){dice=3;}
  console.log(dice+ ', '+ phase + ' 4and5')
  if(dice==0){
    showAvailableCloth(armadio4)
  }
  if(dice==1){
    showAvailableCloth(armadio5)
  }


  dice = Math.floor(Math.random()*2)
  if(armadio6.length-armadio6Bl<=0){dice==1}
  console.log(dice+ ', '+ phase+ ' 6')
  if(dice==0){
    showAvailableCloth(armadio6)
  }
  if(dice==1){
  }

}else{

  if(clothOfTheDay.Layer!=1){showAvailableCloth(armadio1)}

  dice = Math.floor(Math.random()*2)
  if(armadio5.length-armadio5Bl<=0){dice==1}
  if(armadio6.length-armadio6Bl<=0){dice==0}

  if(armadio6.length-armadio6Bl<=0 && armadio5.length-armadio5Bl<=0){dice=3;}

  if(dice==0){
    showAvailableCloth(armadio5)
  }
  if(dice==1){
    showAvailableCloth(armadio6)
  }


}

console.log(armadio0Bl)
console.log(armadio1Bl)
console.log(armadio2Bl)
console.log(armadio3Bl)
console.log(armadio4Bl)
console.log(armadio5Bl)
console.log(armadio6Bl)

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
flag=0;
  for(i=0; i<group.length && flag==0; i++){                      //loop all clothes in the group

    if(isNotBlacklisted(group[i].Cloth_ID)){            // if 
      flag=1;
      showCloth(group[i].Cloth_ID, group[i].Layer)
      //console.log(phase + 'showing ' + group[i].Cloth_ID)
    }

  }

  if(flag==0){
    console.log('no results')
  }

}

function createSuggestions(){
  //armadio = armadio.filter(isCorrectStyle)
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


  
  //showGarment(clothOfTheDay.Cloth_ID, clothOfTheDay.Layer)
  showGarment(4, clothOfTheDay.Layer)
  phase++
  createOutfit()
  phase++
  createOutfit()
  phase++
  createOutfit()
  //

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


document.addEventListener('keydown', (event)=> {    
  if(event.key=='a'){
    //document.getElementById('body').style.backgroundColor='black'
    console.log('aaaa')
    // document.getElementById("imgOutfit").style.opacity = "20%";
    // DA SISTEMARE ID PER OGNI SINGOLO CAPO
    document.getElementById("card").style.opacity = "20%";
  }

});




