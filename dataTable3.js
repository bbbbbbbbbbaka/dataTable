class GridTable{
	constructor(prams){
		this.data = prams.data,
		this.pagesize = prams.pageSize,
		this.page = prams.page,
		this.width = prams.width,
		this.height = prams.height;
		this.arr = []
		this.right = this.myCreateElement('a',{class:'right'},['→']),
		this.pan = this.myCreateElement('span',{class:'pan'}),
		this.left =this.myCreateElement('a',{class:'left',onclick:'left'},['←']),
		this.pag = 	this.myCreateElement('div',{class:'pag'},[
			this.left,
			this.pan,
			this.right
		]),
		this.dataTables_info = this.myCreateElement('div',{class:'dataTables_info'}),
		this.tab = this.myCreateElement('div',{class:'tab'}),
		this.main = this.myCreateElement('div',{class:'main'},[
			this.tab,
			this.dataTables_info,
			this.pag,
		])
		document.body.appendChild(this.main)
		this.tab.appendChild(this.fn(this.data,this.page,this.pagesize))

		// document.body.appendChild(this.fn(this.data,1,4)),
		//document.body.appendChild(
		// this.myCreateElement('div',{class:'main'},[
		// 	this.myCreateElement('div',{class:'tab'}),
		// 	this.myCreateElement('div',{class:'dataTables_info'}),
		// 		this.myCreateElement('div',{class:'pag'},[
		// 			this.myCreateElement('a',{class:'left',onclick:'left'},['←']),
		// 			this.myCreateElement('span',{class:'pan'},),
		// 			this.myCreateElement('a',{class:'right'},['→'])
		// 		])
		// 	])
		//)
	}
	
	myCreateElement(dom,arr,son){
		var div = document.createElement(dom)
		var on = /^on/
		
		if(arr !== null && arr !== undefined){
			Object.keys(arr).forEach((k,index)=>{
				console.log();
				if(on.test(k)){
					// console.log(k.substring(2,k.length+1));
					div.addEventListener(k.substring(2,k.length+1),e=>{
						console.log( parseInt((arr[k]+'()')));
					})
				}else{
					div.setAttribute(k,arr[k])
				}
				
			})
		}
		if(son !== null & son !== undefined){
			son.forEach((c,index)=>{
				if(typeof c === 'string'){
					var text=document.createTextNode(c)
					text.data = c;
					div.appendChild(text)
				}else{
					div.appendChild(c)
				}
			})
		}
		return div;
	 }	

	fn(data,page, pagesize) { /* 传过来的数据，i的值,i小于谁， */
		// tabs.innerHTML = ''
		this.data = data;
		this.page = page;
		this.pagesize = pagesize;
		let tab = document.createElement("table");
		let tr = document.createElement("tr");
		this.data.header.forEach(function(item) {
				let th = document.createElement("th");
				th.innerText = item.name;
				tr.appendChild(th);
				tab.appendChild(tr);
		}); 
		for (let i = this.page; i < this.pagesize; i++) {
				var trr = document.createElement("tr");
				for (let j = 0; j < this.data.header.length; j++) {
						var td = document.createElement("td");
						td.innerHTML = this.data.nodes[i][this.data.header[j].props];
						trr.appendChild(td);
						tab.appendChild(trr);
				}
		}
		return tab;
	}
  
}

grid1 = new GridTable({
	data: {
		header: [{
			name: "Name",
			props: "a"
	}, {
			name: "Position",
			props: "b"
	}, {
			name: "Office",
			props: "c"
	}, {
			name: "Age",
			props: "d"
	}, {
			name: "Start date",
			props: "e"
	}, {
			name: "Salary",
			props: "f"
	}, 
	{
			name: "hello",
			props: "f"
	},],
	nodes:[
	{
			a: "Airi Satou     ",
			b: "Airi Satou     ",
			c: "Airi Satou     ",
			d: "Airi Satou     ",
			e: "Airi Satou     ",
			f: "Airi Satou     ",
			g: "Airi Satou     ",
	}, {
			a: "AngelicaRamos  ",
			b: "AngelicaRamos  ",
			c: "AngelicaRamos  ",
			d: "AngelicaRamos  ",
			e: "AngelicaRamos  ",
			f: "AngelicaRamos  ",
			g: "Airi Satou     ",
	}, {
			a: "Ashton Cox     ",
			b: "Ashton Cox     ",
			c: "Ashton Cox     ",
			d: "Ashton Cox     ",
			e: "Ashton Cox     ",
			f: "Ashton Cox     ",
			g: "Airi Satou     ",
	}, {
			a: "Bradley Greer  ",
			b: "Bradley Greer  ",
			c: "Bradley Greer  ",
			d: "Bradley Greer  ",
			e: "Bradley Greer  ",
			f: "Bradley Greer  ",
			g: "Airi Satou     ",
	},
	]
	},
	pageSize: 4,
	page: 2,
	width: '100%',
	height: '100%',
	columns: [{
		text: 'Name',
		prop: 'name'
	},{
		text: 'Age',
		prop: 'age'	
	}]
},)


