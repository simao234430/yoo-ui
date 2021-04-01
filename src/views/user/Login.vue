<template>
  <div class="main">
    <a-form :form="form" class="user-layout-login" ref="formLogin" id="formLogin">
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick">
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-form-item>
            <a-input
              size="large"
              v-decorator="['username',validatorRules.username,{ validator: this.handleUsernameOrEmail }]"
              type="text"
              placeholder="请输入帐户名 / admin">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              v-decorator="['password',validatorRules.password]"
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码 / 123456">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-row :gutter="0">
            <a-col :span="16">
              <a-form-item>
                <a-input
                  v-decorator="['inputCode',validatorRules.inputCode]"
                  size="large"
                  type="text"
                  @change="inputCodeChange"
                  placeholder="请输入验证码">
                  <a-icon slot="prefix" type="smile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8" style="text-align: right">
              <img v-if="requestCodeSuccess" style="margin-top: 2px;" :src="randCodeImage" @click="handleChangeCheckCode"/>
              <img v-else style="margin-top: 2px;" src="../../assets/checkcode.png" @click="handleChangeCheckCode"/>
            </a-col>
          </a-row>

        </a-tab-pane>
        <a-tab-pane key="tab2" tab="手机号登录">
          2
        </a-tab-pane>
      </a-tabs>


      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', {initialValue: true, valuePropName: 'checked'}]" >自动登录</a-checkbox>
        <router-link :to="{ name: 'alteration'}" class="forge-password" style="float: right;">
          忘记密码
        </router-link>
       <router-link :to="{ name: 'register'}" class="forge-password" style="float: right;margin-right: 10px" >
          注册账户
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="loginBtn">确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {getAction } from '@/api/manage'
import { mapActions } from "vuex"
import { timeFix } from "@/utils/util"
export default {
  components: {},
  data() {
    return {
      currdatetime:'',
      inputCodeContent:"",
      randCodeImage:'',
      inputCodeNull:true,
      requestCodeSuccess:false,
      form: this.$form.createForm(this),
      customActiveKey: "tab1",
      loginBtn: false,
      validatorRules:{
        username:{rules: [{ required: true, message: '请输入用户名!'},{validator: this.handleUsernameOrEmail}]},
        password:{rules: [{ required: true, message: '请输入密码!',validator: 'click'}]},
        mobile:{rules: [{validator:this.validateMobile}]},
        captcha:{rule: [{ required: true, message: '请输入验证码!'}]},
        inputCode:{rules: [{ required: true, message: '请输入验证码!'}]}
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
      ...mapActions(['Login']),
      requestFailed (err) {
        this.$notification[ 'error' ]({
          message: '登录失败',
          description: ((err.response || {}).data || {}).message || err.message || "请求出现错误，请稍后再试",
          duration: 4,
        });
        this.loginBtn = false;
      },
      loginSuccess () {
        this.$router.push({ path: "/dashboard/analysis" }).catch(()=>{
          console.log('登录跳转首页出错,这个错误从哪里来的')
        })
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`,
        });
      },
      handleSubmit () {
        let that = this
        let loginParams = {};
        that.loginBtn = true;
        // 使用账户密码登录
        if (that.customActiveKey === 'tab1') {
          that.form.validateFields([ 'username', 'password','inputCode', 'rememberMe' ], { force: true }, (err, values) => {
            if (!err) {
              loginParams.username = values.username
              // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
              //loginParams.password = md5(values.password)
              //loginParams.password = encryption(values.password,that.encryptedString.key,that.encryptedString.iv)
              loginParams.password = values.password
              loginParams.remember_me = values.rememberMe
              // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
              loginParams.captcha = that.inputCodeContent
              loginParams.checkKey = that.currdatetime
              console.log("登录参数",loginParams)
              that.Login(loginParams).then((res) => {
                console.log(res)
                this.loginSuccess()
              }).catch((err) => {
                that.requestFailed(err);
              });


            }else {
              that.loginBtn = false;
            }
          })
        }
      },
      handleChangeCheckCode(){
        this.currdatetime = new Date().getTime();
        getAction(`/sys/randomImage/${this.currdatetime}`).then(res=>{
          if(res.success){
            this.randCodeImage = res.result
            this.requestCodeSuccess=true
          }else{
            this.$message.error(res.message)
            this.requestCodeSuccess=false
          }
        }).catch(()=>{
          this.requestCodeSuccess=false
        })
      },
      // handler
      handleUsernameOrEmail (rule, value, callback) {
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (regex.test(value)) {
          this.loginType = 0
        } else {
          this.loginType = 1
        }
        callback()
      },
      handleTabClick (key) {
        this.customActiveKey = key
        // this.form.resetFields()
      },
      inputCodeChange(e){
        this.inputCodeContent = e.target.value
      }
  },
  created() {
    this.currdatetime = new Date().getTime();
    this.handleChangeCheckCode();
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {}
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0,0,0,.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color .3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
