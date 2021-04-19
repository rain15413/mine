<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-07-02 11:33:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-02-19 16:41:30
 -->
<template>
	<div class="clock">
		<span class="text" v-if="index == 0">
			{{ hour }}:{{ min }}:{{ sec }}
		</span>
		<span class="text" v-else>
			{{ min }}:{{ sec }}:{{ msec }}
		</span>
		<button class="btn btn-clock" @click="selectClock" :class="{'to-left': index != 0}">时钟</button>
		<button class="btn btn-timer" @click="selectTimer" v-if="index == 0">计时器</button>
		<button class="btn btn-suspend" @click="suspendTimer" v-if="index > 0">
			<span v-if="index == 1">暂停</span>
			<span v-if="index == 2">开始</span>
		</button>
		<button class="btn btn-reset" @click="resetTimer" v-if="index == 1 || index == 2">
			<span>重置</span>
		</button>
	</div>
</template>
	
<script>
	export default {
		data () {
			return {
				index: 0,   // 0表示时钟页面，1表示计时器计时状态，2表示计时器暂停状态
				hour: '00',  // 页面显示的数值
				min: '00',
				sec: '00',
				msec: '00',
				h: 0,       // 临时保存的数值
				m: 0,
				s: 0,
				ms: 0,
				timer: null,
				date: null
			}
		},
		watch: {
			index(newValue, oldValue) {
				clearInterval(this.timer);
				this.timer = null;
				this.date = null;
				// 从时钟页面click过来 或 从计时器页面click过来
				if (oldValue == 0 || newValue == 0) {   // index等于2时数据保留
					this.hour = '00'; 
					this.min = '00';
					this.sec = '00';
					this.msec = '00';
					this.h = 0; 
					this.m = 0;
					this.s = 0;
					this.ms = 0;
				}
				this.autoMove();
			}
		},
		mounted () {
			this.autoMove();
		},
		methods:{
			// 自动计时
			autoMove() {
				if (this.index == 0) {
					this.timer = setInterval(res => {
						this.date = new Date();
						this.h = this.date.getHours();
						this.m = this.date.getMinutes();
						this.s = this.date.getSeconds();
						this.hour = this.h > 9 ? this.h : '0' + this.h;
						this.min = this.m > 9 ?  this.m : '0' + this.m;
						this.sec = this.s > 9 ? this.s : '0' + this.s;
					}, 1000);
				} else if (this.index == 1){
					this.timer = setInterval(res => {
						this.ms ++;
						if (this.ms == 100) {
							this.s ++;
							this.ms = 0;
						}
						if (this.s == 60) {
							this.m ++;
							this.s = 0;
						}
						this.msec = this.ms > 9 ? this.ms : '0' + this.ms;
						this.min = this.m > 9 ?  this.m : '0' + this.m;
						this.sec = this.s > 9 ? this.s : '0' + this.s;
					}, 10);
				}
			},
			// 选择时钟
			selectClock() {
				this.index = 0;
			},
			// 选择计时器
			selectTimer() {
				this.index = 1;
			},
			// 开始、暂停计时器
			suspendTimer() {
				if (this.index == 1) {
					this.index = 2;
				} else if (this.index == 2) {
					this.index = 1;
				}
			},
			// 重置计时器
			resetTimer() {
				this.index = 0;
				setTimeout(res => {
						this.index = 1;
				}, 1);
			}
		}
	}
	
</script>
	
<style scoped>
	.clock {
		width: 400px;
		height: 180px;
		line-height: 180px;
		border: 10px solid #aaa;
		border-radius: 10px;
		margin: 120px auto;
		background: pink;
		text-align: center;
		position: relative;
		box-shadow: 0px 5px 20px rgba(0,0,0,.6);
	}
	.clock .text {
		font-size: 70px;
		font-weight: bold;
		color: rgba(0,0,0,.7);
	}
	.clock .btn {
		position: absolute;
		/*top: -66px;*/
		bottom: -66px;
		border: none;
		outline: none;
		width: 80px;
		height: 36px;
		border-radius: 4px;
		font-size: 16px;
		background: #aaa;
		cursor: pointer;
		box-shadow: 0px 5px 20px rgba(0,0,0,.6);
	}
	.clock .btn:hover {
		opacity: 0.8;
	}
	.clock .btn-clock {
		left: 110px;
	}
	.clock .btn-clock.to-left {
		left: 60px;
	}
	.clock .btn-timer {
		right: 110px;
	}
	.clock .btn-suspend {
		right: 160px;
	}
	.clock .btn-reset {
		right: 60px;
	}
</style>