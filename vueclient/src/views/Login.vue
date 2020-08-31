<template>
  <div class="backlogin" v-loading="pageLoaing">
    <div class="login_box">
      <div class="title">后台登录</div>
      <div>
        <el-input type="text" placeholder="用户名" v-model="username" class="myinput"></el-input>
      </div>
      <div>
        <el-input type="password" placeholder="密码" v-model="password" class="myinput"></el-input>
      </div>
      <div class="login_other"></div>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      pageLoaing: false,
      username: 'admin', /* 先预存测试值，以免手动输入 */
      password: '123456',
      disablebtn: false
    }
  },
  methods: {
    async handleLogin () {
      try {
        this.pageLoaing = true
        console.log('name:', this.username, ' || password:', this.password)
        const data = {
          username: this.username,
          password: this.password
        }
        const res = await this.$api.login.login(data)
        const canL = res.data.code === 200
        console.log(res.data.code)
        if (canL) {
          this.$router.push('./user/HomePage')
        } else {
          this.$message.error('用户名或密码错误') // 待优化 - 区分
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.pageLoaing = false
      }
    }
  }
}
</script>

<style>
  .backlogin {
    padding: 20px;
    text-align: center;
  }
  .login_box {
  }
  .title {
    margin-bottom: 20px;
  }
  .myinput {
    width: 500px;
    margin-bottom: 10px;
  }
</style>
