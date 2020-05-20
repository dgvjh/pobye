<template>
    <div>
        <van-nav-bar
            title="登录"
        />
        <van-form @submit="onSubmit">
            <van-field
                    v-model="username"
                    name="loginName"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="password"
                    type="password"
                    name="loginPwd"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
        <p class="register"><router-link to="/register">立即注册</router-link></p>
    </div>
</template>

<script>
    import {Button, NavBar, Panel, Form, Field, Toast} from "vant";

    export default {
        name: "Login",
        data () {
          return {
              username: '',
              password: '',
              success: '0000'
          }
        },
        components: {
            [NavBar.name]: NavBar,
            [Panel.name]: Panel,
            [Button.name]: Button,
            [Form.name]: Form,
            [Field.name]: Field,
            [Toast.name]: Toast,
        },
        methods: {
            onSubmit(values) {
                const self = this;
                this.$axios({
                    url:'/pyboe/login/login',
                    data: values
                }).then(function (result) {
                    if(self.success == result.headInfo.respCode){
                        self.$router.push('/')
                    }else{
                        Toast(result.headInfo.respMsg);
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .register{
        text-align: center;
    }
</style>
