<template>
	<div class="sqlite">
		<div @click="open">open</div>
		<div @click="close">close</div>
		<div @click="create">create</div>
		<div @click="deleteTable">deleteTable</div>
		<div @click="selectAll">selectAll</div>
		<div @click="addBazi">add1</div>
	</div>
	<div class="bazi_list">
		<div class="bazi_item" v-for="(item,index) in baziList" :key="index" >
			<div class="item_name">{{item.name}}</div>
			<div class="birth">{{getBirth(index)}}</div>
		</div>
	</div>
</template>

<script>
	import sqlite from '@/utils/sqlite.js' //dbCreate,		openSqlite,		queryBazi,		closeSQL



	export default {
		onLoad() {
			// sqlite.openSQL();
		},
		data() {
			return {
				myDB: null,
				isOpen: false,
				success: "",
				baziList:[]
			}
		},
		methods: {
			getBirth(index){
				console.log(this.baziList[index].isLunar)
				if(this.baziList[index].isLunar==="0"){
					let time=new Date(this.baziList[index].birthday)
					let hours= time.getHours()<10?'0'+time.getHours():time.getHours()
					let Minute=time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes()
					return "新历"+time.getFullYear()+"年"+time.getMonth()+'月'+time.getDay()+'日 '+hours+':'+Minute
				
				}else if(this.baziList[index].isLunar==="1"){
					
				}
			},
			open() {
				sqlite.openSQL();
			},
			close() {
				sqlite.closeSQL()
			},
			create() {
				sqlite.createTable()
			},
			async selectAll() {
				let a = await sqlite.selectAllBazi()
				this.baziList=a
				console.log("111", a)
			},
			async addBazi() {
				let arr = [{
					rank: 1,
					relation : "朋友",
					name: "张三",
					sex: 1,
					birthday: "2022 9-27",
					isLunar : "0",
					isAccurate: "是",
					isLeapMonth: "1",
					province: '广东',
					provinseCode: "1",
					city: '深圳',
					cityCode: "2",
					remarks: "备注",
					analyse: "空",
					addTime: "2022 9-27",
					tag: "1"
				}]
				let re=await sqlite.addBazi(arr)
				console.log(re)
			},
			deleteTable(){
				sqlite.deleteTable()
			}
		}
	}
</script>

<style scoped lang="scss">
.sqlite{
	position: absolute;
	opacity: 0.5;
	right: 0;
	div{
		padding: 10px;
		border-radius: 10px;
		background-color: aliceblue;
	}
}
.bazi_list{
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	
	.bazi_item{
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 10px;
		height: 80px;
		border-radius: 10px;
		border: 1px solid #bb9469;
		background-color: #bc91661a;
		.item_name{
			font-size: 18px;
			margin-left: 10px;
			color: #000000;
			margin-top: 5px;
		}
		.birth{
			font-size: 14px;
			margin-left: 10px;
			color: #bbbbbb;
			margin-top: 5px;
		}
	}
}
</style>
