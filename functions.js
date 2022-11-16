function deltaE(rgbA, rgbB) {
  let labA = rgb2lab(rgbA);
  let labB = rgb2lab(rgbB);
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;
  let deltaLKlsl = deltaL / (1.0);
  let deltaCkcsc = deltaC / (sc);
  let deltaHkhsh = deltaH / (sh);
  let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

function rgb2lab(rgb){
  let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

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

function isCorrectStyle(val){
  let flag=0;
  for(let j=0; j<val.Style.length; j++){
    if(val.Style[j]==stile){flag=1;}
  }
  if (flag==1){return true}else{return false}
}

function isCorrectWeight(val){
    if(val.Pesantezza>=peso){return true}else{return false}
}


function isLayer0(val){
  if(val.Layer==0){return true}else{return false}
}
function isLayer1(val){
  if(val.Layer==1){return true}else{return false}
}
function isLayer2(val){
  if(val.Layer==2){return true}else{return false}
}
function isLayer3(val){
  if(val.Layer==3){return true}else{return false}
}
function isLayer4(val){
  if(val.Layer==4){return true}else{return false}
}
function isLayer5(val){
  if(val.Layer==5){return true}else{return false}
}
function isLayer6(val){
  if(val.Layer==6){return true}else{return false}
}





//OLD FUNCTIONS////////////////////////////////////////////////////////////////////////////////////////////////

function filterStyle(){
  for(let i=0; i<armadio.length; i++){
    let flag=0;
    for(let j=0; j<armadio[i].Style.length; j++){
      if(armadio[i].Style[j]==stile){flag=1;}
    }
      if(flag==1){
        armadioStyle.push(armadio[i])
      }
  }
}

function filterPeso(){
  for(let i=0; i<armadioStyle.length; i++){
    let flag=0;

      if(armadioStyle[i].Pesantezza>=peso){flag=1;}

      if(flag==1){
        armadioPeso.push(armadioStyle[i])
      }
  }
}

function sortUtilizzi(a, b) {
  if (a.N_utilizzi_ultimo_mese<b.N_utilizzi_ultimo_mese) {
    return -1;
  }
  if (a.N_utilizzi_ultimo_mese>b.N_utilizzi_ultimo_mese) {
    return 1;
  }
  return 0;
}

function sortColorCompatibility(a, b) {
  if (a.ColorCompatibility<b.ColorCompatibility) {
    return 1;
  }
  if (a.ColorCompatibility>b.ColorCompatibility) {
    return -1;
  }
  return 0;
}
