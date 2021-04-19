<template>
    <div class="header">
        <el-row>
            <el-col :span="3">
                <div class="tools" @click.prevent="collapse">
                    <i class="fa fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="21" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner">
                        <img :src="this.sysUserAvatar" /> 
                        {{sysUserName}}
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item @click.native="changeFace">设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
        <el-dialog title="更换头像" :modal-append-to-body="false" :visible.sync="dialogVisible" :close-on-click-modal="false" :before-close="handleClose">
            <div>
                <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                collapsed: false,
                sysUserName: '',
                sysUserAvatar: '',
                imageUrl: '',
                dialogVisible: false
            }
        },
        mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
        },
        methods: {
            //折叠导航栏
			collapse:function(){
				this.$store.commit('COLLAPSE')
				// this.collapsed=!this.collapsed;
            },
            changeFace () {
                // alert(1211)
                this.dialogVisible = true
            },
            handleClose () {
                this.dialogVisible = false
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/JPEG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>
<style scoprd lang="scss">
    .header {
        height: 60px;
        line-height: 60px;
        // background: $color-primary;
        background: #075690;
        color:#fff;
        .tools{
            padding: 0px 23px;
            width:14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color:#fff;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
    }
</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    /* display: block; */
  }
</style>
