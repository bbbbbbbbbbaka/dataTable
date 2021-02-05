class GridTable {
	constructor(prams) {
		;(this.data = prams.data), //数据
			(this.pagesize = prams.pageSize), //页面有多少行子数据
			(this.page = prams.page),
			(this.currentPage = prams.currentPage) //当前页码
		;(this.width = prams.width), (this.height = prams.height)

		// 创建dom元素
		;(this.right = this.myCreateElement('a', {class: 'right'}, ['→'])),
			(this.pan = this.myCreateElement('span', {class: 'pan'})),
			(this.left = this.myCreateElement(
				'a',
				{class: 'left', onclick: 'left'},
				['←']
			)),
			(this.pag = this.myCreateElement('div', {class: 'pag'}, [
				this.left,
				this.pan,
				this.right,
			])),
			(this.dataTables_info = this.myCreateElement('div', {
				class: 'dataTables_info',
			})),
			(this.tab = this.myCreateElement('div', {class: 'tab'})),
			(this.main = this.myCreateElement('div', {class: 'main'}, [
				this.tab,
				this.dataTables_info,
				this.pag,
			]))
		// document.body.appendChild(this.main)
		this.tab.appendChild(this.fn(this.data, this.currentPage, this.pagesize))
		this.pageation()
		this.go(this.currentPage)
		this.right.addEventListener('click',e=>{
			
			if(this.currentPage < Math.ceil(this.data.header.length / this.pagesize)-1){
				this.currentPage ++;
			this.go(this.currentPage)
			console.log(this.currentPage);
			console.log(Math.ceil(this.data.header.length / this.pagesize));
			}
		})
		this.left.addEventListener('click',e=>{
			if(this.currentPage>0){
				this.currentPage --;
			this.go(this.currentPage)
			}
		})
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
		return this.main
	}

	myCreateElement(dom, arr, son) {
		var div = document.createElement(dom)
		var on = /^on/

		if (arr !== null && arr !== undefined) {
			Object.keys(arr).forEach((k, index) => {
				console.log()
				if (on.test(k)) {
					// console.log(k.substring(2,k.length+1));
					div.addEventListener(k.substring(2, k.length + 1), (e) => {
						console.log(parseInt(arr[k] + '()'))
					})
				} else {
					div.setAttribute(k, arr[k])
				}
			})
		}
		if ((son !== null) & (son !== undefined)) {
			son.forEach((c, index) => {
				if (typeof c === 'string') {
					var text = document.createTextNode(c)
					text.data = c
					div.appendChild(text)
				} else {
					div.appendChild(c)
				}
			})
		}
		return div
	}

	// 渲染表格
	fn(data, page, pagesize) {
		/* 传过来的数据，i的值,i小于谁， */
		this.tab.innerHTML = ''
		// this.data = data
		// this.currentPage = page
		// this.pagesize = pagesize
		let tab = document.createElement('table')
		let tr = document.createElement('tr')
		this.data.header.forEach(function (item) {
			let th = document.createElement('th')
			th.innerText = item.name
			tr.appendChild(th)
			tab.appendChild(tr)
		})
		for (let i = page; i < pagesize; i++) {
			var trr = document.createElement('tr')
			for (let j = 0; j < this.data.header.length; j++) {
				var td = document.createElement('td')
				td.innerHTML = this.data.nodes[i][this.data.header[j].props]
				trr.appendChild(td)
				tab.appendChild(trr)
			}
		}
		return tab
	}
	//生成按钮
	pageation() {
		this.pan.innerHTML = ''
		// console.log(Math.ceil(this.data.header.length / this.pagesize));
		for (let i = 0;i < Math.ceil(this.data.header.length / this.pagesize);i++) {
			var span = document.createElement('a')
			span.setAttribute('index', i + 1)
			span.innerText = i + 1
			this.pan.appendChild(span)

			span.addEventListener('click', (e) => {
				this.go(i)
				// 	console.log(this.pan.children.length);
				// 	for(let j = 0; j<this.pan.children.length;j++){
				// 		this.pan.children[j].setAttribute('class','')
				// 	}
				// 	span.setAttribute('class','current')
				// 	console.log(span);
			})
			// var spans = this.pan.children;
			// console.log(typeof spans);
		}
	}

	go(page) {
		//  var currentPage = page;
		this.currentPage = page
		let spans = this.pan.children
		// let pageSize = getPageSize();
		for (let j = 0; j < spans.length; j++) {
			spans[j].setAttribute('class', '')
		}
		spans[page].setAttribute('class', 'current')
		this.tab.appendChild(this.fn(this.data,this.currentPage*this.pagesize,this.currentPage*this.pagesize+this.pagesize))
		
		// page < 5 ? spans[page].setAttribute('class', 'current') : spans[2].setAttribute('class', 'current')
		// 		var start = pageSize * page;
		// 		var end = Math.min(start + pageSize, data.nodes.length)// start + pageSize < data.nodes.length ? start + pageSize : data.nodes.length
		// 		tabs.appendChild(fn(data, end, start))
		// 		dataTables_info.innerText = 'Showing ' + start + ' to ' + end + ' of ' + data.nodes.length + ' entries'
	}

	
}

