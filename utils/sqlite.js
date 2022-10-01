let dbName = "lichen"
let sqlite = {

	// 打开数据库
	openSQL: function() {
		let open = this.isOpen(); // 查询是否打开数据库
		if (!open) {
			plus.sqlite.openDatabase({ //如果数据库存在则打开，不存在则创建。
				name: dbName, //数据库名称
				path: "_doc/" + dbName + ".db", //数据库地址，uniapp推荐以下划线为开头，这到底存在哪里去了，我也不清楚，哈哈
				success: (e) => {
					this.showToast("数据库已打开");
				},
				fail: (e) => {
					this.showToast("数据库开启失败");
				}
			})
		} else {
			this.showToast("数据库已打开");
		}
	},

	// 创建表
	createTable: function() {
		let open = this.isOpen();
		if (open) {
			let sql =
				'"id" INTEGER PRIMARY KEY AUTOINCREMENT,"name" text,"content" text,"time" text';
			plus.sqlite.executeSql({ //executeSql 执行增删改等操作的SQL语句
				name: dbName,
				sql: "create table if not exists lichen_BaZi (\n" +
					"id                   INT not null,\n" +
					"rank                 INT,\n" +
					"relation             VARCHAR(50),\n" +
					"name                 VARCHAR(50),\n" +
					"sex                  VARCHAR(5)                      default '0',\n" +
					"birthday             VARCHAR(30),\n" +
					"isLunar              VARCHAR(1)                      default '0',\n" +
					"isAccurate           VARCHAR(50),\n" +
					"idLeapMonth          VARCHAR(1)                      default '0',\n" +
					"province             VARCHAR(30),\n" +
					"provinseCode         VARCHAR(20),\n" +
					"city                 VARCHAR(30),\n" +
					"cityCode             VARCHAR(20),\n" +
					"remarks              LONG VARCHAR,\n" +
					"analyse              LONG VARCHAR,\n" +
					"addTime              VARCHAR(30),\n" +
					"tag                  VARCHAR(50),\n" +
					"primary key (id)\n" +
					");",

				// "create table if not exists lichen_Experience (\n" +
				// "id                   INT                            not null,\n" +
				// "userId               INT,\n" +
				// "year                 INT,\n" +
				// "forecast             LONG VARCHAR,\n" +
				// "feedback             LONG VARCHAR,\n" +
				// "addTime              DATE,\n" +
				// "updateTime           DATE,\n" +
				// // "primary key (id),\n" +
				// // "foreign key (userId)\n" +
				// // "      references lichen_BaZi (id)\n" +
				// ");\n" +

				// "create table if not exists lichen_notes (\n" +
				// "id                   INT                            not null,\n" +
				// "title                VARCHAR(50),\n" +
				// "addDate              DATE,\n" +
				// "classify             VARCHAR(50),\n" +
				// "updateTime           DATE,\n" +
				// "mainText             LONG VARCHAR,\n" +
				// "tag                  VARCHAR(100),\n" +
				// "primary key (id)\n" +
				// ");",
				success: (e) => {
					console.log(e)
					this.showToast("创建表成功");
				},
				fail: (e) => {
					console.log(e)
					this.showToast("创建表失败");
				}
			})
		} else {
			this.showToast("数据库未打开");
		}
	},
	// ---------------------------------------------------插入数据-----------------------------------------------------------------
	//向表格里添加数据
	//根据表格的列来添加信息
	//因为list列我设为自动增加，所以不用添加数据
	//values里是传过来要存的值，我这里是动态的，单引号加双引号拼接
	// addBazi: function(dataList) {
	// 	//判断有没有传参
	// 	if (dataList) {
	// 		//判断传的参是否有值
	// 		let b = JSON.stringify(dataList) === "[]";
	// 		if (!b) {
	// 			// 传过来的list循环遍历插入表中
	// 			for (let item of dataList) {
	// 				//obj传来的参数对象
	// 				let id = item.id;
	// 				let rank = item.rank || "";
	// 				let relation = item.relation || "";
	// 				let name = item.name || "";
	// 				let sex = item.sex || "";
	// 				let birthday = item.birthday || "";
	// 				let isLunar = item.isLunar || "";
	// 				let isAccurate=item.isAccurate|| "";
	// 				let isLeapMonth = item.isLeapMonth || ""; 
	// 				let province = item.province || "";
	// 				let provinseCode = item.provinseCode || ""; 
	// 				let city = item.city || ""; 
	// 				let cityCode = item.cityCode || ""; 
	// 				let remarks = item.remarks || ""; 
	// 				let analyse = item.analyse || ""; 
	// 				let addTime = item.addTime || ""; 
	// 				let tag = item.tag || ""; 
	// 				plus.sqlite.executeSql({
	// 					name: dbName,
	// 					sql: "insert into lichen_BaZi(rank,relation,name,sex,birthday,isLunar,isAccurate,isLeapMonth,province,provinseCode,city,cityCode,remarks,analyse,addTime,tag) " +
	// 						'values("' +
	// 						rank +
	// 						'","' +
	// 						relation +
	// 						'","' +
	// 						name +
	// 						'","' +
	// 						sex +
	// 						'","' +
	// 						birthday +
	// 						'","' +
	// 						isLunar +
	// 						'","' +
	// 						isAccurate +
	// 						'","' +
	// 						isLeapMonth +
	// 						'","' +
	// 						province +
	// 						'","' +
	// 						provinseCode +
	// 						'","' +
	// 						city +
	// 						'","' +
	// 						cityCode +
	// 						'","' +
	// 						remarks +
	// 						'","' +
	// 						analyse +
	// 						'","' +
	// 						addTime +
	// 						'","' +
	// 						tag +
	// 						'")',
	// 					success(e) {
	// 						resolve(e);
	// 					},
	// 					fail(e) {
	// 						reject(e);
	// 					},
	// 				});
	// 			}
	// 			return new Promise((resolve, reject) => {
	// 				reject("成功添加");
	// 			});
	// 		} else {
	// 			return new Promise((resolve, reject) => {
	// 				reject("错误添加");
	// 			});
	// 		}
	// 	} else {
	// 		return new Promise((resolve, reject) => {
	// 			reject("错误添加");
	// 		});
	// 	}
	// },
	// 新增表数据
	addBazi(arr) {
		console.log(arr.length)
		if (arr.length && arr.length > 0) {
			return new Promise((resolve, reject) => {
				let open = this.isOpen();
				if (open) {
					arr.map(item => {
						console.log(item)
						let rank = item.rank || "";
						let relation = item.relation || "";
						let name = item.name || "";
						let sex = item.sex || "";
						let birthday = item.birthday || "";
						let isLunar = item.isLunar || "";
						let isAccurate = item.isAccurate || "";
						let isLeapMonth = item.isLeapMonth || "";
						let province = item.province || "";
						let provinseCode = item.provinseCode || "";
						let city = item.city || "";
						let cityCode = item.cityCode || "";
						let remarks = item.remarks || "";
						let analyse = item.analyse || "";
						let addTime = item.addTime || "";
						let tag = item.tag || "";
						let sql =
							"insert into lichen_BaZi(rank,relation,name,sex,birthday,isLunar,isAccurate,isAccurate,isLeapMonth,province,provinseCode,city,cityCode,remarks,analyse,addTime,tag) " +
							'values(' +
							rank +
							',"' +
							relation +
							'","' +
							name +
							'","' +
							sex +
							'","' +
							birthday +
							'","' +
							isLunar +
							'","' +
							isAccurate +
							'","' +
							isAccurate +
							'","' +
							isLeapMonth +
							'","' +
							province +
							'","' +
							provinseCode +
							'","' +
							city +
							'","' +
							cityCode +
							'","' +
							remarks +
							'","' +
							analyse +
							'","' +
							addTime +
							'","' +
							tag +
							'")';
						console.log(sql)
						plus.sqlite.executeSql({
							name: dbName,
							sql: sql,
							success: (e) => {
								this.showToast("新增数据成功");
								resolve(true)
							},
							fail: (e) => {

								this.showToast("新增数据失败");
								reject(false)
							}
						})
					})
				} else {
					this.showToast("数据库未打开");
				}
			})

		}

	},

	// ---------------------------------------------------查询数据-----------------------------------------------------------------
	//查询获取数据库里的数据
	//根据传过来的值来获取信息，我这里写了可以有两个条件来获取，都是动态的
	//第一个参数为表格名，aa,bb分别为列名和列的值 ， cc,dd同前面
	//传的参数按1,3,5来传，传一个，传三个，传五个参数，不能只传两个或者四个
	queryBazi: function(name, aa, bb, cc, dd) {
		if (name !== undefined) {
			//第一个是表单名称，后两个参数是列表名，用来检索
			if (aa !== undefined && cc !== undefined) {
				//两个检索条件
				var sql =
					"select * from " +
					name +
					" where " +
					aa +
					"=" +
					bb +
					" and " +
					cc +
					"=" +
					dd +
					"";
			}
			if (aa !== undefined && cc == undefined) {
				//一个检索条件
				var sql = "select * from " + name + " where " + aa + "=" + bb + "";
			}
			if (aa == undefined) {
				var sql = "select * from " + name + "";
			}
			return new Promise((resolve, reject) => {
				plus.sqlite.selectSql({
					name: dbName,
					sql: sql,
					success(e) {
						resolve(e);
					},
					fail(e) {
						reject(e);
					},
				});
			});
		} else {
			return new Promise((resolve, reject) => {
				reject("错误查询");
			});
		}
	},

	// ---------------------------------------------------删除数据-----------------------------------------------------------------
	//删除数据库里的数据
	//参数跟上面查询获取数据一样
	//传的参数按1,3,5来传，传一个，传三个，传五个参数，不能只传两个或者四个
	deleteBazi: function(id) {
		if (id !== undefined) {


			//一个检索条件
			var sql = "delete from " + name + " where " + sol + '="' + qq + '"';

			return new Promise((resolve, reject) => {
				plus.sqlite.executeSql({
					name: dbName,
					sql: sql,
					success(e) {
						resolve(e);
					},
					fail(e) {
						reject(e);
					},
				});
			});
		} else {
			return new Promise((resolve, reject) => {
				reject("错误删除");
			});
		}
	},
	//删除表
	deleteTable() {
		let sql = `DROP TABLE IF EXISTS lichen_BaZi`;
		plus.sqlite.executeSql({
			name: this.dbName,
			sql: sql,
			success: (e) => {
				this.showToast("删除表成功");

			},
			fail: (e) => {
				console.log(e)
				this.showToast("删除表失败");
			}
		})
	},
	// 查询表数据
	selectAllBazi() {
		let open = this.isOpen();
		if (open) {
			return new Promise((resolve, reject) => {
				let sql = `SELECT * FROM lichen_BaZi`;
				plus.sqlite.selectSql({
					name: dbName,
					sql: sql,
					success: (e) => {
						console.log("表数据:", e);
						resolve(e)
					},

					fail: (e) => {
						console.log("查询失败", e);
						reject('')
					}
				})
			})

		} else {
			this.showToast("数据库未打开");
		}
	},

	// ---------------------------------------------------关闭数据库-----------------------------------------------------------------

	// 关闭数据库
	closeSQL: function() {
		let open = this.isOpen();
		if (open) {
			plus.sqlite.closeDatabase({ //完成数据库操作后，必须关闭数据库，否则可能会导致系统资源无法释放。
				name: dbName,
				success: (e) => {
					this.showToast("数据库已关闭");
				},
				fail: (e) => {
					this.showToast("数据库关闭失败");
				}
			})
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
	// ---------------------------------------------------监听数据库是否开启-----------------------------------------------------------------
	//监听数据库是否开启

	isOpen: function() {
		// 数据库打开了就返回 true,否则返回 false
		let open = plus.sqlite.isOpenDatabase({
			name: dbName, // 数据库名称
			path: "_doc/" + dbName + ".db" // 数据库地址
		})
		return open;
	},

};

//把这些方法导出去
export default sqlite;
