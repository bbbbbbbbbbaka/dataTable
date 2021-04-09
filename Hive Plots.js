class Hive {
  constructor(parms) {
    this.father_d = parms.father
      this.father_d.setAttribute('style','display:inline-block; width:70%; height:90%; position:absolute; top:50%; left:50%;transform:translate(-50%,-50%); ')
      this.father_d.setAttribute('id', 'chart')
      this.father_d.setAttribute('display', 'inline-block')
      this.info = document.createElement('p')
      this.info.setAttribute('id','info')
      this.father_d.appendChild(this.info)
      this.info.innerText = 'Loding...'
    this.width_d = this.father_d.clientWidth
    this.height_d = this.father_d.clientHeight
    this.majorAngle_d = 2 * Math.PI / 3
    this.minorAngle_d = 1 * Math.PI / 12
      // this.width = parms.width
      // this.height = parms.height
    //   this.innerRadius_d = parms.innerRadius
    // this.outerRadius_d = parms.outerRadius
    this.innerRadius_d = this.height_d*.044
    this.outerRadius_d = this.width_d*.45
    this.nodes_d = parms.nodes
    this.nodesByType_d
    this.links_d = []
    // this.majorAngle = parms.majorAngle
    // this.minorAngle = parms.minorAngle
    // this.color(parms.color) 
    this.yanse_s = parms.yanse
    this.lineWidth_s = parms.lineWidth
    this.lineColor_s = parms.lineColor
    this.lineFill_s = parms.lineFill
    this.circleStroke_s = parms.circleStroke
    this.circleHoverStroke_s = parms.circleHoverStroke
    this.circleStrokeWidth_s = parms.circleStrokeWidth
    this.circleStrokHoverWidth_s = parms.circleStrokHoverWidth
    this.pathColor_s = parms.pathColor
    this.pathHoverColor_s = parms.pathHoverColor
    this.pathWidth_s = parms.pathWidth
    this.pathHoverWidth_s = parms.pathHoverWidth
    this.pathFill_s = parms.pathFill
    this.pathStrokeOpacity_s = parms.pathStrokeOpacity
    this.pathStrokeHoverOpacity2_s = parms.pathStrokeHoverOpacity2_s
    this.d = /_d$/
    this.s = /_s$/
    this.active
    this.thiz = this
    this.da = true
    this.ac = false
    this.st = false
    this.formatNumber = d3.format(',d')
    this.defaultInfo;
    this.svg = d3.select("#chart").append("svg")
      .attr("width", this.width_d)
      .attr("height", this.height_d)
      .append("g")

    this.style = this.svg.append('style')
    this.lines = this.svg.append('g')
    this.paths = this.svg.append('g')
    this.circles = this.svg.append('g')
    this.angle = d3.scaleOrdinal()
      .domain(["source", "source-target", "target-source", "target"])
      .range([0, this.majorAngle_d - this.minorAngle_d, this.majorAngle_d + this.minorAngle_d, 2 * this.majorAngle_d]);
    this.radius = d3.scaleLinear()
    this.info = d3.select("#info")
      .text(this.defaultInfo = "Showing " + this.formatNumber(this.links_d.length) + " dependencies among " + this.formatNumber(this.nodes_d.length) + " classes.");

    this.linkMouseover = this.linkMouseover.bind(this)
    this.linkMouseout = this.linkMouseout.bind(this)
    this.nodeMouseover = this.nodeMouseover.bind(this)
    
    this.main()

    this.proxy = new Proxy(this, {
      get(target, prop) {
        return prop
      },
      set: (target, prop, value) => {
        if (this.prop !== value) {
          target[prop] = value
          if (this.d.test(prop)) {
            this.da = true
            this.render()
          } else if (this.s.test(prop)) {
            this.st = true
            this.render()
          }
        }
        return true
      }
    })

    window.addEventListener('resize',e=>{
      this.proxy.father_d = parms.father
      this.proxy.width_d = this.father_d.clientWidth
      this.proxy.father_d = this.father_d.clientHeight
      this.proxy.innerRadius_d = this.height_d*.047
      this.proxy.outerRadius_d = this.width_d*.45
    })
    console.log(0.0 === 0.0000000000)
  }
  
  
  // set(obj){
  //   for(let item in this){
  //      if(item in obj){
  //        if(this[item] === obj[item]){
  //          return
  //        }else if(this[item] !== obj[item] && obj[item]!== undefined&&obj[item] !== null){
  //          this[item] = obj[item]     
  //          if(this.d.test(Object.keys(obj)[0])){//this.d = / -d$/
  //           console.log(obj)
  //            this.da = true
  //          }else if(this.s.test(Object.keys(obj)[0])){//this.s = / -s$/
  //           console.log(obj)
  //            this.st =true
  //          }
  //          this.render()
  //          return
  //        }
  //      }
  //   }
  // }

  setactive(d) {
    if (d !== undefined && d !== null) {
      this.active = d
      this.ac = true
      this.render()
    }
  }

  render() {

    if (this.da == true) {
      this.st = true
    }
    if (this.da) {
      this.radius.range([this.innerRadius_d, this.outerRadius_d])
      this.svg
        .attr("transform", "translate(" + this.outerRadius_d * .75 + "," + this.outerRadius_d * .65 + ")");

      //绘制轴
      this.lines
        .attr('class', 'lines')
        .selectAll(".axis")
        .data(this.nodesByType_d, )
        .join('line')
        .style('fill',d=>{return this.lineFill_s()})
        .style('width',d=>{return this.lineWidth_s()})
        .style('stroke',d=>{return this.lineColor_s()})
        .attr("class", "axis")
        .attr("transform", d => {return "rotate(" + this.degrees(this.angle(d[0])) + ")";})
        .attr("x1", this.radius(-2))
        .attr("x2", d => {return this.radius(d.count + 2);})

      this.paths
        .attr('class', 'links')
        .selectAll('.link')
        .data(this.links_d)
        .join('path')
        .attr('class', 'link')
        .style('stroke', d => {return this.pathColor_s()})
        .style('stroke-width',d=>{return this.pathWidth_s()})
        .style('fill',d=>{return this.pathFill_s()})
        .style('stroke-opacity',d=>{return this.pathStrokeOpacity_s()})
        .attr('d', this.link()
          .angle(d => {return this.angle(d.type)})
          .radius(d => {return this.radius(d.node.index)})
        )
        .on('mouseover', this.linkMouseover)
        .on('mouseout', this.linkMouseout)

      this.circles
        .attr('class', 'nodes')
        .selectAll('.node')
        .data(this.nodes_d)
        .join('g')
        .attr('class', 'node')
        .style('fill', d => {return this.yanse_s(d)})
        .style('stroke', d => {return this.circleStroke_s(d)})
        .selectAll('circle')
        .data(d => {return d.connectors})
        .join('circle')
        .style('stroke-width',d=>{return this.circleStrokeWidth_s()})
        .attr('transform', d => {return 'rotate(' + this.degrees(this.angle(d.type)) + ')'})
        .attr('cx', d => {return this.radius(d.node.index)})
        .attr('r', 4)
        .attr('class', 'yuan')
        .on('mouseover', this.nodeMouseover)
        .on('mouseout', this.linkMouseout)
    }

    if (this.st) {
      this.style.text(`
    .axis{
      stroke: ${'#000'};
      stroke-width: ${2+'px'};
      fill: ${'none'}
    }
    .link{
      stroke: ${'#999'};
      stroke-width: ${2+'px'};
      stroke-opacity: ${0.3};
      fill: ${'none'}
    }
    .link.active{
      stroke: ${this.pathHoverColor_s} ${'!important'};
      stroke-width: ${this.pathHoverWidth_s} ${'!important'} ;
      stroke-opacity: ${this.pathStrokeHoverOpacity2_s} ${'!important'};
    }
    .yuan{
      
      stroke-width: ${1+'px'}
    }
    .yuan.active{
      stroke: ${this.circleHoverStroke_s} ${'!important'};
      stroke-width: ${this.circleStrokHoverWidth_s} ${'!important'};
    }
    .node{
      fill: ${'red' }
    }
     `)
    }
    if (this.ac) {
      this.paths.selectAll('.link').classed('active', d => {
        if (this.active === d) {
          d3.select('#info').text(d.source.node.name + " → " + d.target.node.name);
          return true
        } else if (d.source === this.active || d.target === this.active) {
          return true
        }
        return false
      })
      this.circles.selectAll('.yuan').classed('active', d => {
        if (d === this.active.source || d === this.active.target) {

          return true;
        } else if (d === this.active) {
          d3.select('#info').text(d.node.name);
          return true;
        }
        return false
      })
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
    this.nodes_d.forEach(d => {
      d.connectors = [];
      d.packageName = d.name.split('.')[1] //取以点分割的第二个字符串
      nodesByName[d.name] = d //创建对象，对象的名字是d.name,对象的内容是d
      //现在nodes里面的每个对象都多了两个新参数
    })
    // console.log(nodesByName);

    this.nodes_d.forEach(source => {
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
        this.links_d.push({
          source: source.source,
          target: target.target
        })
      })
    })

    // Determine the type of each node, based on incoming and outgoing links. 根据传入和传出链接确定每个节点的类型。
    this.nodes_d.forEach(node => {
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

    this.nodesByType_d = d3.groups(this.nodes_d, d => d.type)
      //.data(d=>{return d.type;})//key函数将d 以d.type为类别进行分组(实际为3组)
      //.sortKeys(d3.ascending)//nest.sortKeys（）函数用于按特定顺序（即升序或降序）对键进行排序。d3.ascending表示升序
      .sort((a, b) => {
        return a.count - b.count
      })
    //.entries(nodes);//nest.entries()返回一个键值对的数组

    // Duplicate the target-source axis as source-target. 将target-source轴复制为source-target
    this.nodesByType_d.push(['source-target', this.nodesByType_d[1][1]])

    // Compute the rank for each type, with padding between packages. 计算每种类型的等级，并在包之间填充
    this.nodesByType_d.forEach(type => { //遍历nodesByType
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
    this.radius.domain(d3.extent(this.nodes_d, d => {
      return d.index
    }));

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
  //div.setAttribute('id', 'chart')
  //div.setAttribute('display', 'inline-block')
  // div.setAttribute('style', 'display:inline-block; width:70%; height:90%; position:absolute; top:50%; left:50%;transform:translate(-50%,-50%);')

  document.body.appendChild(div)
  var p = new Hive({
    // width: 960,
    // height: 850,
    //innerRadius: 40,
    //outerRadius: 620,
    // majorAngle: 2 * Math.PI / 3,
    // minorAngle: 1 * Math.PI / 12,
    father: div,
    yanse: d => {
      var ab = d3.scaleOrdinal()
        .domain(["source", "source-target", "target-source", "target"])
        .range(['red', 'blue', 'yellow', 'green']);
      return ab(d.type)
    },

    lineWidth: d=>{return 2 + 'px'},
    lineColor: d=>{return '#000'},
    lineFill:d=>{return 'none'},
    circleStroke: d => {
      return 'black'
    },
    circleHoverStroke: '#ff0000',
    circleStrokeWidth: d=>{return 1 + 'px'},
    circleStrokHoverWidth: 3 + 'px',
    pathColor: d => {
      return `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},0)`
    },
    pathHoverColor: '#ff0000',
    pathWidth:d=>{return 2+'px'},
    pathHoverWidth: 2 + 'px',
    pathFill: d=>{return 'none'},
    pathStrokeOpacity: d=>{return 0.3},
    pathStrokeHoverOpacity2_s: 1,
    nodes: nodes,
  })
  {
  // console.log(Object.keys(p),Object.values(p),p);
  // const gui = new dat.GUI()
  // gui.add(p,'outerRadius',0,620).onFinishChange(e=>{
  //   p.setdata({outerRadius:p.outerRadius})
  // })
  // gui.add(p,'innerRadius',0,40).onFinishChange(e=>{
  //   p.setdata({innerRadius:p.innerRadius})
  // })
  // gui.add(p,'lineWidth').onFinishChange(e=>{
  //   p.setstyles({'linewidth':p.linewidth})
  // })
  // gui.addColor(p,'lineColor').onChange(e=>{
  //   p.setstyles({'lineColor':p.lineColor})
  // })
  // // gui.addColor(p,'pathColor').onFinishChange(e=>{
  // //   p.setstyles({'pathColor':p.pathColor})
  // // })
  // gui.addColor(p,'pathHoverColor').onFinishChange(e=>{
  //   p.setstyles({'pathHoverColor':p.pathHoverColor})
  // })
  // gui.add(p,'pathWidth',0,10).onFinishChange(e=>{
  //   p.setstyles({'pathWidth':p.pathWidth})
  // })
  // gui.add(p,'pathHoverWidth',10).onFinishChange(e=>{
  //   p.setstyles({'pathHoverWidth':p.pathHoverWidth})
  // })
  // gui.add(p,'pathStrokeOpacity',0,1).onChange(e=>{
  //   p.setstyles({'pathStrokeOpacity':p.pathStrokeOpacity})
  // })
  // // gui.addColor(p,'circleStroke').onChange(e=>{
  // //   p.setstyles({'circleStroke':p.circleStroke})
  // // })
  // gui.addColor(p,'circleHoverStroke').onFinishChange(e=>{
  //   p.setstyles({'circleHoverStroke':p.circleHoverStroke})
  // })
  // gui.add(p,'circleStrokeWidth').onFinishChange(e=>{
  //   p.setstyles({'circleStrokeWidth':p.circleStrokeWidth})
  // })
  // gui.add(p,'circleStrokHoverWidth').onFinishChange(e=>{
  //   p.setstyles({'circleStrokHoverWidth':p.circleStrokHoverWidth})
  // })
  }
})
