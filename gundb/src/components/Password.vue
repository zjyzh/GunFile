<template>
  <div ip="app" class="password-all">
    <span class="password-tip">请输入文件提取密码:</span>
    <div class="password-div">
      <el-input
        class="password-input"
        placeholder="请输入密码"
        v-model="input"
        show-password
        clearable
        style="width: 340px;"
      ></el-input>
      <div id="password-submit">
        <button
          :class="isPassword ? 'password-submits' : 'password-submit'"
          @click="submit()"
          @mousedown="confirmPassword"
          @mouseup="confirmPasswords"
        >确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Password',
  data: function () {
    return {
      input: '',
      isPassword: false
    };
  },
  methods: {
    submit() {
      this.$emit('check', this.input);
    },
    confirmPassword() {
      this.isPassword = true;
    },
    confirmPasswords() {
      this.isPassword = false;
    }
  }
};
</script>

<style scoped>
.password-all {
  width: 500px;
  height: 100px;
  padding: 5px;
  margin: 200px auto 0 auto;
  border-radius: 10px;
  box-shadow: 6px 6px 12px rgb(80, 145, 142);
  background-color: rgb(207, 236, 235);
}
.password-tip {
  display: block;
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
  font-family: "webfont";
  color: rgb(0, 0, 0);
  font-size: 20px;
}
.password-div {
  display: flex;
  width: 450px;
  align-items: center;
  justify-content: center;
  margin: auto;
}
.password-input {
  font-size: 27px;
  font-weight: bold;
}
#password-submit {
  margin-left: 20px;
}
.password-submit {
  width: 60px;
  height: 40px;
  font-size: 20px;
  color: rgb(77, 82, 95);
  border: 0;
  border-radius: 6px;
  background-color: rgb(231, 245, 224);
  transition: 0.3s;
  outline: none;
}
.password-submits {
  width: 60px;
  height: 40px;
  font-size: 20px;
  color: rgb(77, 82, 95);
  border: 0;
  border-radius: 6px;
  background-color: rgb(103, 190, 93);
  transition: 0.3s;
  outline: none;
}
#password-submit:hover .password-submit {
  transform: translate(-5px);
  box-shadow: 4px 4px 8px rgb(185, 241, 157);
  background-color: rgb(217, 255, 199);
}
</style>
