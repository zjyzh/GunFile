<template>
  <div class="mainboard" ref='mainboard'>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <div :class="types === 'upload'?'file upload-file':'file download-file'">
      <slot name="uploadFile"></slot>
    </div>
    <div class="layout">
      <div>
        <slot name="uploadTitle"></slot>
      </div>
      <div :class="types === 'upload'?'option upload-option':'option'">
        <slot name="uploadOption"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    types: {
      type: String,
      default: 'upload'
    }
  },
  name: 'GunPanel',
  mounted: function () {
  },
  methods: {
  }
};
</script>

<style>
.mainboard {
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-flow: row;
  margin-left: auto;
  margin-right: auto;
  min-width: 800px;
  min-height: 480px;
  margin-top: 60px;
  border-radius: 15px;
  box-shadow: 0 16px 48px 0 rgba(0, 0, 0, 0.25);
  background: linear-gradient(to bottom right, #f7dbd7, #feebca);
  background-color: #fcf0ea;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
}
.mainboard:hover {
  margin-top: 70px;
  box-shadow: 0 16px 48px 0 rgba(0, 0, 0, 0.4);
}
div {
  font-family: "webfont";
  font-size: 22px;
}
.file {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid white;
}
.download-file {
  justify-content: center;
  min-width: 35%;
}
.upload-file {
  width: 100%;
}
.layout {
  width: 65%;
}
.option {
  width: 90%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  padding-left: 10%;
}
.upload-option {
  margin-top: 20px;
  justify-content: center;
}

@keyframes bg-color {
  0% {
    background: linear-gradient(to bottom right, #f7dbd7, #feebca);
  }
  25% {
    background: linear-gradient(to bottom left, #f7dbd7, #feebca);
  }
  50% {
    background: linear-gradient(to bottom right, #feebca, #f7dbd7);
  }
  75% {
    background: linear-gradient(to bottom left, #feebca, #f7dbd7);
  }
  100% {
    background: linear-gradient(to bottom right, #f7dbd7, #feebca);
  }
}

@media screen and (max-width: 1080px) {
  .mainboard {
    align-items: center;
    justify-content: center;
    flex-flow: column;
    min-width: 475px;
    min-height: 648px;
    height: 100%;
  }
  .download-file {
    border: 0;
  }
  .layout {
    width: 75%;
  }
  .upload-file {
    width: 100%;
    margin-top: -80px;
    border: 0;
  }
  .option {
    width: 100%;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    padding-left: 10%;
  }
  .upload-option {
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .mainboard:hover {
    margin-top: 5rem;
    box-shadow: 0 16px 48px 0 rgba(0, 0, 0, 0.4);
  }
}
</style>
