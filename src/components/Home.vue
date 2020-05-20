<template>
    <div>
        <van-nav-bar
                title="菩提本无树，明镜亦非台"
        />
        <div class="main mt10">
          {{ dataInfo.data }}
        </div>
        <div class="tip">
            -----这地方连天使都不敢踏足-----
        </div>
        <div class="mt10">
            <van-form @submit="onSubmit">
                <van-field
                        v-model="message"
                        rows="2"
                        autosize
                        label="评论"
                        type="textarea"
                        maxlength="50"
                        placeholder="有一个怪兽，他一直不停的在吃东西，可怎么吃也吃不饱，结果。。。。。。。。他把自己给吃了。。。。。。。。。。"
                        :rules="[{ required: true, message: '请输入评论' }]"
                        show-word-limit
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>
                <div style="margin: 16px;" v-show="btnShow">
                    <van-button round block type="primary" native-type="button" @click="pop">
                        登录
                    </van-button>
                </div>
            </van-form>
        </div>
        <div class="comments-tip">
          <p>评论须知：</p>
          <p>1. 此评论为完全匿名模式，无需注册，无需登录，一键轻松回复。</p>
          <p>2. 为了让会员用户更好使用此产品，评论者请务必填写真实想法。</p>
          <p>3. 如想体验更多功能，请注册后登录体验。</p>
          <p>4. 尊重网上道德，严禁发表侮辱、诽谤、教唆、淫秽内容。</p>
        </div>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
        <div class="bottom">本来无一物，何处惹尘埃</div>
    </div>
</template>

<script>
    import { NavBar, Panel, Button, Cell, CellGroup, Field, Form, ActionSheet, Toast } from 'vant'
    export default {
        name: "Home",
        mounted() {
            this.releaseId = this.$route.query.releaseId
            const self = this;
            const user = this.$cookie.get('user');
            if(user){
              this.btnShow = false
            }else{
              this.btnShow = true
            }
            this.$axios({
                url:'/pyboe/view_release/get_release_info_by_id',
                data:{
                    releaseId: self.releaseId
                }
            }).then(function (result) {
                if('0000' == result.headInfo.respCode){
                    self.dataInfo = result.body
                }else{
                    Toast(result.headInfo.respMsg)
                }
            })
        },
        data () {
            return {
                releaseId: '',
                message: '',
                dataInfo: {},
                show: false,
                actions: [
                    { name: '登录' },
                    { name: '注册' },
                ],
                btnShow: true
            }
        },
        components: {
            [NavBar.name]: NavBar,
            [Panel.name]: Panel,
            [Button.name]: Button,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Form.name]: Form,
            [ActionSheet.name]: ActionSheet,
            [Toast.name]: Toast,
        },
        methods: {
            toComment(){
                this.$router.push('/comments')
            },
            logout(){
                this.$router.push('/login')
            },
            goDetail(id){
                this.$router.push('/infoDetail?id='+id)
            },
            onSubmit(){
                const self = this;
                this.$axios({
                    url:'/pyboe/view_reply/do_reply',
                    data:{
                        viewSelfId:this.releaseId,
                        data:this.message
                    }
                }).then(function (result) {
                    if('0000' == result.headInfo.respCode){
                        Toast('回复成功！')
                        self.$router.push('/')
                    }else{
                        Toast(result.headInfo.respMsg)
                    }
                })
            },
            onSelect(item) {
                this.show = false;
                if(item.name == '登录'){
                    this.$router.push('/login')
                }else{
                    this.$router.push('/register')
                }
            },
            pop(){
                this.show = true;
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
        background: #fff;
        font-size: 16px;
        color: #800000;
    }
    .tip{
        text-align: center;
        padding: 10px 0;
        background: #fff;
        margin-top: 10px;
    }
    .comments-tip{
      padding: 10px;
      line-height: 200%;
      margin-top: 14px;
    }
</style>
