<template>
	<view class="content">

		<view class="text-area">
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
				@monthSwitch="monthSwitch" />
			<view class="nongli" @tap="goHuangli">
				<view>农历{{lunarInfo.today}}</view>
				<view class="ganzhi">{{lunarInfo.ganzhi}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 获取任意时间
	 */
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	import {
		Solar,
		Lunar,
		HolidayUtil
	} from 'lunar-javascript'
	export default {
		components: {},
		data() {
			return {
				showCalendar: false,
				lunarInfo: { //当日信息
					today: '',
					ganzhi: '',
					time:''
				},
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				}
			}
		},
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true,
					this.getTodayInfo(new Date())
			})
			// TODO 模拟请求异步同步数据
			setTimeout(() => {
				this.info.date = getDate(new Date(), -30).fullDate
				this.info.startDate = getDate(new Date(), -60).fullDate
				this.info.endDate = getDate(new Date(), 30).fullDate
				this.info.selected = [{
						date: getDate(new Date(), -3).fullDate,
						info: '打卡'
					},
					{
						date: getDate(new Date(), -2).fullDate,
						info: '',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'

						}
					},
					{
						date: getDate(new Date(), -1).fullDate,
						info: '已打卡'
					}
				]
			}, 2000)
		},
		methods: {
			// 跳转黄历页面
			goHuangli() {
				
				uni.navigateTo({
					url: "/pages/huangLi/huangLi?time="+this.lunarInfo.time
				})
			},
			open() {
				this.$refs.calendar.open()
			},
			close() {
				console.log('弹窗关闭');
			},
			change(e) {
				console.log('change 返回:', e)
				// 模拟动态打卡
				// if (this.info.selected.length > 5) return
				// this.info.selected.push({
				// 	date: e.fulldate,
				// 	info: '打卡'
				// })
				// debugger
				// this.lunarInfo.today=e.lunar.IMonthCn+e.lunar.IDayCn
				
				
				this.getTodayInfo(e.fulldate)

			},
			// 获取当天农历信息和生日信息
			getTodayInfo(e) {
				let today = Lunar.fromDate(new Date(e));
				this.lunarInfo.time=new Date(e).getTime()
				this.lunarInfo.today = today.getMonthInChinese() + today.getDayInChinese()
				this.lunarInfo.ganzhi = today.getYearInGanZhi() + today.getYearShengXiao() + "年 " + today
				.getMonthInGanZhi() + "月 " + today.getDayInGanZhi() + "日"
				// debugger
			},
			monthSwitch(e) {
				// console.log('monthSwitchs 返回:', e)
				// const {Solar, Lunar, HolidayUtil} = require('lunar-javascript')
				// console.log(Lunar.fromDate(new Date()).toFullString())
				// console.log(Solar.fromYmd(2016, 1, 1).toFullString())
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		.nongli {
			padding: 10px;
			background-color: #EEEEEE;
			border-radius: 10px;
			margin-top: 10px;
			font-size: 14px;
			color: #000;

			.ganzhi {
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
