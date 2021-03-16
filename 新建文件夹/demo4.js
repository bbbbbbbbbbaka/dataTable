var svgNS = "http://www.w3.org/2000/svg"
// var g1l1 = myCreateElement('line',{ x1:"100" ,y1:"100", x2:"390", y2:"200", stroke:"#ccc"})
// var g1l2 = myCreateElement('line',{x1:"100", y1:"100", x2:"390", y2:"200", stroke:"#ccc",'stroke-width':"10", 'stroke-opacity':"0"})
// var g1re = myCreateElement('rect',{x:"235", y:"140", fill:"red", width:"20", height:"20", rx:"2"})
// var g1tx = myCreateElement('text',{x:"245", y:"158", "font-size":"20", fill:"#fff", "text-anchor":"middle",},['?'])
// var g1 = myCreateElement('g',{style:"cursor: pointer;",},[
// g1l1,
// g1l2,
// g1re,
// g1tx,
// ])
// var osvg = myCreateElement('svg',{style:'width:500px;height:500px'},[g1])
// // var aa = document.createElementNS('svg',{class:'aa'})
// // var osvg = document.createElementNS(svgNS,'svg')
// // var osvg = myCreateElementNS('svg',{ width:"780px", height:"400px", xmlns:"http://www.w3.org/2000/svg"},[g1])
// // osvg = document.createElementNS(svgNS,'svg')
// // osvg.style = ' xmlns:"https://www.w3.org/TR/SVG2" '
// document.body.appendChild(osvg)


// function myCreateElement(dom,arr,son){
// 	var div = document.createElementNS(svgNS ,dom )
// 	if(arr !== null && arr !== undefined){
// 		Object.keys(arr).forEach((k,index)=>{
// 			div.setAttributeNS(svgNS,k,arr[k])
// 		})
// 	}
// 	if(son !== null & son !== undefined){
// 		son.forEach((c,index)=>{
// 			if(typeof c === 'string'){
// 				var text=document.createTextNode(c)
// 				text.data = c;
// 				div.appendChild(text)
// 			}else{
// 				div.appendChild(c)
// 			}
// 		})
// 	}
// 	return div;
//  }

// var osvg = document.createElementNS(svgNS,'svg')
// // osvg.setAttribute('xmlns', "http://www.w3.org/2000/svg")
// osvg.setAttribute('style','width:800px;height:700px  ')
// // osvg.setAttributeNS(svgNS,'style','width:700px; height:800px')
// document.body.appendChild(osvg)


 var div1 = document.createElement('div')
 div1.setAttribute('id','div1')
document.body.appendChild(div1)
// var svgNS = "https://www.w3.org/TR/SVG2"
var oparent = document.getElementById('div1')

function creatTag(tag,objAttr){
  var oTag = document.createElementNS(svgNS,tag)
  for(var attr in objAttr){
    oTag.setAttribute(attr,objAttr[attr])
  }
  return oTag
}


var centerX = oparent.offsetWidth/2;
var centerY = oparent.offsetHeight/2

var data = {
  centerNode:{text:'科鲁兹'},
  otherNode:{x:100,y:100,text:'易车网'}
}


var oSvg = creatTag('svg',{version:"1.1",xmlns:svgNS,width:'780px',height:'400px'})
var oG = creatTag( 'g',{style:'cursor:pointer'})
var oLine1 = creatTag('line',{ x1:"100", y1:"100", x2:"390", y2:"200", stroke:"#ccc"})
var oLine2 = creatTag('line',{ x1:"100", y1:"100", x2:"390", y2:"200", stroke:"#ccc","stroke-width":"10", "stroke-opacity":"0"})
var oRect =  creatTag('rect',{ x:"235", y:"140", fill:"red", width:"20", height:"20", rx:"2"})
var oText = creatTag('text',{x:"245", y:"158", "font-size":"20", fill:"#fff", "text-anchor":"middle"})
oText .innerHTML = '?'
oG.appendChild(oLine1)
oG.appendChild(oLine2)
oG.appendChild(oRect)
oG.appendChild(oText)
oSvg.appendChild(oG)
div1.appendChild(oSvg)