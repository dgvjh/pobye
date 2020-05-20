<template>
    <div>
        <van-nav-bar
            title="---↓-是时候表演真正的技术了-↓---"
            @click-left="onClickLeft"
            left-arrow
        />
        <div class="mt10">
            <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    label="问题"
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入问题"
                    show-word-limit
            />
        </div>
        <div class="btn">
            <van-button round block type="info" native-type="submit" @click="handleSubmit">
                只要点一下就够了蠢货
            </van-button>
        </div>
        <div class="bottom">本来无一物，何处惹尘埃</div>
    </div>
</template>

<script>
    import { NavBar, Panel, Button, Field } from 'vant'
    export default {
        name: "Comments",
        data(){
            return {
                message: ''
            }
        },
        components: {
            [NavBar.name]: NavBar,
            [Panel.name]: Panel,
            [Button.name]: Button,
            [Field.name]: Field,
        },
        methods: {
            onClickLeft() {
                this.$router.push('/')
            },
            handleSubmit(){
                const self = this;
                this.$axios({
                    url:'/pyboe/view_self/do_release',
                    data:{
                        data: self.message
                    }
                }).then(function (result) {
                    if('0000' == result.headInfo.respCode){
                        self.$router.push('/')
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .mt10{
        margin-top: 10px;
    }
</style>
