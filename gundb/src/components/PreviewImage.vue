<template>
<div class="picture">
  <button @click="closeImage">关闭预览</button>
    <viewer class="image-preview">
          <img  class="image" :src="url">
    </viewer>
</div>
</template>

<script>
export default {
  name: 'PreviewImage',
  data: function () {
    return {
      url: '//string'
    };
  },
  methods: {
    previewImagess(myurl) {
      this.url = myurl;
    },
    closeImage() {
      this.$emit('closeImage');
    }
  }
};
</script>
<style scoped>
div {
  width: 800px;
  height: 450px;
  margin-top: 10px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(207, 236, 235);
}
.picture {
  margin-top: 50px;
}
button {
  width: 100px;
  height: 40px;
  font-size: 20px;
  color: rgb(170, 111, 111);
  border: 0;
  margin-left: 685px;
  margin-top: 10px;
  border-radius: 6px;
  background-color: rgb(232, 235, 111);
  outline: none;
}
.picture:hover button {
  transform: translate(-2px);
  box-shadow: 4px 4px 10px rgb(147, 148, 88);
  background-color: rgb(226, 230, 27);
}
.image-preview {
  display: flex;
  align-items: center;
}
.image {
  margin: auto;
  width: 16rem;
}
</style>
