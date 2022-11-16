let armadio;

fetch('./armadio.json')
.then(response => {
  return response.json();
})
.then(jsondata => {
  armadio = jsondata;
  hexToRGB()
  console.log(armadio[0].Color_code);
});


let clothes = []

clothes[0]={
  name: "t-shirt nera",
  color: [40,40,40],
  type: 'upper'
}

clothes[1]={
  name: "t-shirt bianca",
  color: [240,241,247],
  type: 'upper'
}

clothes[2]={
  name: "jeans",
  color:[72,122,164],
  type: 'lower'
}

clothes[3]={
  name: "jeans neri",
  color:[35,35,45],
  type: 'lower'
}

clothes[4]={
  name: "cargo",
  color:[74,51,47],
  type: 'lower'
}

function showCloth(i){

  const card = document.createElement("div");
  card.id= 'card';

  const thumbnail = document.createElement("div");
  thumbnail.id= 'thumbnail';
  thumbnail.style.backgroundImage = "url(imgs/"+i+".png)"
  card.appendChild(thumbnail);

  const title = document.createElement("p");
  title.id= 'name';
  title.innerHTML = clothes[i].name;
  card.appendChild(title);

  document.getElementById("body").appendChild(card);

}

//for(let i=0; i<clothes.length; i++){
//  showCloth(i)
//}
let upper = [];
let lower = [];

function findUpper(){

	for(let i=0; i<clothes.length; i++){

	if(clothes[i].type=='upper'){
		upper.push(i);
	}else{
		lower.push(i);
	}

	}
}

function randomOutfit(){
  findUpper();
  upperIndex=Math.floor(Math.random() * upper.length);
  lowerIndex=Math.floor(Math.random() * lower.length);

	showCloth(upper[upperIndex]);
  for(let i=0; i<lower.length;i++){
    let a = deltaE(clothes[upper[upperIndex]].color, clothes[lower[i]].color)
    if (a<30){
      showCloth(lower[i]);
    }
  }

	//showCloth(lower[lowerIndex]);
}


randomOutfit()


const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const colore = [r, g, b]
    return colore;
}


function hexToRGB(){

  for(let i=0; i<armadio.length; i++){
    const color = hex2rgb(armadio[i].Color_code)
    armadio[i].Color_code = color
  }

}
