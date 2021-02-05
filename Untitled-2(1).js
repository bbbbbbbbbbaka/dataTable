/**
 * 表格组件
 */
class Table {
  constructor(params) {
    this.table = document.createElement("table");
    this.header = document.createElement("thead");
    this.body = document.createElement("tbody");
    this.foot = document.createElement("tfoot");
    this.columns = params.columns;
    this.data = params.data;
    this.pageSize = params.pageSize;
    this.page = page;
  }

  setData(data) {
    this.data = data;
    this.render();
  }
  setColumns(columns) {
    this.columns = columns;
    this._renderTable();
  }
  setPage(page) {
    this.page = page;
    this.render();
  }
  setPageSize(pageSize) {
    this.pageSize = pageSize;
    this.render();
  }

  render() {
    this._renderTable();
    this._renderPaging();
  }

  // 渲染页码
  _renderPaging() {
    //...
  }
  // 渲染表格
  _renderTable() {
    const { page, pageSize, columns } = this,
      data = this.data.slice(page * pageSize, (page + 1) * pageSize),
      header = document.createElement("tr");
    this.header.innerHTML = "";
    this.body.innerHTML = "";
    columns.forEach(column => {
      const c = document.createElement("td");
      c.innerText = column.name;
      header.appendChild(c);
    });
    this.header.appendChild(header);
    data.forEach(d => {
      const row = document.createElement("tr");
      columns.forEach(c => {
        const c = document.createElement("td");
        c.innerText = d[c.prop];
        row.appendChild(c);
      });
      this.body.appendChild(row);
    });
  }
}

// example


const table1 = new Table({
  pageSize: 10,
  page: 0,
  columns: [
    //...
  ],
  data: [
    //...
  ]
});
document.body.appendChild(table1);
// table1.setPage(1)

const table2 = new Table({
  pageSize: 20,
  page: 0,
  columns: [
    //...
  ],
  data: [
    //...
  ]
});
document.body.appendChild(table2);
