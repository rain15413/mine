<template>
    <el-aside :style="{width:collapsed? '60px':'230px'}">
        <div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
            <!-- {{collapsed?'':sysName}} -->
            <template v-if="!collapsed">
                <img class="imgA" src="../../static/img/rain.png" alt="">
                {{sysName}}
            </template>
            <template v-else>
                <img class="imgB" src="../../static/img/rain.png" alt="">
            </template>
        </div>
        <div class="main">

            <aside class="el-aside" :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!-- 导航-正常 -->
				<!-- 在<el-menu>中需要--:default-active="this.$route.path"。用来绑定路由表
				在<el-menu>中需要--router------或者router=true
				在<el-submenu>中的index不可缺少，为必须值，不过此处的index仅为索引，用来让当前元素下的子菜单收缩或释放。每一个submenu的index值只要不一样便可
				在<el-menu-item>中，index的值不可缺少，就是用这个来进行路由跳转，index的值为跳转的路径 -->
				<!-- default-openeds 默认展开项,:defaultOpeneds=['...'] 属性内容和下面的 <el-submenu index="..."> 里面的index内容是关联的，两个属性内容是一样的就可以关联了 -->
				<el-menu :default-openeds=openeds :default-active="$route.path" router 
					class="el-menu-vertical-demo" background-color="#f2f2f2" text-color="#000"
					@open="handleopen" @close="handleclose" @select="handleselect"
					unique-opened v-show="!collapsed">
					<template v-for="(item,index) in menuList">
						<el-submenu :index="index+''" v-if="!item.leaf" :key="index">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<template v-for="child in item.children">
								<el-menu-item :index="child.path" :key="child.name">
									{{child.name}}
								</el-menu-item>
							</template>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="item.children[0].name">
							<template slot="title"><i :class="item.iconCls"></i>{{item.children[0].name}}</template>
						</el-menu-item>	
					</template>
				</el-menu>
				<!-- 导航-折叠 -->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in menuList" class="el-submenu item ffff" :key="item.name">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="gggg" :class="'submenu-hook-'+index"> 
								<li v-for="child in item.children" :key="child.name" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
        </div>
    </el-aside>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        data () {
            return {
                sysName:'VUEADMIN',
				menuList: [],
				openeds: ['0'],
            }
        },
        computed: {
            ...mapGetters({collapsed: 'getCollapse'})
        },
        mounted() {
			// var user = sessionStorage.getItem('user');
			// if (user) {
			// 	user = JSON.parse(user);
			// 	this.sysUserName = user.name || '';
			// 	this.sysUserAvatar = user.avatar || '';
			// }
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
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		}
    }
</script>
<style scoped lang="scss">
@import '~scss_vars';
    .el-aside{
		overflow-y: scroll;
		overflow-x: hidden;
        // overflow: auto;
		background: rgb(242, 242, 242);
        width: 100%;
	}
    .logo {
        width:230px;
        background: #075690;
        height:60px;
        font-size: 22px;
        text-align: center;
        // padding-left:20px;
        // padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        .imgA {
            vertical-align: middle;
            width: 40px;
            // top: 0;
            // right: 0;
            // bottom:0;
            // left:0;
            // margin: auto;
            // // float: left;
            // // margin: 10px 10px 10px 18px;
        }
        .imgB {
            position: absolute;
            width: 40px;
            top: 0;
            right: 0;
            bottom:0;
            left:0;
            margin: auto;
            // float: left;
            // margin: 10px 10px 10px 18px;
        }
        .txt {
            color:#fff;
        }
    }
    .logo-width{
        width:230px;
        line-height: 60px;
    }
    .logo-collapse-width{
        width:60px
    }
    .main {
        // display: flex;
        // // background: #324057;
        // position: absolute;
        // top: 60px;
        // bottom: 0px;
        // overflow: hidden;
        // background-color: #ffffff;
        aside {
            flex:0 0 230px;
            width: 230px;
            // position: absolute;
            // top: 0px;
            // bottom: 0px;
            .el-menu{
                height: 100%;
                background-color: #f0f2f5;
            }
            .collapsed{
                width:60px;
                .item{
                    position: relative;
                }
                .submenu{
                    position:absolute;
                    top:0px;
                    left:60px;
                    z-index:99999;
                    height:auto;
                    display:none;
                }
            }
        }
        .menu-collapsed{
            flex:0 0 60px;
            width: 60px;
        }
        .menu-expanded{
            flex:0 0 230px;
            width: 230px;
            /*以下打补丁的方式解决左侧菜单宽度显示不全*/
            .el-submenu__title {
                width: 100% !important;
            }
            .el-menu { 
                width: 100% !important;
            }
            .el-submenu .el-menu-item {
                min-width: 0px !important;
            }
        }
    }
		
</style>
<style>
    .ffff{
        position: relative !important;
    }
    .gggg{
        position: absolute;
        z-index: 10000;
        background: #000000;
        left: 50px;
    }
</style>
