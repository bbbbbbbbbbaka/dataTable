



class Hive {
  constructor(parms) {
    this.father = parms.father
    // this.width = this.father.clientWidth
    // this.height = this.father.clientHeight
    this.width = parms.width
    this.height = parms.height
    this.innerRadius = parms.innerRadius
    this.outerRadius = parms.outerRadius
    this.majorAngle = parms.majorAngle
    this.minorAngle = parms.minorAngle
    this.json = parms.json
    // this.color(parms.color) 
    this.yanse = parms.yanse
    this.colors = parms.colors
    this.lineWidth = parms.lineWidth
    this.lineColor = parms.lineColor
    this.lineFill = parms.lineFill
    this.circleStroke = parms.circleStroke
    this.circleHoverStroke = parms.circleHoverStroke
    this.circleStrokeWidth = parms.circleStrokeWidth
    this.circleStrokHoverWidth = parms.circleStrokHoverWidth
    this.pathColor = parms.pathColor
    this.pathHoverColor = parms.pathHoverColor
    this.pathWidth = parms.pathWidth
    this.pathHoverWidth = parms.pathHoverWidth
    this.pathFill = parms.pathFill
    this.pathStrokeOpacity = parms.pathStrokeOpacity
    this.pathStrokeOpacity2 = parms.pathStrokeOpacity2
    this. cl= parms.cl
    this.nodes = parms.nodes
    this.nodesByType
    this.links = []
    this.active
    this.thiz = this
    this.da = true
    this.ac = false
    this.st = false
    this.formatNumber = d3.format(',d')
    this.defaultInfo;
    // this.nodesByType
    this.svg = d3.select("#chart").append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
      
    
      this.style = this.svg.append('style')

    this.lines = this.svg.append('g')
    this.paths = this.svg.append('g')
    this.circles = this.svg.append('g')

    this.angle = d3.scaleOrdinal()
      .domain(["source", "source-target", "target-source", "target"])
      .range([0, this.majorAngle - this.minorAngle, this.majorAngle + this.minorAngle, 2 * this.majorAngle]);

    this.radius = d3.scaleLinear()
      

    

    
    // var aa = document.createElement('style')
    // this.style = document.body.appendChild(aa)

    this.linkMouseover = this.linkMouseover.bind(this)
    this.linkMouseout = this.linkMouseout.bind(this)
    this.nodeMouseover = this.nodeMouseover.bind(this)
    // this.color = d3.scale.category10();
    // this.color = d3.schemeCategory10 
    this.main()

      // Initialize the info display. 初始化信息显示。
    this.info = d3.select("#info")
      .text(this.defaultInfo = "Showing " + this.formatNumber(this.links.length) + " dependencies among " + this.formatNumber(this.nodes.length) + " classes.");
  }
  // color(d){
  //   // console.log(d)
  //   if(typeof this.yanse == 'string'){
  //     return this.yanse    
  //   }else if(Object.prototype.toString.apply(this.yanse) == '[object Array]'){
  //      return d.co
  //   }else if(Object.prototype.toString.apply(this.yanse) == '[object Object]'){
  //      return d.co
  //   }
  // }
  setstyles(obj){
  if(obj !== undefined && obj !== null){
    
    if('color' in obj&& this.color !== obj.color){
      this.color = obj.color
    }
    if('colors' in obj && this.colors !== obj.colors){
      this.colors = obj.colors
    }
    if('lineWidth' in obj && this.lineWidth !== obj.lineWidth){
      this.lineWidth = obj.lineWidth
    }
    if('lineColor' in obj &&  this.lineColor !== obj.lineColor){
      this.lineColor = obj.lineColor
    }
    if('lineFill' in obj && this.lineFill !== obj.lineFill){
      this.lineFill = obj.lineFill
    }
   
    if('circleHoverStroke' in obj && this.circleHoverStroke !== obj.circleHoverStroke){
    this.circleHoverStroke = obj.circleHoverStroke
    }
    if('circleStrokeWidth' in obj && this.circleStrokeWidth !== obj.circleStrokeWidth){
    this.circleStrokeWidth = obj.circleStrokeWidth
    }
    if('circleStrokHoverWidth' in obj && this.circleStrokHoverWidth !== obj.circleStrokHoverWidth){
    this.circleStrokHoverWidth = obj.circleStrokHoverWidth
    }
  
    if('pathHoverColor' in obj && this.pathHoverColor !== obj.pathHoverColor){
    this.pathHoverColor = obj.pathHoverColor
    }
    if('pathWidth' in obj && this.pathWidth !== obj.pathWidth){
    this.pathWidth = obj.pathWidth
    }
    if('pathHoverWidth' in obj && this.pathHoverWidth !== obj.pathHoverWidth){
    this.pathHoverWidth = obj.pathHoverWidth
    }
    if('pathFill' in obj && this.pathFill !== obj.pathFill){
    this.pathFill = obj.pathFill
    }
    if('pathStrokeOpacity' in obj && this.pathStrokeOpacity !== obj.pathStrokeOpacity){
    this.pathStrokeOpacity = obj.pathStrokeOpacity
    }
    if('pathStrokeOpacity2' in obj && this.pathStrokeOpacity2 !== obj.pathStrokeOpacity2){
    this.pathStrokeOpacity2 = obj.pathStrokeOpacity2
    }
    
    this.st = true
    this.render()
    }
  }
  setactive(d){
    if(d!==undefined && d !==null){
      this.active = d
      this.ac = true
      this.render()
    }
  }
  setdata(obj){
   if(obj !== undefined && obj !== null){
    if('nodes' in obj && this.nodes !== obj.nodes){
      this.nodes = obj.nodes
    }
    if('nodesByType' in obj && this.nodesByType !== obj.nodesByType){
      this.nodesByType = obj.nodesByType
    }
    if('links' in obj && this.links !== obj.links){
      this.links = obj.links
    }
    if('width' in obj && this.width !== obj.width){ this.width = obj.width }
    // console.log(obj.width)
    if('height'in obj && this.height !== obj.height){
      this.height = obj.height
    }
    if('innerRadius' in obj && this.innerRadius !== obj.innerRadius ){
      this.innerRadius = obj.innerRadius
      this.radius = d3.scaleLinear()
      .range([this.innerRadius, this.outerRadius])

    }
    if('outerRadius' in obj &&  this.outerRadius !== obj.outerRadius ){
      this.outerRadius = obj.outerRadius
      this.radius = d3.scaleLinear()
      .range([this.innerRadius, this.outerRadius])

    }
    if('majorAngle' in obj && this.majorAngle !== obj.majorAngle){
      this.majorAngle = obj.majorAngle
    }
    if('minorAngle' in obj && this.minorAngle !== obj.minorAngle){
      this.minorAngle = obj.minorAngle
    }
     if('circleStroke' in obj && this.circleStroke !== obj.circleStroke ){
      this.circleStroke = obj.circleStroke
    }
     if('pathColor' in obj && this.pathColor !== obj.pathColor){
    this.pathColor = obj.pathColor
    }
    this.da = true
    this.render()
   }
  }
  