grid1 = new GridTable({
	data: {
		header: [
			{
				name: 'Name',
				props: 'a',
			},
			{
				name: 'Position',
				props: 'b',
			},
			{
				name: 'Office',
				props: 'c',
			},
			{
				name: 'Age',
				props: 'd',
			},
			{
				name: 'Start date',
				props: 'e',
			},
			{
				name: 'Salary',
				props: 'f',
			},
			{
				name: 'hello',
				props: 'g',
			},
		],
		nodes: [
			{
				a: 'Airi Satou     ',
				b: 'Airi Satou     ',
				c: 'Airi Satou     ',
				d: 'Airi Satou     ',
				e: 'Airi Satou     ',
				f: 'Airi Satou     ',
				g: 'Airi Satou     ',
			},
			{
				a: 'AngelicaRamos  ',
				b: 'AngelicaRamos  ',
				c: 'AngelicaRamos  ',
				d: 'AngelicaRamos  ',
				e: 'AngelicaRamos  ',
				f: 'AngelicaRamos  ',
				g: 'Airi Satou     ',
			},
			{
				a: 'Ashton Cox     ',
				b: 'Ashton Cox     ',
				c: 'Ashton Cox     ',
				d: 'Ashton Cox     ',
				e: 'Ashton Cox     ',
				f: 'Ashton Cox     ',
				g: 'Airi Satou     ',
			},
			{
				a: 'Bradley Greer  ',
				b: 'Bradley Greer  ',
				c: 'Bradley Greer  ',
				d: 'Bradley Greer  ',
				e: 'Bradley Greer  ',
				f: 'Bradley Greer  ',
				g: 'Airi Satou     ',
			},
			{
				a: 'Bradley Greer  ',
				b: 'Bradley Greer  ',
				c: 'Bradley Greer  ',
				d: 'Bradley Greer  ',
				e: 'Bradley Greer  ',
				f: 'Bradley Greer  ',
				g: 'Airi Satou     ',
			},
			{
				a: 'Bradley Greer  ',
				b: 'Bradley Greer  ',
				c: 'Bradley Greer  ',
				d: 'Bradley Greer  ',
				e: 'Bradley Greer  ',
				f: 'Bradley Greer  ',
				g: 'Airi Satou     ',
			},
			{
				a: 'Bradley Greer  ',
				b: 'Bradley Greer  ',
				c: 'Bradley Greer  ',
				d: 'Bradley Greer  ',
				e: 'Bradley Greer  ',
				f: 'Bradley Greer  ',
				g: 'Airi Satou     ',
			},
			{
				a: 'Bradley Greer  ',
				b: 'Bradley Greer  ',
				c: 'Bradley Greer  ',
				d: 'Bradley Greer  ',
				e: 'Bradley Greer  ',
				f: 'Bradley Greer  ',
				g: 'Airi Satou     ',
			},
			{
				a: 'Bradley Greer  ',
				b: 'Bradley Greer  ',
				c: 'Bradley Greer  ',
				d: 'Bradley Greer  ',
				e: 'Bradley Greer  ',
				f: 'Bradley Greer  ',
				g: 'Airi Satou     ',
			},
		],
	},
	pageSize: 2,
	page: 0,
	width: '100%',
	height: '100%',
	currentPage: 0,
	columns: [
		{
			text: 'Name',
			prop: 'name',
		},
		{
			text: 'Age',
			prop: 'age',
		},
	],
})
document.body.appendChild(grid1)
