<template>
  <div id="app" class="div">
    <el-container class="container">
      <el-header class="header" height="65px">
        <span class="title-first">gun</span>
        <span class="title-second">file</span>
      </el-header>
      <el-main class="main">
        <div class="front">
          <router-view v-if="isRouterAlive"></router-view>
        </div>
      </el-main>
    </el-container>
    <div class="right-view">
      <div class="right-photo-box">
        <button
          :class="right_change_view? 'right-photo-views':'right-photo-view'"
          @mouseenter="showRightView"
          @mouseleave="hiddenRightView"
          @mousedown="changeRightView"
        >
          <svg class="icon-view" aria-hidden="true">
           <use xlink:href="#iconyulan"></use>
        </svg>
        </button>
      </div>
      <div class="right-text-box-small" v-show="is_right_view">
        <div class="right-text">
          <p>先预览一下，看看文件效果，再下载呀</p>
        </div>
      </div>
    </div>
    <div class="right_gun">
      <div class="right-photo-box">
        <button
          :class="right_change_gun? 'right-photo-guns':'right-photo-gun'"
          @mouseenter="showRightGun"
          @mouseleave="hiddenRightGun"
          @mousedown="changeRightGun"
        >
        <svg class="icon-right-gun" aria-hidden="true">
           <use xlink:href="#iconanquanzhuye"></use>
        </svg>
        </button>
      </div>
      <div class="right-text-box-small" v-show="is_right_gun">
        <div class="right-text">
          <p>base64对文件进行编码，放心传输文件</p>
        </div>
      </div>
    </div>
    <div class="right_word">
      <div class="right-photo-box">
        <button
          :class="right_change_word? 'right-photo-words':'right-photo-word'"
          @mouseenter="showRightWord"
          @mouseleave="hiddenRightWord"
          @mousedown="changeRightWord"
        >
          <svg class="icon-word" aria-hidden="true">
           <use xlink:href="#icontuandui"></use>
        </svg>
        </button>
      </div>
      <div class="right-text-box-big" v-show="is_right_word">
        <div class="right-text">
          <p>南开大学软件学院2018级本科生：张金毅、任佳琳、刘方圆、李霞、叶至</p>
        </div>
      </div>
    </div>
    <div class="test-text">
      <div class="photo-box">
        <button
          :class="change_text? 'photo-text':'photo-file'"
          @mouseenter="showText"
          @mouseleave="hiddenText"
          @mousedown="changeText"
        >
          <i class="el-icon-document"></i>
        </button>
      </div>
      <div class="text-box" v-show="is_text">
        <div class="text">
          <p>支持多文件传输，单个文件最大可上传60M</p>
        </div>
      </div>
    </div>
    <div class="test-time">
      <div class="photo-box">
        <button
          :class="change_time ? 'photo-times':'photo-time'"
          @mouseenter="showTime"
          @mouseleave="hiddenTime"
          @mousedown="changeTime"
        >
          <i class="el-icon-date"></i>
        </button>
      </div>
      <div id="text-box-time" class="text-box" v-show="is_time">
        <div class="text">
          <p>你可以为你上传的文件添加有效日期和下载次数哦</p>
        </div>
      </div>
    </div>
    <div class="test-password">
      <div class="photo-box">
        <button
          :class="change_password ? 'photo-passwords' : 'photo-password'"
          @mouseenter="showPassword"
          @mouseleave="hiddenPassword"
          @mousedown="changePassword"
        >
          <svg class="icon-gun" aria-hidden="true">
           <use xlink:href="#iconqiangzhi"></use>
        </svg>
        </button>
      </div>
      <div class="text-box" v-show="is_password">
        <div class="text">
          <p>以gun作为为核心技术，实现了去中心化存储文件</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRouterAlive: true,
      is_text: false,
      is_time: false,
      is_password: false,
      change_text: false,
      change_time: false,
      change_password: false,
      right_change_view: false,
      right_change_gun: false,
      right_change_word: false,
      is_right_view: false,
      is_right_gun: false,
      is_right_word: false
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    showText() {
      this.is_text = true;
    },
    hiddenText() {
      this.is_text = false;
      this.change_text = false;
    },
    changeText() {
      this.change_text = true;
    },
    showTime() {
      this.is_time = true;
    },
    hiddenTime() {
      this.is_time = false;
      this.change_time = false;
    },
    changeTime() {
      this.change_time = true;
    },
    showPassword() {
      this.is_password = true;
    },
    hiddenPassword() {
      this.is_password = false;
      this.change_password = false;
    },
    changePassword() {
      this.change_password = true;
    },
    showRightView() {
      this.is_right_view = true;
    },
    hiddenRightView() {
      this.is_right_view = false;
      this.right_change_view = false;
    },
    changeRightView() {
      this.right_change_view = true;
    },
    showRightGun() {
      this.is_right_gun = true;
    },
    hiddenRightGun() {
      this.is_right_gun = false;
      this.right_change_gun = false;
    },
    changeRightGun() {
      this.right_change_gun = true;
    },
    showRightWord() {
      this.is_right_word = true;
    },
    hiddenRightWord() {
      this.is_right_word = false;
      this.right_change_word = false;
    },
    changeRightWord() {
      this.right_change_word = true;
    }
  },
  mounted() { }

};
</script>