  render() {
    
    if(this.da == true){
      this.st = true
    }
    
    // const {active} = this
    // console.log(active,this.active)
    
    //console.log(this);

    // console.log(this.radius())

    if(this.da){
    
  this.radius.range([this.innerRadius, this.outerRadius]) 

  this.svg
   .attr("transform", "translate(" + this.outerRadius * .30 + "," + this.outerRadius * .6 + ")");

      //绘制轴
  this.lines
    .attr('class','lines')
    .selectAll(".axis")
    .data(this.nodesByType,)
    .join('line')
    .attr("class", "axis")
    .attr("transform", d => {return "rotate(" + this.degrees(this.angle(d[0])) + ")"; })
    .attr("x1", this.radius(-2))
    .attr("x2", d => {return this.radius(d.count + 2);})

  this.paths
    .attr('class', 'links')
    .selectAll('.link')
    .data(this.links)
    .join('path')
    .attr('class', 'link')
    .attr('stroke',d=>{return this.pathColor()})
    .attr('d', this.link()
      .angle(d => { return this.angle(d.type)})
      .radius(d => {return this.radius(d.node.index)})
    )
    .on('mouseover', this.linkMouseover)
    .on('mouseout', this.linkMouseout)

  this.circles
    .attr('class', 'nodes')
    .selectAll('.node')
    .data(this.nodes)
    .join('g')
    .attr('class', 'node')
    // .style('fill', d => {return this.hue(d)})
    .style('fill',d=>{return this.yanse(d)})
    .attr('stroke',d=>{return this.circleStroke(d)})
    .selectAll('circle')
    .data(d => {
      return d.connectors
    })
    .join('circle')
    .attr('transform', d => {return 'rotate(' + this.degrees(this.angle(d.type)) + ')'})
    .attr('cx', d => {return this.radius(d.node.index)})
    .attr('r', 4)
    .attr('class','yuan')
    .on('mouseover', this.nodeMouseover)
    .on('mouseout', this.linkMouseout)
    }

    if(this.st){
      this.style.text(`
    .axis{
      stroke: ${this.lineColor};
      stroke-width: ${this.lineWidth};
      fill: ${this.lineFill}
    }
    .link{
    
      stroke-width: ${this.pathWidth};
      stroke-opacity: ${this.pathStrokeOpacity};
      fill: ${this.pathFill}
    }
    .link.active{
      stroke: ${this.pathHoverColor};
      stroke-width: ${this.pathHoverWidth};
      stroke-opacity: ${this.pathStrokeOpacity2}
    }
    .yuan{
      
      stroke-width: ${this.circleStrokeWidth}
    }
    .yuan.active{
      stroke: ${this.circleHoverStroke};
      stroke-width: ${this.circleStrokHoverWidth}
    }
     `)
    }
    
    if(this.ac){
      this.paths.selectAll('.link').classed('active',d =>  {
          if (this.active === d) {
           d3.select('#info').text(d.source.node.name + " → " + d.target.node.name);
            return true
          } else if (d.source === this.active|| d.target === this.active) {
            return true
          }
        //  d3.select('#info').text(this.defaultInfo);
          return false
        })
      this.circles.selectAll('.yuan').classed('active',d=>{
        if(d === this.active.source || d === this.active.target) {
          
          return true;
        } else if (d === this.active) {
          d3.select('#info').text(d.node.name);
          return true;
        }
        // d3.select('#info').text(this.defaultInfo);
        return false
      })
      
      // this.paths.selectAll('.link').classed('active',d=>{return d.source === this.active|| d.target === this.active})
      // this.circles.selectAll('.yuan').classed('active',d=>{ return d === this.active})
    }

    this.da = false
    this.st = false
    this.ac = false     
   
  }

