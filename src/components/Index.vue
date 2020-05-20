<template>
    <div>
        <van-nav-bar
            title="菩提本无树，明镜亦非台"
        />
        <van-panel class="mt10" title="问题">
            <div class="main">摇还是不摇，这是一个问题</div>
            <template #footer>
                <van-button class="fr m10" size="small" @click="toComment" type="danger">发布</van-button>
            </template>
        </van-panel>
        <div class="tip">
            -----均衡存乎万物之间-----
        </div>
        <van-cell-group class="m10">
            <van-cell :title="item.data" :key="item.id" is-link v-for="(item) in dataInfo" @click="goDetail(item.id)" />
        </van-cell-group>
        <div class="btn">
            <van-button round block type="info" @click="logout" native-type="submit">
                退出登录
            </van-button>
        </div>
        <div class="bottom">本来无一物，何处惹尘埃</div>
    </div>
</template>

<script>
  import {NavBar, Panel, Button, Cell, CellGroup, Toast} from 'vant'
    export default {
        name: "index",
        mounted() {
            const self = this;
            this.$axios({
                url:'/pyboe/view_self/get_release_info'
            }).then(function (result) {
                if('0000' == result.headInfo.respCode){
                    self.dataInfo = result.body
                }
            })
        },
        data () {
            return {
                releaseId: '',
                dataInfo: []
            }
        },
        components: {
            [NavBar.name]: NavBar,
            [Panel.name]: Panel,
            [Button.name]: Button,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Toast.name]: Toast,
        },
        methods: {
            toComment(){
                this.$router.push('/comments')
            },
            logout(){
              const self = this
                this.$axios({
                  url: '/pyboe/login/login_out'
                }).then(function () {
                  Toast('退出成功！')
                  self.$router.push('/login')
                })
            },
            goDetail(id){
                this.$router.push('/infoDetail?releaseId='+id)
            }
        },
    }
</script>

<style scoped>
    .fr{
        float: right;
    }
    .mt10{
        margin-top: 10px;
        overflow: auto;
    }
    .m10{
        margin: 10px 0;
    }
    .main{
        padding: 20px;
    }
    .tip{
        text-align: center;
        padding: 10px 0;
        background: #fff;
        margin-top: 10px;
    }
    .btn{
      margin-bottom: 50px;
    }
</style>
