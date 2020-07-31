<template>
  <div class="link-layout">
    <span class="link-tip">文件链接如下:</span>
    <div class="link-text">
      <input type="text" id="link-content" v-model="link" />
      <div id="copy-link">
        <input type="submit" value="复制" class="copy-link" @click="copy" />
      </div>
      <div id="close-link">
        <input type="submit" value="关闭" class="close-link" @click="close" />
      </div>
    </div>
    <div class='pageID'>
      <span class='ID'>如果你使用客户端,pageID为：</span>
      <span class='ID'>{{link.substring(33)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'linkbox',
  props: {
    link: {
      type: String,
      default: 'http://localhost:8080/#/ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    }
  },
  mounted: function () {
  },
  methods: {
    copy() {
      var copycode = document.getElementById('link-content');
      copycode.select();
      document.execCommand('Copy');
      return copycode.value;
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.pageID {
  padding-left: 10px;
}
.ID {
  font-size: 15px;
  font-family: "webfont";
}
.link-layout {
  width: 550px;
  height: 120px;
  padding: 5px;
  margin: 200px auto 0 auto;
  border-radius: 10px;
  box-shadow: 6px 6px 12px rgb(80, 145, 142);
  background-color: rgb(207, 236, 235);
}
.link-layout div {
  display: flex;
}
.link-tip {
  display: block;
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
  font-family: "webfont";
  color: rgb(0, 0, 0);
  font-size: 20px;
}
#link-content {
  padding-left: 5px;
  width: 80%;
  height: 40px;
  border: 0;
  margin-left: 10px;
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  outline: none;
  color: rgb(255, 255, 255);
  border-radius: 2px;
  background-color: rgba(180, 180, 180, 0.55);
}
.copy-link, .close-link {
  width: 60px;
  font-family: "webfont";
  height: 40px;
  margin-left: 20px;
  font-size: 20px;
  color: rgb(77, 82, 95);
  border: 0;
  border-radius: 6px;
  background-color: rgb(231, 245, 224);
  transition: 0.5s;
  outline: none;
}
#copy-link:hover .copy-link {
  transform: translate(-2px);
  box-shadow: 3px 3px 10px rgb(185, 241, 157);
  background-color: rgb(221, 248, 207);
}
#close-link:hover .close-link {
  transform: translate(-2px);
  box-shadow: 3px 3px 10px rgb(185, 241, 157);
  background-color: rgb(221, 248, 207);
}
</style>