  main() {

    var nodesByName = {}
    // formatNumber = d3.format(',d'),
    // defaultInfo;

    // Construct an index by node name. 通过节点名称构造索引。
    this.nodes.forEach(d => {
      d.connectors = [];

      d.packageName = d.name.split('.')[1] //取以点分割的第二个字符串
      nodesByName[d.name] = d //创建对象，对象的名字是d.name,对象的内容是d
      //现在nodes里面的每个对象都多了两个新参数
    })
    console.log(nodesByName);


    this.nodes.forEach(source => {
      source.imports.forEach(targetName => { //遍历nodes下每一个imports的属性
        var target = nodesByName[targetName];
        // console.log(nodesByName[targetName])

        if (!source.source) source.connectors.push(source.source = {
          node: source,
          degree: 0
        });
        if (!target.target) target.connectors.push(target.target = {
          node: target,
          degree: 0
        });
        this.links.push({
          source: source.source,
          target: target.target
        })
      })
    })

    // Determine the type of each node, based on incoming and outgoing links. 根据传入和传出链接确定每个节点的类型。
    this.nodes.forEach(node => {
      if (node.source && node.target) {
        node.type = node.source.type = 'target-source'
        node.target.type = 'source-target';
      } else if (node.source) {
        node.type = node.source.type = 'source';
      } else if (node.target) {
        node.type = node.target.type = 'target'
      } else {
        node.connectors = [{
          node: node
        }];
        node.type = 'source'
      }
    })

    

    this.nodesByType = d3.groups(this.nodes, d => d.type)
      //.data(d=>{return d.type;})//key函数将d 以d.type为类别进行分组(实际为3组)
      //.sortKeys(d3.ascending)//nest.sortKeys（）函数用于按特定顺序（即升序或降序）对键进行排序。d3.ascending表示升序
      .sort((a, b) => {
        return a.count - b.count
      })
    //.entries(nodes);//nest.entries()返回一个键值对的数组


    // Duplicate the target-source axis as source-target. 将target-source轴复制为source-target
    this.nodesByType.push(['source-target', this.nodesByType[1][1]])
      this.nodesByType.forEach((d, i) => {
        var ss = ['red','green','blue','yellow']
        d[1].forEach((e, k) => {

          e.co = []
          e.co.push(ss[i])
        })
      })
    

    // Compute the rank for each type, with padding between packages. 计算每种类型的等级，并在包之间填充
    this.nodesByType.forEach(type => { //遍历nodesByType
      var lastName = type[1][0].packageName,
        count = 0;
      type[1].forEach((d, i) => { //遍历nodesByType下的每一个属性
        if (d.packageName != lastName) lastName = d.packageName, count += 2;
        d.index = count++;
      });
      type.count = count - 1;
    });

    // D3.js中的d3.extent()函数用于使用自然顺序从给定数组返回数组中的最小值和最大值。如果数组为空，则返回undefined，undefined作为输出。
    // Set the radius domain. 设置半径域。
    this.radius.domain(d3.extent(this.nodes, d => {
      return d.index
    }));
    console.log(this.nodesByType);
    console.log(this.nodes)
    


    
    this.render()
  }
  linkMouseover(e, d) {
     this.setactive(d)
  }
  linkMouseout(e, d) {
     d3.select("#info").text(this.defaultInfo);
    this.setactive(this.thiz)
  }
  nodeMouseover(e, d) {
    this.setactive(d)
  }
  randomColor() {
    //16进制随机数生成 颜色值
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    var aa = color
    return aa;
  }