// document.body.appendChild(grid1.fn({
// 	header: [{
// 		name: "Name",
// 		props: "a"
// }, {
// 		name: "Position",
// 		props: "b"
// }, {
// 		name: "Office",
// 		props: "c"
// }, {
// 		name: "Age",
// 		props: "d"
// }, {
// 		name: "Start date",
// 		props: "e"
// }, {
// 		name: "Salary",
// 		props: "f"
// }, 
// {
// 		name: "hello",
// 		props: "f"
// },],
// nodes:[
// {
// 		a: "Airi Satou     ",
// 		b: "Airi Satou     ",
// 		c: "Airi Satou     ",
// 		d: "Airi Satou     ",
// 		e: "Airi Satou     ",
// 		f: "Airi Satou     ",
// 		g: "Airi Satou     ",
// }, {
// 		a: "AngelicaRamos  ",
// 		b: "AngelicaRamos  ",
// 		c: "AngelicaRamos  ",
// 		d: "AngelicaRamos  ",
// 		e: "AngelicaRamos  ",
// 		f: "AngelicaRamos  ",
// 		g: "Airi Satou     ",
// }, {
// 		a: "Ashton Cox     ",
// 		b: "Ashton Cox     ",
// 		c: "Ashton Cox     ",
// 		d: "Ashton Cox     ",
// 		e: "Ashton Cox     ",
// 		f: "Ashton Cox     ",
// 		g: "Airi Satou     ",
// }, {
// 		a: "Bradley Greer  ",
// 		b: "Bradley Greer  ",
// 		c: "Bradley Greer  ",
// 		d: "Bradley Greer  ",
// 		e: "Bradley Greer  ",
// 		f: "Bradley Greer  ",
// 		g: "Airi Satou     ",
// },
// ]
// },2,4))
// document.querySelector('.tab').appendChild(
// 	grid1.fn({
// 		header: [{
// 			name: "Name",
// 			props: "a"
// 	}, {
// 			name: "Position",
// 			props: "b"
// 	}, {
// 			name: "Office",
// 			props: "c"
// 	}, {
// 			name: "Age",
// 			props: "d"
// 	}, {
// 			name: "Start date",
// 			props: "e"
// 	}, {
// 			name: "Salary",
// 			props: "f"
// 	}, 
// 	{
// 			name: "hello",
// 			props: "f"
// 	},],
// 	nodes:[
// 	{
// 			a: "Airi Satou     ",
// 			b: "Airi Satou     ",
// 			c: "Airi Satou     ",
// 			d: "Airi Satou     ",
// 			e: "Airi Satou     ",
// 			f: "Airi Satou     ",
// 			g: "Airi Satou     ",
// 	}, {
// 			a: "AngelicaRamos  ",
// 			b: "AngelicaRamos  ",
// 			c: "AngelicaRamos  ",
// 			d: "AngelicaRamos  ",
// 			e: "AngelicaRamos  ",
// 			f: "AngelicaRamos  ",
// 			g: "Airi Satou     ",
// 	}, {
// 			a: "Ashton Cox     ",
// 			b: "Ashton Cox     ",
// 			c: "Ashton Cox     ",
// 			d: "Ashton Cox     ",
// 			e: "Ashton Cox     ",
// 			f: "Ashton Cox     ",
// 			g: "Airi Satou     ",
// 	}, {
// 			a: "Bradley Greer  ",
// 			b: "Bradley Greer  ",
// 			c: "Bradley Greer  ",
// 			d: "Bradley Greer  ",
// 			e: "Bradley Greer  ",
// 			f: "Bradley Greer  ",
// 			g: "Airi Satou     ",
// 	},
// 	]
// 	},1,2	)
// )
 var ag  = /^on/
// var ag = /^[2][0-9]{3}/
console.log(ag.test('on'));