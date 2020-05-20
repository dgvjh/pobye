<template>
    <div>
        <van-nav-bar
            title="注册"
            @click-left="onClickLeft"
            left-arrow
        />
        <van-form @submit="onSubmit">
            <van-field
                    v-model="username"
                    name="loginName"
                    label="用户名"
                    placeholder="请输入用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="password"
                    type="password"
                    name="loginPwd"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                    v-model="passwordB"
                    type="password"
                    label="确认密码"
                    placeholder="请确认密码"
                    :rules="[{ required: true, message: '请确认密码' }]"
            />
            <van-field
                    v-model="phone"
                    name="phone"
                    label="用户名"
                    placeholder="请输入手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]"
            />
            <van-field
                    v-model="authname"
                    name="name"
                    label="姓名"
                    placeholder="请输入姓名"
                    :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {Button, NavBar, Panel, Form, Field, Toast} from "vant";

    export default {
        name: "Register",
        data () {
            return {
                username: '',
                password: '',
                authname: '',
                phone: '',
                passwordB: '',
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
            onSubmit() {
                const self = this;
                if(this.password != this.passwordB){
                    Toast('两次输入的密码不一致！')
                }
                this.$axios({
                    url:'/pyboe/register/register',
                    data: {
                        loginName: this.username,
                        loginPwd: this.password,
                        phone: this.phone,
                        name: this.authname
                    }
                }).then(function (result) {
                    if('0000' == result.headInfo.respCode){
                        self.$router.push('/login')
                    }else{
                        Toast(result.headInfo.respMsg);
                    }
                })
            },
            onClickLeft(){
                this.$router.push('/login')
            }
        },
    }
</script>

<style scoped>
    .register{
        text-align: center;
    }
</style>