<style>
@import "../src/static/image/font/iconfont.css";
body {
  margin: 0;
  height: 100%;
  width: 100%;
  background-color: #bbe4e4;
}
.icon, .icon-gun, .icon-view,.icon-right-gun, .icon-word {
  width: 4em;
  height: 3em;
  fill: currentColor;
  overflow: hidden;
}
.icon-gun {
  margin-top: 5px;
  margin-left: -4px;
}
.icon-view {
  margin-top: 5px;
}
.icon-right-gun {
  margin-left: -2px;
  margin-top: 5px;
}
.icon-word {
  margin-left: -2px;
}
.div {
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 0;
}
.title-first,.title-second {
  height: 55px;
  margin: 0;
  padding-bottom: 10px;
  text-align: center;
  font-family: "TitleFont";
  font-size: 60px;
  line-height: 55px;
  color: #fff;
  letter-spacing: 10px;
}
.title-first {
  margin-right: 25px;
}
.title-second {
  margin-left: 25px;
}
.container {
  margin: 0 auto;
  height: 100%;
  width: 100%;
}
.menu {
  width: 100px;
  margin-right: 80px;
  margin-left: 80px;
  font-size: 22px;
  color: white;
  font-family: "webfont";
}
.divider {
  margin: 0;
  background-color: white;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  background-color: rgba(0, 0, 0, 0);
}
.main {
  padding: 0;
  margin: 0;
}
.front {
  height: 100%;
  width: 100%;
  margin: 0 auto;
}
.photo-file {
  background-color: rgb(192, 146, 215);
}
.photo-text {
  background-color: rgb(159, 82, 84);
}
.photo-time {
  background-color: rgb(218, 137, 93);
}
.photo-times {
  background-color: rgb(205, 203, 124);
}
.photo-password {
  background-color: rgb(103, 190, 95);
}
.photo-passwords {
  background-color: rgb(241, 240, 130);
}
.text-box, .text-box-mall {
  position: absolute;
  left: 90px;
  width: 130px;
  padding: 8px;
  padding-bottom: 0;
  border-radius: 6px;
  box-shadow: 0 6px 16px 0 rgba(56, 56, 56, 0.15);
  background: rgb(255, 255, 255);
}
.text-box {
  height: 70px;
}
.text-box-mall {
  height: 50px;
}
#text-box-time {
  position: absolute;
  right: 100px;
  top: 5px;
}
.text p {
  margin: 0;
  color: rgb(177, 177, 177);
  font: inherit;
  font-size: 14px;
  vertical-align: center;
}
.photo-box:hover .photo-file {
  transform: translate(-4px);
  box-shadow: 4px 4px 20px rgb(194, 133, 230);
  border: 0;
}
.photo-box:hover .photo-time {
  transform: translate(4px);
  box-shadow: 4px 4px 20px rgb(228, 97, 31);
  border: 0;
}
.photo-box:hover .photo-password {
  transform: translateY(-4px);
  box-shadow: 4px 4px 20px rgb(77, 153, 73);
  border: 0;
}
.test-text {
  position: fixed;
  top: 22%;
  right: 70%;
  width: 350px;
  height: 100px;
  transition: 1s;
}
.test-time {
  position: fixed;
  top: 85%;
  right: 70%;
  width: 350px;
  height: 100px;
}
.test-password {
  position: fixed;
  top: 55%;
  right: 75%;
  width: 350px;
  height: 100px;
}
.photo-box > button {
  position: absolute;
  left: 10px;
  width: 60px;
  height: 60px;
  color: #fff;
  border: 0;
  top: 5px;
  border-radius: 50%;
  transition: 0.3s;
  line-height: 18px;
  cursor: pointer;
  outline: none;
}
.photo-box i {
  font-size: 35px;
}
.right-view {
  position: fixed;
  left: 70%;
  top: 22%;
  width: 200px;
  height: 50px;
}
.right_gun {
  position: fixed;
  left: 75%;
  top: 55%;
  width: 200px;
  height: 50px;
}
.right_word {
  position: fixed;
  left: 70%;
  top: 85%;
  width: 200px;
  height: 50px;
}
.right-photo-box > button {
  position: absolute;
  left: 270px;
  width: 60px;
  height: 60px;
  color: #fff;
  border: 0;
  top: 5px;
  border-radius: 50%;
  transition: 0.3s;
  line-height: 18px;
  cursor: pointer;
  outline: none;
}
.right-photo-box i {
  font-size: 35px;
}
.right-photo-view {
  background-color: rgb(245, 198, 192);
}
.right-photo-views {
  background-color: #14979d;
}
.right-photo-gun {
  background-color: rgb(221, 247, 120);
}
.right-photo-guns {
  background-color: #5c5078;
}
.right-photo-word {
  background-color: rgb(255, 221, 76);
}
.right-photo-words {
  background-color: rgb(116, 137, 104);
}
.right-text-box, .right-text-box-small, .right-text-box-big {
  position: absolute;
  left: 110px;
  width: 130px;
  padding: 8px;
  padding-bottom: 0;
  border-radius: 6px;
  box-shadow: 0 6px 16px 0 rgba(56, 56, 56, 0.15);
  background: rgb(255, 255, 255);
}
.right-text-box {
  height: 70px;
}
.right-text-box-big {
  height: 92px;
}
.right-text-box-small {
  height: 50px;
}
.right-text p {
  color: rgb(177, 177, 177);
  margin: 0;
  font: inherit;
  font-size: 14px;
  vertical-align: center;
}
.right-photo-box:hover .right-photo-view {
  transform: translate(4px);
  box-shadow: 4px 4px 20px rgb(252, 160, 148);
  border: 0;
}
.right-photo-box:hover .right-photo-gun {
  transform: translate(4px);
  box-shadow: 4px 4px 20px rgb(186, 230, 11);
  border: 0;
}
.right-photo-box:hover .right-photo-word {
  transform: translate(4px);
  box-shadow: 4px 4px 20px rgb(241, 191, 124);
  border: 0;
}
</style>
