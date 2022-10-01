<template>
	<view>
		<view class="db-info">
			<view>
				数据库名:{{dbName}}
			</view>
			<view>
				表名：{{dbTable}}
			</view>
		</view>
		<view class="btn-box">
			<button @click="openSQL">打开数据库</button>
			<button @click="closeSQL">关闭数据库</button>
		</view>
		<view class="btn-box">
			<button @click="createTable">创建表</button>
			<button class="special-btn" @click="deleteTable">删除数据表</button>
		</view>
		<view class="btn-box">
			<button @click="insertTableData">新增表数据</button>
			<button @click="selectTableData">查询表数据</button>
			<button @click="updateTableData">修改表数据</button>
			<button @click="deleteTableData">按条件删除表数据</button>
		</view>
 
		<view class="table-content">
			<view class="table-header">
				<view class="header-info">名字</view>
				<view class="header-info">内容</view>
				<view class="header-info">时间</view>
			</view>
			<view class="table-body-item" v-for="(item,index) in listData" :key='index'>
				<view class="body-item-info">{{item.name}}</view>
				<view class="body-item-info">{{item.content}}</view>
				<view class="body-item-info">{{item.time}}</view>
			</view>
			
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				listData: [],
				dbName: 'chat', // 数据库名称
				dbPath: '_doc/chat.db', // 数据库地址,推荐以下划线为开头   _doc/xxx.db,_doc是相对路径的应用私有文档目录
			dbTable:'chat' //表名
			};
		},
		onLoad() {
			this.openSQL();
		},
 
		methods: {
			isOpen() {
			  // 数据库打开了就返回 true,否则返回 false
			  let open = plus.sqlite.isOpenDatabase({
			    name: this.dbName,  // 数据库名称
			    path: this.dbPath  // 数据库地址
			  })
			  return open;
			},
			// 打开数据库
			openSQL() {
				let open = this.isOpen();// 查询是否打开数据库
				if (!open) {
					plus.sqlite.openDatabase({//如果数据库存在则打开，不存在则创建。
					  name: this.dbName,
					  path: this.dbPath,
					  success:(e) =>{
						this.showToast("数据库已打开");
					  },
					  fail:(e) =>{
						  this.showToast("数据库开启失败");
					  }
					})
				}else{
					this.showToast("数据库已打开");
				}
			},
			// 关闭数据库
			closeSQL() {
				let open = this.isOpen();
				if (open) {
					plus.sqlite.closeDatabase({//完成数据库操作后，必须关闭数据库，否则可能会导致系统资源无法释放。
					  name: this.dbName,
					  success:(e) =>{
						this.showToast("数据库已关闭");
					  },
					  fail:(e) =>{
						this.showToast("数据库关闭失败");
					  }
					})
				}
			},
			// 创建表
			createTable() {
				let open = this.isOpen();
				if (open) {
					let sql =
						'"id" INTEGER PRIMARY KEY AUTOINCREMENT,"name" text,"content" text,"time" text';
						plus.sqlite.executeSql({//executeSql 执行增删改等操作的SQL语句
						  name: this.dbName,
						  sql: `CREATE TABLE IF NOT EXISTS ${this.dbTable}(${sql})`,
						  success:(e) =>{
						    console.log(e)
						    this.showToast("创建chat表成功");
						  },
						  fail:(e) =>{
							  console.log(e)
						    this.showToast("创建表失败");
						  }
						})
				} else {
					this.showToast("数据库未打开");
				}
			},
			//删除表
			deleteTable() {
				let sql = `DROP TABLE IF EXISTS ${this.dbTable}`;
				plus.sqlite.executeSql({
				  name: this.dbName,
				  sql: sql,
				  success:(e) =>{
					this.showToast("删除表成功");
					this.listData = []
				  },
				  fail:(e) =>{
					  console.log(e)
					this.showToast("删除表失败");
				  }
				})
			},
			// 新增表数据
			insertTableData() {
				let open = this.isOpen();
				if (open) {
					let arr = [{
							name: '张三',
							content: "test_1"
						},
						{
							name: '李四',
							content: "test_2"
						}
					]
					arr.map(item => {
						let time = this.formatDate(new Date().getTime());
						let data = `'${item.name}','${item.content}','${time}'`;
						let condition = "'name','content','time'";
						let sql = `INSERT INTO ${this.dbTable} (${condition}) VALUES(${data})`;
						plus.sqlite.executeSql({
						  name: this.dbName,
						  sql: sql,
						  success:(e) =>{
							this.showToast("新增数据成功");
							this.selectTableData();
						  },
						  fail:(e) =>{
							  console.log(e)
							this.showToast("新增数据失败");
						  }
						})
					})
				} else {
					this.showToast("数据库未打开");
				}
			},
			// 查询表数据
			selectTableData() {
				let open = this.isOpen();
				if (open) {
					let sql = `SELECT * FROM ${this.dbTable}`;
					plus.sqlite.selectSql({
					  name: this.dbName,
					  sql: sql,
					  success:(e) =>{
						console.log("表数据:", e);
						this.listData = e;
					  },
					  fail:(e) =>{
						console.log("查询失败", e);
					  }
					})
				} else {
					this.showToast("数据库未打开");
				}
			},
			// 修改表数据
			updateTableData() {
				let open = this.isOpen();
				if (open) {
					let time = this.formatDate(new Date().getTime());
					let data = `content = '内容修改，更新时间',time = '${time}'`;
					let sql = `UPDATE ${this.dbTable} SET ${data} WHERE name = '张三'`;
					plus.sqlite.executeSql({
					  name: this.dbName,
					  sql: sql,
					  success:(e) =>{
					    this.showToast("修改表数据成功");
					    this.selectTableData();
					  },
					  fail:(e) =>{
					    console.log("修改失败", e);
					  }
					})
				} else {
					this.showToast("数据库未打开");
				}
			},
			// 删除表数据
			deleteTableData() {
				let open = this.isOpen();
				if (open) {
					let sql = `DELETE FROM ${this.dbTable} WHERE name = '李四'`;
					plus.sqlite.executeSql({
					  name: this.dbName,
					  sql: sql,
					  success:(e) =>{
					    this.showToast("删除表数据成功");
					    this.selectTableData();
					  },
					  fail:(e) =>{
					    console.log("删除失败", e);
					  }
					})
				} else {
					this.showToast("数据库未打开");
				}
			},
			// 提示框
			showToast: function(str) {
				uni.showToast({
					icon: "none",
					title: str,
					mask: true
				});
			},
			// 时间戳转年月日
			formatDate(data) {
				let now = new Date(data);
				var year = now.getFullYear(); //取得4位数的年份
				var month =
					now.getMonth() + 1 < 10 ?
					"0" + (now.getMonth() + 1) :
					now.getMonth() + 1;
				var date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
				var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
				var minute =
					now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
				var second =
					now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
				return (
					year +
					"-" +
					month +
					"-" +
					date +
					" " +
					hour +
					":" +
					minute +
					":" +
					second
				);
			}
		}
	};
</script>
 
<style lang="scss" scoped>
	.btn-box{
		width: 100%;	
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		button{
			width: 45%;
			margin: 1% 2%;
		}
		.special-btn{
			background-color: cornflowerblue;
			color: #fff;
		}
	}
	
	.table-content{
		width: 100%;
		padding: 0 10px;
		.table-header,.table-body-item{
			width: 100%;
			display: flex;
			.header-info,.body-item-info{
				// height: 32px;
				border-right: 1px solid #dedede;
				padding-left: 5px;
				line-height: 32px;
			}
			.header-info:nth-child(1), .body-item-info:nth-child(1){
				width: 30%;
			}
			.header-info:nth-child(2), .body-item-info:nth-child(2){
				width: 50%;
			}
			.header-info:last-child, .body-item-info:last-child{
				width: 20%;
			}
		}
		.table-header{
			border: 1px solid #dedede;
			border-right: none;
		}
		.table-body-item{
			border-bottom: 1px solid #dedede;
		}
	}
</style>