<template>
	<div class="home">
		<el-container>
			<!-- <el-aside width="200px">Aside</el-aside> -->
			<Left-Part></Left-Part>
			<el-container>
				<el-header>
					<Right-Top></Right-Top>
					<Head-top></Head-top>
				</el-header>
    			<el-main>
					<!-- <el-header class="headTop">
						<head-top></head-top>
					</el-header> -->
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="breadcrumb-container">
							<strong class="title">{{$route.name}}</strong>
							<!-- 面包屑 -->
							<!-- <el-breadcrumb separator="/" class="breadcrumb-inner">
								<el-breadcrumb-item v-for="item in $route.matched" :key="item.name">
									{{ item.name }}
								</el-breadcrumb-item>
							</el-breadcrumb> -->
						</el-col>
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import LeftPart from './LeftPart'
	import RightTop from './RightTop'
	import RightPart from './RightPart'
	import HeadTop from './HeadTop'
	export default {
		components:{
			LeftPart,
			RightTop,
			RightPart,
			HeadTop
		},
		data() {
			return {
				sysName:'VUEADMIN',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				menuList: [],
				openeds: ['0'],
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
			this.getMenu(this.$router.options.routes)
			// console.log(this.$router.options.routes)
			// console.log(this.$route.matched)
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				// console.log('handleopen');
			},
			handleclose() {
				// console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			goUrl (path) {
				this.$router.push(path)
			},
			getMenu (obj) {
				// console.log(obj)
				var arr=[]
				for(let i=0;i<obj.length;i++){
					if(!obj[i].hide){
						var brr=obj[i].children.filter(item=>{
							return !item.hide
						})
						// console.log(brr)
						obj[i].children=brr
						arr.push(obj[i])
					}
				}
				// console.log(arr)
				this.menuList=arr
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					this.$store.commit('CLEAR_TAG')
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		}
	}

</script>

<style lang="scss" scoped>
	.home{
		height: 100%;
		.el-container{
			height: 100%;
			background: #f0f2f5;
		}
		.el-aside{
			background: #f0f2f5;
			color: rgba(255, 255, 255, 0.65);
			overflow: hidden;
		}
		.el-header{
			background: #fff;
			color: #333;
			padding: 0px;
			z-index: 1000;
		}
		.title {
			width: 200px;
			float: left;
			color: #475669;
			margin-left: 10px;
			// margin-top: 50px; 
		}
		.el-main{
			color: #333;
			height: 100%;
			width: 100%;
			padding: 10px;
			border-radius: 4px;
			background: #ffffff;
			padding-top: 50px;
		}
	}
</style>