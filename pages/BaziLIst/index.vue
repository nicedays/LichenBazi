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
		<div v-for="(item,index) in baziList" :key="index" >
			{{item.name}}
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
					isLunar : 1,
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
}
</style>
