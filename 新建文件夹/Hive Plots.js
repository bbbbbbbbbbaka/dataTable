class Hive {
  constructor(parms) {
    this.width = parms.width
    this.height = parms.height
    this.innerRadius = parms.innerRadius
    this.outerRadius = parms.outerRadius
    this.majorAngle = parms.majorAngle
    this.minorAngle = parms.minorAngle
    this.json = parms.json
    this.color = parms.color
    this.colors = parms.colors
    this.lineWidth = parms.lineWidth
    this.lineColor = parms.lineColor
    this.lineFill = parms.lineFill
    this.circleStroke = parms.circleStroke
    this.circleStroke2 = parms.circleStroke2
    this.circleStrokeWidth = parms.circleStrokeWidth
    this.circleStrokeWidth2 = parms.circleStrokeWidth2
    this.pathColor = parms.pathColor
    this.pathColor2 = parms.pathColor2
    this.pathWidth = parms.pathWidth
    this.pathWidth2 = parms.pathWidth2
    this.pathFill = parms.pathFill
    this.pathStrokeOpacity = parms.pathStrokeOpacity
    this.pathStrokeOpacity2 = parms.pathStrokeOpacity2
    this.nodes = parms.nodes
    this.nodesByType
    this.links = []
    this.active = this
    this.thiz = this
    this.styles = {
      color:this.color,

    }
    this.da = true
    this.ac = false
    this.st = false
    
    
    // this.nodesByType


    this.svg = d3.select("#chart").append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + this.outerRadius * .20 + "," + this.outerRadius * .57 + ")");

    this.lines = this.svg.append('g')
    this.paths = this.svg.append('g')
    this.circles = this.svg.append('g')

    this.angle = d3.scaleOrdinal()
      .domain(["source", "source-target", "target-source", "target"])
      .range([0, this.majorAngle - this.minorAngle, this.majorAngle + this.minorAngle, 2 * this.majorAngle]);

    this.radius = d3.scaleLinear()
      .range([this.innerRadius, this.outerRadius])

    this.style = this.svg.append('style')


    this.linkMouseover = this.linkMouseover.bind(this)
    this.linkMouseout = this.linkMouseout.bind(this)
    this.nodeMouseover = this.nodeMouseover.bind(this)
    // this.color = d3.scale.category10();
    // this.color = d3.schemeCategory10 
    this.main()

  }
  setstyles(obj){
    
  if(obj !== undefined && obj !== null){
    if('width' in obj && this.width !== obj.width){ this.width = obj.width }
    // console.log(obj.width)
    if('height'in obj && this.height !== obj.height){
      this.height = obj.height
    }
    if('innerRadius' in obj && this.innerRadius !== obj.innerRadius ){
      this.innerRadius = obj.innerRadius
    }
    if('outerRadius' in obj &&  this.outerRadius !== obj.outerRadius ){
      this.outerRadius = obj.outerRadius
    }
    if('majorAngle' in obj && this.majorAngle !== obj.majorAngle){
      this.majorAngle = obj.majorAngle
    }
    if('minorAngle' in obj && this.minorAngle !== obj.minorAngle){
      this.minorAngle = obj.minorAngle
    }
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
    if('circleStroke' in obj && this.circleStroke !== obj.circleStroke ){
      this.circleStroke = obj.circleStroke
    }
    if('circleStroke2' in obj && this.circleStroke2 !== obj.circleStroke2){
    this.circleStroke2 = obj.circleStroke2
    }
    if('circleStrokeWidth' in obj && this.circleStrokeWidth !== obj.circleStrokeWidth){
    this.circleStrokeWidth = obj.circleStrokeWidth
    }
    if('circleStrokeWidth2' in obj && this.circleStrokeWidth2 !== obj.circleStrokeWidth2){
    this.circleStrokeWidth2 = obj.circleStrokeWidth2
    }
    if('pathColor' in obj && this.pathColor !== obj.pathColor){
    this.pathColor = obj.pathColor
    }
    if('pathColor2' in obj && this.pathColor2 !== obj.pathColor2){
    this.pathColor2 = obj.pathColor2
    }
    if('pathWidth' in obj && this.pathWidth !== obj.pathWidth){
    this.pathWidth = obj.pathWidth
    }
    if('pathWidth2' in obj && this.pathWidth2 !== obj.pathWidth2){
    this.pathWidth2 = obj.pathWidth2
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
    
  

    // this.nodesByType
    // this.links = []
    // this.active = this
    // this.thiz = this
    this.st = true
    render()
    }
  }
  setactive(num){
    if(num!==undefined && num !==null){
      this.active = num
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
    this.da = true
    this.render()
   }
  }

  render() {
    if(this.da = true){
      this. st = true
      this.ac = true
    }
    // const {active} = this
    // console.log(active,this.active)
    
    //console.log(this);

    

    if(this.da){
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
    .style('fill', d => {
      return this.hue(d)
    })
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
      stroke: ${this.pathColor};
      stroke-width: ${this.pathWidth};
      stroke-opacity: ${this.pathStrokeOpacity};
      fill: ${this.pathFill}
    }
    .link .active{
      stroke: ${this.pathColor2};
      stroke-width: ${this.pathWidth2};
      stroke-opacity: ${this.pathStrokeOpacity2}
    }
    .yuan{
      stroke: ${this.circleStroke};
      stroke-width: ${this.circleStrokeWidth}
    }
    .yuan .active{
      stroke: ${this.circleStroke2};
      stroke-width: ${this.circleStrokeWidth2}
    }
  `)
    }
    if(this.ac){
      this.paths.selectAll('.link').classed('active',d =>  {return this.active == d})
      this.circles.selectAll('.yuan').classed('active',d=>{ return  d === this.active.source || d === this.active.target;})
      this.paths.selectAll('.link').classed('active',d=>{return d.source === this.active|| d.target === this.active})
      this.circles.selectAll('.yuan').classed('active',d=>{ return d === this.active})
    }

    this.da = false
    this.st = false
    this.ac = false     
    // this.paths.selectAll('.link').classed('active',d =>  { return this.active == d})
    // .attr('stroke-opacity',1)
    //   .attr('stroke','red')
    //   .attr('stroke-width',2+'px')    
      // .selectAll(".node circle").classed("active", p=>{ return p === this.active.source || p === this.active.target; });


    // this.circles.selectAll('.yuan').classed('active',d=>{ return  d === this.active.source || d === this.active.target;})
      // .attr('stroke',this.circleStroke2)
      // .attr('stroke-width',this.circleStrokeWidth2)
    
    
    // this.paths.selectAll('.link').classed('active',d=>{return d.source === this.active|| d.target === this.active})
    // .attr('stroke-opacity',this.pathStrokeOpacity2)
    // .attr('stroke',this.pathColor2)
    // .attr('stroke-width',this.pathWidth2) 
    // this.circles.selectAll('.yuan').classed('active',d=>{ return d === this.active})
    // .attr('stroke',this.circleStroke2)
    // .attr('stroke-width',this.circleStrokeWidth2)
    

      
    // .style('fill', this.lineColor2)
    // .style('width', this.lineWidth2
    // d3.selectAll('.link').classed('active',function(p){return d === p}))
    // .attr('stroke','red').attr('stroke-width',2+'px').attr('stroke-opacity',1)
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
    if (this.color == true && this.colors !== undefined || this.colors !== null) {
      this.nodesByType.forEach((d, i) => {
        var ss = this.colors
        d[1].forEach((e, k) => {

          e.co = []
          e.co.push(ss[i])
        })
      })
    }

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



    
    this.render()
  }
  linkMouseover(e, d) {
     this.setactive(d)
  }
  linkMouseout(e, d) {
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


d3.json('./hiv.json').then((nodes) => {
  var div = document.createElement('p')
  div.setAttribute('id', 'chart')
  document.body.appendChild(div)
  var p = new Hive({
    width: 960,
    height: 850,
    innerRadius: 40,
    outerRadius: 640,
    majorAngle: 2 * Math.PI / 3,
    minorAngle: 1 * Math.PI / 12,
    json: './hiv.json',
    father: div,
    color: true,
    colors: ['red', 'blue', 'green', 'yellow'],
    lineWidth: 2 + 'px',
    lineColor: 'black',
    lineFill: 'none',
    circleStroke: '#000',
    circleStroke2:'red',
    circleStrokeWidth:1+'px',
    circleStrokeWidth2: 3 + 'px',
    pathColor: '#999',
    pathColor2:'red',
    pathWidth: 2 + 'px',
    pathWidth2:3+'px',
    pathFill: 'none',
    pathStrokeOpacity: 0.3,
    pathStrokeOpacity2:1,
    nodes: nodes
  })
//  p.set()
 console.log(p.styles.color);

})