  hue(d) {
    if (this.color == false) {
      return this.randomColor()
    } else {
      //  console.log(this)
      return d.co
    }
  }

  link() {
    var source = function (d) {
        return d.source;
      },
      target = function (d) {
        return d.target;
      },
      angle = function (d) {
        return d.angle;
      },
      startRadius = function (d) {
        return d.radius;
      },
      endRadius = startRadius,
      arcOffset = -Math.PI / 2;

    function link(d, i) {
      var s = node(source, this, d, i),
        t = node(target, this, d, i),
        x;
      if (t.a < s.a) x = t, t = s, s = x;
      if (t.a - s.a > Math.PI) s.a += 2 * Math.PI;
      var a1 = s.a + (t.a - s.a) / 3,
        a2 = t.a - (t.a - s.a) / 3;
      return s.r0 - s.r1 || t.r0 - t.r1 ?
        "M" + Math.cos(s.a) * s.r0 + "," + Math.sin(s.a) * s.r0 +
        "L" + Math.cos(s.a) * s.r1 + "," + Math.sin(s.a) * s.r1 +
        "C" + Math.cos(a1) * s.r1 + "," + Math.sin(a1) * s.r1 +
        " " + Math.cos(a2) * t.r1 + "," + Math.sin(a2) * t.r1 +
        " " + Math.cos(t.a) * t.r1 + "," + Math.sin(t.a) * t.r1 +
        "L" + Math.cos(t.a) * t.r0 + "," + Math.sin(t.a) * t.r0 +
        "C" + Math.cos(a2) * t.r0 + "," + Math.sin(a2) * t.r0 +
        " " + Math.cos(a1) * s.r0 + "," + Math.sin(a1) * s.r0 +
        " " + Math.cos(s.a) * s.r0 + "," + Math.sin(s.a) * s.r0 :
        "M" + Math.cos(s.a) * s.r0 + "," + Math.sin(s.a) * s.r0 +
        "C" + Math.cos(a1) * s.r1 + "," + Math.sin(a1) * s.r1 +
        " " + Math.cos(a2) * t.r1 + "," + Math.sin(a2) * t.r1 +
        " " + Math.cos(t.a) * t.r1 + "," + Math.sin(t.a) * t.r1;
    }

    function node(method, thiz, d, i) {
      var node = method.call(thiz, d, i),
        a = +(typeof angle === "function" ? angle.call(thiz, node, i) : angle) + arcOffset,
        r0 = +(typeof startRadius === "function" ? startRadius.call(thiz, node, i) : startRadius),
        r1 = (startRadius === endRadius ? r0 : +(typeof endRadius === "function" ? endRadius.call(thiz, node, i) : endRadius));
      return {
        r0: r0,
        r1: r1,
        a: a
      };
    }

    link.source = function (_) {
      if (!arguments.length) return source;
      source = _;
      return link;
    };

    link.target = function (_) {
      if (!arguments.length) return target;
      target = _;
      return link;
    };

    link.angle = function (_) {
      if (!arguments.length) return angle;
      angle = _;
      return link;
    };

    link.radius = function (_) {
      if (!arguments.length) return startRadius;
      startRadius = endRadius = _;
      return link;
    };

    link.startRadius = function (_) {
      if (!arguments.length) return startRadius;
      startRadius = _;
      return link;
    };

    link.endRadius = function (_) {
      if (!arguments.length) return endRadius;
      endRadius = _;
      return link;
    };

    return link;
  }

