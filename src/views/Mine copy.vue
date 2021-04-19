<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-07-02 11:33:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-02-19 16:22:21
 -->
<template>
	<div class="clock">
		<div class="clock-box">
			<div class="clock-out">
				<div v-if="typeIndex == 1" class="clock-in">
					{{h}}:{{m}}:{{s}}
				</div>
				<div v-else class="clock-in">
					{{min}}:{{sec}}.{{msec}}
				</div>
			</div>
			<div class="clock-btn">
				<button @click="changeType(1)">时钟</button>
				<button v-if="typeIndex == 1" @click="changeType(2)">计时器</button>
				<span v-else>
					<!-- <button @click="goSeconds">开始</button> -->
					<button @click="goSeconds">开始</button>
					<!-- <button @click="stopClock">暂停</button> -->
					<button @click="changeType(2)">暂停</button>
					<button @click="changeType(3)">重置</button>
				</span>
			</div>
		</div>
	</div>
</template>
	
<script>
	export default {
		data () {
			return {
				timeNum: '',
				h: '',
				m: '',
				s: '',
				ms: 0,
				ss: 0,
				mm: 0,
				msec: '',
				sec: '',
				min: '',
				goClock: null,
				timer: null,
				typeIndex: 1
			}
		},
		watch: {
			typeIndex (newValue, oldValue) {
				if (newValue == 1) {
					clearInterval(this.timer)
					this.ms = 0
					this.ss = 0
					this.mm = 0
					this.msec = 0
					this.sec = 0
					this.min = 0
				}
				if (newValue == 2) {
					this.goSeconds()
				}
				if (newValue == 3 || oldValue == 3) {
					clearInterval(this.timer)
					this.ms = 0
					this.ss = 0
					this.mm = 0
					this.msec = 0
					this.sec = 0
					this.min = 0
					this.goSeconds()
				}
			}
		},
		mounted () {
			var that = this
			startClock()
			this.goClock = setInterval(startClock, 1000)
			function startClock () {
				var date = new Date()
				// that.timeNum = date.toLocaleTimeString()
				that.h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
				that.m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
				that.s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
				// that.timeNum = `${hour}:${minute}:${second}`
				// that.timeNum = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
			}
		},
		methods:{
			changeType (n) {
				if (this.typeIndex == n && n == 1) {
					return
				}
				this.typeIndex = n
				console.log(n)
			},
			// changeType (n) {
			// 	if (this.typeIndex == n) {
			// 		return
			// 	}
			// 	this.typeIndex = n
			// 	if (n == 1) {
			// 		clearInterval(this.timer)
			// 		this.ms = 0
			// 		this.ss = 0
			// 		this.mm = 0
			// 		this.msec = 0
			// 		this.sec = 0
			// 		this.min = 0
			// 	}
			// 	if (n == 2) {
			// 		this.goSeconds()
			// 	}
			// },
			goSeconds () {
				clearInterval(this.timer)
				this.timer = setInterval(res => {
					this.ms++
					if (this.ms == 100) {
							this.ss++
							this.ms = 0
					}
					if (this.ss == 60) {
							this.mm++
							this.ss = 0
					}
					this.msec = this.ms > 9 ? this.ms : '0' + this.ms
					this.sec = this.ss > 9 ? this.ss : '0' + this.ss
					this.min = this.mm > 9 ?  this.mm : '0' + this.mm
				}, 10)
			},
			stopClock () {
				clearInterval(this.timer)
			}
		}
	}
	
</script>
	
<style scoped>
	.clock {
		position: relative;
		width: 100%;
		height: 500px;
		/* display: flex; */
    /* justify-content: center;
    align-items: center; */
	}
	.clock .clock-box {
		width: 400px;
		height: 300px;
		/* border: 1px solid black; */
		position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
		margin: auto;
		text-align: center;
	}
	.clock .clock-out {
		width: 400px;
		height: 200px;
		border: 1px solid black;
	}	
	.clock .clock-in {
		line-height: 200px;
    font-size: 30px;
	}
</style>