//  import {tweet} from "@mbostock/tweet"
var svgNS = 'http://www.w3.org/2000/svg'
var arrNum = [30,20,20,15,10,5]
var oSvg = document.getElementById('svg1')
var color = ['yellow','green','blue','purple','pink','red']
var angle = 360;
sumNum = 0
var outeR = 120;
var centerX = 200;
var centerY = 200;
var outerXY = [];
var innerXY = []
starttangle=0;
arrNum.forEach((t,i)=>{
  var agNum = t/100*angle
  sumNum += agNum;
  // if(index == arrNum.length-1){
  //   sumNum = 360
  // }
  var endangle = starttangle+agNum;
  var outerX = centerX+outeR*Math.sin(starttangle);
  var outerY = centerY+outeR*Math.cos(starttangle)
  var innerX = centerX+outeR*Math.sin(endangle);
  var innerY = centerY+outeR*Math.cos(endangle);
  outerXY.push({x:outerX,y:outerY})
  innerXY.push({x:innerX,y:innerY})
  var big = 0
  console.log(endangle,starttangle);
  if(endangle-starttangle>180){
  big = 1
  }
  var oPath = creatTag('path',{fill:color[i],d:'M'+centerX + ' ' +centerY+' '+'L'+outerXY[i].x+' '+outerXY[i].y+'A'+outeR+' '+outeR+' 0' +' '+big+' '+'1'+ innerXY[i].x+' '+innerXY[i].y+'Z'})
  oSvg.appendChild(oPath)
  starttangle=endangle;
})



function creatTag(tag,objAttr){
  var oTag = document.createElementNS(svgNS,tag)
  for(var attr in objAttr){
    oTag.setAttribute(attr,objAttr[attr])
  }
  return oTag
}