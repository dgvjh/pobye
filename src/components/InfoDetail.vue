<template>
    <div>
        <van-nav-bar
            title="菩提本无树，明镜亦非台"
            left-arrow
            @click-left="onClickLeft"
        >
            <template #right>
                <van-icon name="ellipsis" size="18" @click="showShare = true"/>
            </template>
        </van-nav-bar>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell v-for="item in list" :key="item" :title="item.createTime+'----'+item.data" />
        </van-list>
        <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
            :description="ff"
        />
    </div>
</template>

<script>
    import { NavBar, Panel, Button, List, Cell, ShareSheet, Toast, Icon } from 'vant'

    export default {
        name: "InfoDetail",
        components: {
            [NavBar.name]: NavBar,
            [Panel.name]: Panel,
            [Button.name]: Button,
            [List.name]: List,
            [Cell.name]: Cell,
            [ShareSheet.name]: ShareSheet,
            [Toast.name]: Toast,
            [Icon.name]: Icon,
        },
        mounted() {
            this.id = this.$route.query.releaseId
            this.f = 'www.faceself.top:8080/pyboe/#/home?releaseId='+this.id
            this.ff = '长按复制：'+this.f
        },
        data (){
          return {
              list: [],
              loading: false,
              finished: false,
              id:'',
              showShare: false,
              options: [
                  { name: '复制链接', icon: 'link' },
              ],
              f:'',
              ff: '',
              time: ''
          }
        },
        methods: {
            onLoad() {
                const self = this;
                this.$axios({
                    url:'/pyboe/view_self/get_reply_info',
                    data:{
                        viewSelfId:this.id
                    }
                }).then(function (result) {
                    if('0000' == result.headInfo.respCode){
                        self.list = result.body
                        if(self.list.length > 0){
                            for(var i=0;i<self.list.length;i++){
                                self.list[i].createTime = self.$time(self.list[i].createTime)
                            }
                        }
                    }
                    self.loading = false;
                    if (self.list.length >= result.body.length) {
                        self.finished = true;
                    }
                })
            },
            onClickLeft(){
                this.$router.push('/')
            },
            onSelect(option) {
                if(option.name === '复制链接'){
                    this.$copyText(this.f).then(function (e) {
                        Toast('已复制到剪切板!');
                    }, function (e) {
                        console.log('复制失败!')
                    })
                }
                this.showShare = false;
            },
            onCopy (e) {
                Toast(e)
            },
            onError (e) {
                Toast("抱歉，复制失败！")
            }
        },
    }
</script>

<style scoped>

</style>
