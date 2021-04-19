<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-07-02 11:33:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-30 15:35:11
 -->
<template>
	<div class="test">
		<div class="ani-box">
			<div class="blue-circle blue-circle-left">
				<img src="../assets/rain.png" alt="">
			</div>
			<div class="blue-line">
				<div class="blue-line-ani"></div>
			</div>
			<div class="blue-circle">
				<img src="../assets/rain.png" alt="">
			</div>
		</div>
		
		<div class="ani-box">
			<div class="red-circle red-circle-left">
				<div class="red-block"></div>
			</div>
			<div class="red-line">
				<div class="red-line-ani">
					<div class="redline-box">
						<div class="redline" v-for="(item, index) in runList" :key="index"></div>
					</div>
					<div class="redline-box-bot">
						<div class="redline" v-for="(item, index) in runList" :key="index"></div>
					</div>
				</div>
			</div>
			<div class="red-circle">
				<div class="red-block"></div>
			</div>
		</div>

		<div class="circle-box">
			<img class="pandaJoJo" src="../assets/pandaJoJo.png" alt="">
		</div>
	</div>
</template>
	
<script>
	export default {
		data () {
			return {
				runList: [],
				showss: true
			}
		},
		mounted () {
			for (var i = 0; i < 108; i++) {
				 this.runList.push(i)
			}
            this.getTest1()
            this.getTest2()
			this.getBiBao()
		},
		methods:{
			gg() {
				this.showss = !this.showss
			},
			getTest1 () {
				let arr = [1, [2, [3, [4, 5]]], 6]; 
				arr = arr.toString().split(',')
				console.log('arr', arr)
				let brr = [1,2,3,4,5,6]
				brr = brr.toString()
				console.log('brr', brr)
			},
			getTest2 () {
				let arr = [ 1, 5, 6, 4, 2, 7, 3, 4, 11]
				console.log('test2', arr)
				let num = ''
				for (let i = 0; i < arr.length - 1; i++) {
					for (let j = 0; j < arr.length - i; j++) {
						if (arr[j] > arr[j + 1]) {
							num = arr[j]
							arr[j] = arr[j + 1]
							arr[j + 1] = num
						}
					}
				}
				console.log('test2', arr)
			},
			getBiBao () { // 闭包的应用
				// 累加器
				function counter() {
					// 秒数
					let second = 0;

					function doCounter() {
						// 到达10秒后停止
						if (second === 10) {
							clearInterval(recordSecond);
							console.log('计时结束!');
							return;
						}
						second += 1;
						console.log(`${second}秒`);
					}

					return doCounter;
				}

				// 得到累加器
				const doCounterFn = counter();

				const recordSecond = setInterval(function () {
					// 调用累加器
					doCounterFn();
				}, 1000);

			}
		}
	}
	
</script>
	
<style scoped>
	.test {

	}
	.test .circle-box{
		padding-left: 200px;
		padding-top: 150px;
	}
	.test .pandaJoJo{

	}
	.pandaJoJo:hover{
		transform: rotate(666turn);
		transition: all 59s cubic-bezier(.34,0,.84,1) 1s;
		/* transition: all 59s cubic-bezier(.24, .34, .44, .54) 1s; */
        
	}
	.test .ani-box{
		width: 500px;
		height: 40px;
		display: flex;
		justify-content: flex-start;
		margin-top: 50px;
		margin-left: 400px;
	}	
	.test .ani-box .blue-line{
		width: 360px;
		height: 40px;
	}
	.test .ani-box .blue-line .blue-line-ani{
		width: 100%;
		height: 100%;
		border-bottom: 2px solid #4dd0e1;
		box-sizing: border-box;
		animation-duration: 8s;
		animation-name: ani-line;
		animation-iteration-count: infinite;
	}
	@keyframes ani-line {
		0% {width: 100%;}
		10% {width: 100%;}
		40% {width: 0%;}
		60% {width: 0%;}
		90% {width: 100%;}
		100% {width: 100%;}
	}
	.test .ani-box .blue-circle-left{
		margin-right: -20px!important;
		margin-left: 0!important;
	}
	.test .ani-box .blue-circle{
		width: 40px;
		height: 40px;
		border-radius: 40px;
		border: 2px solid #4dd0e1;
		margin-left: -20px;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		animation-duration: 8s;
		animation-name: ani-circle;
		animation-iteration-count: infinite;
	}
	.test .ani-box img {
		width: 25px;
		height: 25px;
	}
	@keyframes ani-circle {
		0% {transform: rotate(0);}
		10% {transform: rotate(0);}
		40% {transform: rotate(360deg);}
		60% {transform: rotate(360deg);}
		90% {ransform: rotate(0);}
		100% {ransform: rotate(0);}
	}

	.test .ani-box .red-line{
		width: 360px;
		height: 40px;
	}
	.test .ani-box .red-line .red-line-ani{
		width: 100%;
		height: 100%;
		border-top: 2px solid #f75858;
		border-bottom: 2px solid #f75858;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		/* animation-duration: 8s;
		animation-name: ani-line-red;
		animation-iteration-count: infinite; */
	}
	@keyframes ani-line-red {
		0% {width: 100%;}
		10% {width: 100%;}
		40% {width: 0%;}
		60% {width: 0%;}
		90% {width: 100%;}
		100% {width: 100%;}
	}
	.test .redline-box{
		width: 200%;
		height: 5px;
		overflow: hidden;
		/* margin-left: -360px; */
		position: absolute;
		top: 0;
		left: -360px;
	}
	.test .redline-box .redline{
		float: left;
		width: 2px;
		height: 5px;
		margin-right: 10px;
		background: #f75858;
		animation-duration: 8s;
		animation-name: ani-line-run;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
	@keyframes ani-line-run{
		from {transform:translate(0,0)}
		to {transform:translate(360px,0)}
	}
	.test .redline-box-bot{
		width: 200%;
		height: 5px;
		overflow: hidden;
		/* margin-left: -360px;
		margin-top: 26px; */
		position: absolute;
		bottom: 0;
		left: -360px;
	}
	.test .redline-box-bot .redline{
		float: left;
		width: 2px;
		height: 5px;
		margin-right: 10px;
		background: #f75858;
		animation-duration: 8s;
		animation-name: ani-line-run;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		animation-direction: reverse;
	}
	.test .ani-box .red-circle-left{
		margin-right: -20px!important;
		margin-left: 0!important;
	}
	.test .ani-box .red-circle{
		width: 40px;
		height: 40px;
		border-radius: 40px;
		border: 2px solid #f75858;
		background: #fff;
		z-index: 10;
		margin-left: -20px;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		animation-duration: 2s;
		animation-name: ani-circle-red;
		animation-iteration-count: infinite;
		animation-delay: 0s;
		animation-timing-function: linear;
	}
	.test .ani-box .red-circle .red-block{
		width: 16px;
		height: 16px;
		border: 1px solid #f75858;
	}
	.test .ani-box img {
		width: 25px;
		height: 25px;
	}
	@keyframes ani-circle-red {
		from {transform: rotate(0);}
		to {transform: rotate(360deg);}
	}
</style>