<template>
	<view class="top_main">
		<view class="header">
			<view class="goback" @tap="goBack">&#xe6ab;</view>
			{{mainTime.getFullYear()+"年"+(mainTime.getMonth() + 1)+"月"+mainTime.getDate()+"日"}}
		</view>
		<view class="main_content">
			<view class="top">
				<view class="top_left">
					<view class="day_yi">
						<view class="yi_cion">宜</view>
						<text class="yicss" v-for="(item,index) in dayYi" :key="index">{{item}}</text>
					</view>
					<view class="day_ji">
						<view class="ji_cion">忌</view>
						<text class="jicss" v-for="(item,index) in dayJi" :key="index">{{item}}</text>
					</view>
				</view>
				<view class="top_right">
					<view class="day">{{mainTime.getDate()}}</view>
					<view class="lunar_num">{{lunarInfo.today}}</view>
					<view class="lunar_ganzhi">{{lunarInfo.ganzhi}}</view>
				</view>
			</view>
			<view class="bottom">
				<view class="shichen">
					<view v-for="(item,index) in shichen" :key="index" class="shichen_item">{{item.getGanZhi()}}</view>
				</view>
				<view class="shichen">
					<view v-for="(item,index) in shichen2" :key="index" class="shichen_item2">{{item}}</view>
				</view>
				<view class="shichen">
					<view v-for="(item,index) in time2luck" :key="index"
						:class="item.luck=='吉'?'shichen_item3':'shichen_item'">{{item.luck}}</view>
				</view>
				<view class="shichen">
					<view v-for="(item,index) in time2luck" :key="index" class="shichen_item3">
						<view class="time_yi" v-for="(item2,index2) in item.yi" :key="index2">{{item2}}</view>
					</view>
				</view>
				<view class="shichen">
					<view v-for="(item,index) in time2luck" :key="index" class="shichen_item">
						<view class="time_ji" v-for="(item2,index2) in item.ji" :key="index2">{{item2}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Solar,
		Lunar,
		HolidayUtil
	} from 'lunar-javascript'
	export default {
		onLoad(options) {
			var data = parseInt(options.time)
			console.log(data)
			this.mainTime = new Date(data)
			this.init()
		},
		data() {
			return {
				mainTime: null,
				timeText: "", //头部日期
				dayYi: [], //每日宜
				dayJi: [], //每日忌
				lunarInfo: { //当日信息
					today: '',
					ganzhi: ''
				},
				shichen: [], //时辰
				shichen2: [ //时间枚举
					'0-1',
					'1-3',
					'3-5',
					'5-7',
					'7-9',
					'9-11',
					'11-13',
					'13-15',
					'15-17',
					'17-19',
					'19-21',
					'21-23',
					'23- 0',
				],
				time2luck: [] //时辰和吉凶
			}
		},
		methods: {
			goBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			init() {
				// 每日宜忌
				this.dayYi = Lunar.fromDate(this.mainTime).getDayYi();
				this.dayJi = Lunar.fromDate(this.mainTime).getDayJi();
				let today = Lunar.fromDate(this.mainTime);
				this.lunarInfo.today = today.getMonthInChinese() + "月" + today.getDayInChinese()
				this.lunarInfo.ganzhi = today.getYearInGanZhi() + today.getYearShengXiao() + "年 " + today
					.getMonthInGanZhi() + "月 " + today.getDayInGanZhi() + "日"
				this.shichen = today.getTimes()
				// 获取各个时辰的吉凶和宜忌
				let myTime = this.mainTime.getTime()
				for (var i = -2; i < 24; i = i + 2) {
					let myTime2 = myTime + (i * 60 * 60 * 1000)
					// console.log(Lunar.fromDate(new Date(myTime2)).getTimeInGanZhi())
					this.time2luck.push({
						luck: Lunar.fromDate(new Date(myTime2)).getTimeTianShenLuck(),
						yi: Lunar.fromDate(new Date(myTime2)).getTimeYi(),
						ji: Lunar.fromDate(new Date(myTime2)).getTimeJi()
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@font-face {
		font-family: 'iconfont';
		src: url('../../static/font/iconfont.ttf')
	}
.top_main::-webkit-scrollbar {

		width: 0;
		height: 0;
		color: transparent;

	}
	.top_main{
		position: absolute;
	}
	.header {
		position: fixed;
		width: 100%;
		height: 50px;
		top: 0;
		left: 0;
		background-color: #FFF;
		text-align: center;
		font-weight: bold;
		line-height: 50px;
		font-size: 25px;
		color: #343434;
		z-index: 1;

		.goback {
			position: absolute;
			left: 0;
			top: 0;
			height: 50px;
			width: 50px;
			line-height: 50px;
			text-align: center;
			font-family: iconfont;
			font-size: 18px;
			color: #000;
		}
	}

	

	.main_content {
		border-radius: 20px;
		border: 2px solid #bb9469;
		margin-top: 50px;
		margin-left: 10px;
		margin-right: 10px;
		margin-bottom: 20px;
		// padding-bottom: 50px;
		// position: absolute;
		overflow-y: scroll;

		.top {
			display: flex;
			height: 40%;
			border-bottom: 1px solid #a19d92;

			.top_left {
				width: 130px;
				border-right: 1px solid #a19d92;

				.day_yi {
					margin-left: 26px;
					margin-top: 40px;
					position: relative;

					.yi_cion {
						position: absolute;
						left: -24px;
						border: 1px solid #bba083;
						border-radius: 50%;
						padding: 3px;
						color: #bba083;
						font-size: 13px;
					}

					.yicss {
						font-size: 14px;
						color: #bba083;
						padding: 2px;
					}
				}

				.day_ji {
					margin-left: 26px;
					margin-top: 20px;
					position: relative;
					margin-bottom: 10px;
					.ji_cion {
						position: absolute;
						left: -24px;
						border: 1px solid #000000;
						border-radius: 50%;
						padding: 3px;
						color: #000000;
						font-size: 13px;
					}

					.jicss {
						font-size: 14px;
						color: #000000;
						padding: 2px;
					}
				}
			}

			.top_right {
				flex: 1;

				.day {
					width: 100%;
					text-align: center;
					font-size: 80px;
					color: #000;
				}

				.lunar_num {
					width: 100%;
					text-align: center;
					color: #000;
					font-size: 40px;
				}

				.lunar_ganzhi {
					margin-top: 10px;
					width: 100%;
					text-align: center;
					font-size: 15px;
					color: #6c6c6c;
				}
			}
		}

		.bottom {
			width: 100%;
			height: 60%;
			.shichen:first-child{
				border-left: 0px!important;
			}
			.shichen {
				display: flex;

				.shichen_item {
					padding-top: 5px;
					padding-bottom: 5px;
					font-size: 16px;
					text-align: center;
					flex: 1;
					color: #000;
					border-left: 1px solid #a19d92;
					border-bottom: 1px solid #a19d92;
				}

				.shichen_item3 {
					padding-top: 5px;
					padding-bottom: 5px;
					font-size: 16px;
					text-align: center;
					flex: 1;
					color: #bc9166;
					border-left: 1px solid #a19d92;
					border-bottom: 1px solid #a19d92;
				}

				.time_yi {
					font-size: 12px;
				}

				.time_ji {
					font-size: 12px;
				}

				.shichen_item2 {
					padding-top: 5px;
					padding-bottom: 5px;
					font-size: 12px;
					text-align: center;
					flex: 1;
					color: #000;
					border-left: 1px solid #a19d92;
					border-bottom: 1px solid #a19d92;
				}
			}
		}
	}
</style>
