function creatTag(tag,objAttr){
  var oTag = document.createElementNS(svgNS,tag)
  for(var attr in objAttr){
    oTag.setAttribute(attr,objAttr[attr])
  }
  return oTag
}
var svgNS = 'http://www.w3.org/2000/svg'
var tt = null;
var oSvg = document.querySelector('.aa')
var poin = ''
oSvg.addEventListener('mousedown',e=>{
  if(!tt){
    tt = creatTag('polyline',{stroke:"black", "stroke-width":"5",fill:'none'})
    oSvg.appendChild(tt)
  }
  if(poin == ''){
   poin += e.clientX + ','+e.clientY
  }else{
    poin += ','+e.clientX + ','+e.clientY
  }
  tt.setAttribute('points',poin)
  var oc = creatTag('circle',{cx:e.clientX,cy:e.clientY,r:'5',fill:"white",'stroke-widht':'3',stroke:'red'})
  oSvg.appendChild(oc)
})

oSvg.addEventListener('mousemove',e=>{
  if(tt){
    tt.setAttribute('points',poin+','+e.clientX+','+e.clientY)
  }
})
oSvg.addEventListener('contextmenu',e=>{
  oSvg.addEventListener= null;
  return false
})