  degrees(radians) {
    return radians / Math.PI * 180 - 90;
  }


}


var hive = d3.json('./hiv.json').then((nodes) => {
  var div = document.createElement('p')
  div.setAttribute('id', 'chart')
  div.setAttribute('style','display:inline-block; width:960; height:850; ')
  div.setAttribute('display','inline-block')
  document.body.appendChild(div)
  var p = new Hive({
    width: 960,
    height: 850,
    innerRadius: 40,
    outerRadius: 620,
    majorAngle: 2 * Math.PI / 3,
    minorAngle: 1 * Math.PI / 12,
    father: div,
    yanse:d=>{
     var ab = d3.scaleOrdinal()
      .domain(["source", "source-target", "target-source", "target"])
      .range(['red','blue' ,'yellow', 'green']);
      return ab(d.type)
    },
    
    lineWidth: 2 + 'px',
    lineColor: '#000',
    lineFill: 'none',
    circleStroke: d=>{return 'black'},
    circleHoverStroke:'#ff0000',
    circleStrokeWidth:1+'px',
    circleStrokHoverWidth: 3 + 'px',
    pathColor: d=>{return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0)`},
    pathHoverColor:'#ff0000',
    pathWidth: 2 + 'px',
    pathHoverWidth:2+'px',
    pathFill: 'none',
    pathStrokeOpacity: 0.3,
    pathStrokeOpacity2:1,
    nodes: nodes,
  })
  const gui = new dat.GUI()
  gui.add(p,'outerRadius',0,620).onFinishChange(e=>{
    p.setdata({outerRadius:p.outerRadius})
  })
  gui.add(p,'innerRadius',0,40).onFinishChange(e=>{
    p.setdata({innerRadius:p.innerRadius})
  })
  gui.add(p,'lineWidth').onFinishChange(e=>{
    p.setstyles({'linewidth':p.linewidth})
  })
  gui.addColor(p,'lineColor').onChange(e=>{
    p.setstyles({'lineColor':p.lineColor})
  })
  // gui.addColor(p,'pathColor').onFinishChange(e=>{
  //   p.setstyles({'pathColor':p.pathColor})
  // })
  gui.addColor(p,'pathHoverColor').onFinishChange(e=>{
    p.setstyles({'pathHoverColor':p.pathHoverColor})
  })
  gui.add(p,'pathWidth',0,10).onFinishChange(e=>{
    p.setstyles({'pathWidth':p.pathWidth})
  })
  gui.add(p,'pathHoverWidth',10).onFinishChange(e=>{
    p.setstyles({'pathHoverWidth':p.pathHoverWidth})
  })
  gui.add(p,'pathStrokeOpacity',0,1).onChange(e=>{
    p.setstyles({'pathStrokeOpacity':p.pathStrokeOpacity})
  })
  // gui.addColor(p,'circleStroke').onChange(e=>{
  //   p.setstyles({'circleStroke':p.circleStroke})
  // })
  gui.addColor(p,'circleHoverStroke').onFinishChange(e=>{
    p.setstyles({'circleHoverStroke':p.circleHoverStroke})
  })
  gui.add(p,'circleStrokeWidth').onFinishChange(e=>{
    p.setstyles({'circleStrokeWidth':p.circleStrokeWidth})
  })
  gui.add(p,'circleStrokHoverWidth').onFinishChange(e=>{
    p.setstyles({'circleStrokHoverWidth':p.circleStrokHoverWidth})
  })
})


function aa(){
return arguments[1]+arguments[2]
}
