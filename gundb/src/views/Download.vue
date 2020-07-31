<template>
  <div ip="app" class="all">
    <div id="go-upload">
      <button
        :class="isGoUpload ? 'go-uploads' : 'go-upload'"
        @click="goUpload"
        @mousedown="changeGoUpload"
        @mouseup="changeGoUploads"
      >去上传</button>
    </div>
    <el-container class="container">
      <gun-panel :types="types">
        <div class="aside" slot="uploadFile">
          <label class="fileinfo">文件有效天数:{{ fileValidityTime }}</label>
          <label class="fileinfo">剩余下载次数:{{ downloadNum }}</label>
          <label class="fileinfo">文件上传时间:</label>
          <label class="date">{{ date }}</label>
        </div>
        <div slot="uploadTitle">
          <p class="previewbTitle">Files</p>
        </div>
        <div class="main" slot="uploadOption">
          <div class="progress_barbox" v-show="number>0">
            <el-progress class="progress_bar" :stroke-width="3" color="black" :percentage="number"></el-progress>
          </div>
          <ul class="previewItem">
            <li
              :class="selected_num === index?'hasborder':'noborder'"
              @mouseenter="selected(index)"
              @mouseleave="cancel_select"
              v-for=" (item,index) in  myfilelist" :key="item"
            >
              <i class="el-icon-document"></i>
              <a :class="screenWidth > 1080?'href big':'href small'" :href= currentLink @click="downloadfile(item)">{{ item }}</a>
              <button
                v-show="selected_num === index"
                @mouseenter="move(index)"
                @mouseleave="cancel_move"
                :class="selected_button === index?'preview_button move':'preview_button not_move'"
                @click="previewfile(item)"
              >预览</button>
            </li>
          </ul>
        </div>
      </gun-panel>
      <div :class="show ? 'message_box' : 'message_box unshow'">
        <Password @check="check"></Password>
      </div>
      <div :class="show_preview? 'imag_preview':'unshow'">
        <preview-image ref="image_view" @closeImage="closeImage"></preview-image>
      </div>
      <div v-show="ispreview_pdf">
        <preview-pdf ref="preview_pdf" @closePdf="closePdf"></preview-pdf>
      </div>
    </el-container>
  </div>
</template>
<script src='https://cdn.jsdelivr.net/npm/gun/gun.js'></script>
<script src='https://cdn.jsdelivr.net/npm/gun/sea.js'></script>
<script>
import Password from '@/components/Password.vue';
import previewImage from '../components/PreviewImage.vue';
import previewPdf from '../components/PreviewPdf.vue';
import common from '../assets/common.vue';
import GunPanel from '../components/GunPanel.vue';
export default {
  inject: ['reload'],
  name: 'Download',
  components: {
    Password,
    previewImage,
    previewPdf,
    GunPanel
  },
  data() {
    return {
      screenWidth: null,
      date: null,
      types: 'download',
      selected_num: null,
      selected_button: null,
      show: false,// 输入窗口是否弹出
      size: undefined,// 窗口的大小
      input_password: '',// 输入的密码
      myfilelist: [],// 存储文件名字的列表
      pageID: '0',// 唯一的网页标识
      number: 0,// 进度条的百分比
      downloadNum: undefined, //文件下载次数
      fileValidityTime: undefined,// 文件有效天数
      isDownload: false,// 是否下载了文件
      createTime: '',// 文件创建时间
      ispreview_pdf: false,// 是否预览pdf
      show_preview: false,// 是否显示预览框
      isGoUpload: false,
      currentLink: ''// 当前页面的链接
    };
  },
  mounted: function () {
    const tempThis = this;
    tempThis.currentLink = window.location.href
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
    if (this.$route.path === '/download') {
      this.showInput = true;
    };
    tempThis.$message({
          message: '如果您看不到文件加载页面，可能是数据库的延迟，请耐心等待或刷新',
          center: true,
          duration: 1500
        });
    tempThis.pageID = this.$route.params.id
    tempThis.$gun.get('password').get(tempThis.pageID).load(function (data){
      if(data == undefined){
        tempThis.toUpload()
      }
    })
    tempThis.$gun.get('pageIDwithFilename').get(tempThis.pageID).load(function (data) {
      if (data === undefined){
        tempThis.toUpload()// 跳转到上传界面
      }
      tempThis.$gun.get('password').get(tempThis.pageID).load(function (data) {
        if (data['password'] !== '') {
          tempThis.input_password = data['password'];
          tempThis.show = true;
        }
      })
      tempThis.downloadNum = data['downloadNum'];
      tempThis.fileValidityTime = data['fileValidityTime'];
      const createTime = data['createTime']
      tempThis.date = createTime
      tempThis.getFileList(data)// 拿到所有文件名字
      tempThis.checkFileValidity();// 检测文件下载次数
      const diff = tempThis.diffdate(createTime)// 检测文件有效日期
    }).then(succeed => {
      if(succeed === undefined){
        tempThis.toUpload() // 这个代表文件失效时候，自动跳转到上传界面
      }
    }, failure => {
      console.log('failurewith' , failure)
    })
  },
  methods: {
    goUpload() {// 点击按钮去上传界面
      if (this.number !== 0) {
        this.$message({
          message: '有文件正在下载，请稍后……',
          center: true,
          duration: 900
        });
        return false;
      } else {
        this.$router.replace('/');
      }
    },
    clearFile(){ // 如果链接过期或者下载次数没了，清空文件
      const tempThis = this
      for (let i = 0; i < tempThis.myfilelist.length; i++) {
        let name = tempThis.myfilelist[i]
        tempThis.$gun.get('myfiles').get(tempThis.pageID + name).put(null)
        tempThis.$gun.get('myfiles').get(tempThis.pageID + name).once(function(data) {
          console.log(data)
        })
      }
      tempThis.$gun.get('pageIDwithFilename').get(tempThis.pageID).put(null)
      tempThis.$gun.get('pageIDwithFilename').get(tempThis.pageID).once(function(data) {
        console.log(data)
      })
      tempThis.$gun.get('password').get(tempThis.pageID).put(null)
      tempThis.$gun.get('password').get(tempThis.pageID).once(function(data) {
        console.log(data)
      })
    },
    toUpload(){// 强制去上传界面，因为链接等原因
      const tempThis = this
      tempThis.$message({
          message: '链接不存在或已过期，请重新尝试，现在跳转到上传界面......',
          center: true,
          duration: 1500
        });
        this.$router.replace('/');
    },
    changeGoUpload() {// 是否屏蔽按钮
      this.isGoUpload = true;
    },
    changeGoUploads() {
      this.isGoUpload = false;
    },
    closeImage() { // 关闭图片预览
      this.show_preview = false;
    },
    closePdf() {
      this.ispreview_pdf = false;
    },
    previewfile(filename) { // 预览函数入口
      const tempThis = this;
      tempThis.$gun.get('myfiles').get(tempThis.pageID + filename).on(function (data) {
        tempThis.size = data['size'];
      })
      // 获取文件后缀，并将文件后缀名变为小写
      let fileExtension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
      // 存储图片文件后缀名字以及pdf
      let fileExtensionArray = new Array("png","jpg","jpeg","bmp","gif","pdf");
      Array.prototype.contain = function(obj){
        const tempThis = this
          for(let i=0; i<tempThis.length; i++){
              if(tempThis[i] === obj){
                  return true;
              }
          }
          return false;
      };
      if (this.size > 10777216) {
        tempThis.$message({
          message: '文件超过10M，暂不支持预览',
          center: true,
          duration: 1500
        });
        return false
      } else if(fileExtensionArray.contain(fileExtension)){
        tempThis.downloadFileOption(filename, false)
      } else {
        tempThis.$message({
          message: '不支持预览的文件，只能预览图片或pdf',
          center: true,
          duration: 1500
        });
      }
    },
    diffdate(date1) { // 检查时间的偏移，看看是否过期了
      const tempThis = this
      let now = new Date()
      let past = new Date(date1)
      let diff =  (now.getTime() - past.getTime()) / (24 * 60 * 60 * 1000);
      if (diff > tempThis.fileValidityTime) {
        tempThis.clearFile()
        tempThis.$message({
          message: '文件可能过期',
          center: true,
          duration: 900
        });
        tempThis.$message({
          message: '文件有效天数为:' + tempThis.fileValidityTime,
          center: true,
          duration: 900
        });
        tempThis.$message({
          message: '已经过了' + diff + '天',
          center: true,
          duration: 900
        });
        this.$router.replace('/')
      }
    },
    checkFileValidity()//检查文件的有效信息
    {
      const tempThis = this
      if (tempThis.downloadNum > 0) {
        tempThis.$message({
          message: '下载次数:' + tempThis.downloadNum,
          center: true,
          duration: 900
        });
      } else {
        tempThis.clearFile()
        tempThis.$message({
          message: '文件已经达到最大下载次数',
          center: true,
          duration: 900
        });
        this.$router.replace('/');
      }
    },
    selected(index) {
      this.selected_num = index;
    },
    cancel_select() {
      this.selected_num = null;
    },
    move(index) {
      this.selected_button = index;
    },
    cancel_move() {
      this.selected_button = null;
    },
    check(input) {
      const tempThis = this
      if (common.bcrypt.compareSync(input, this.input_password)) {
        tempThis.$message({
          message: '密码正确',
          center: true,
          duration: 900
        });
        this.show = false;
      } else {
        tempThis.$message({
          message: '密码错误，请重新输入',
          center: true,
          duration: 900
        });
      }
    },
    downloadfile(filename) {
      const tempThis = this;
      if (this.number !== 0) {
        this.$message({
          message: '有文件正在下载，请稍后……',
          center: true,
          duration: 900
        });
        return false;
      }
      if (!this.isDownload) {
        let temp_data = {};
        tempThis.$gun.get('pageIDwithFilename').get(tempThis.pageID).once(function (data) {
          temp_data = data;
          temp_data['downloadNum'] = data['downloadNum'] - 1;
          if (temp_data['downloadNum'] <= 0 ) {
            tempThis.downloadNum = 0;
          } else {
            tempThis.downloadNum = temp_data['downloadNum'];
          }
        })
        tempThis.$gun.get('pageIDwithFilename').get(tempThis.pageID).put(temp_data);
        tempThis.$gun.get('pageIDwithFilename').get(tempThis.pageID).on(function (data) {
        })
      }
      this.isDownload = true;
      tempThis.downloadFileOption(filename, true)
    },
    downloadFileOption(filename, ShowProgerss) {
      if (this.number !== 0) {
        this.$message({
          message: '有文件正在预览或下载，请稍后……',
          center: true,
          duration: 900
        });
        return false;
      }
      const tempThis = this
      let fileObj;
      let fileNum;
      let filename1 = tempThis.pageID + filename
      tempThis.$gun.get('myfiles').get(filename1).load(function (data) {
        fileNum = data['filenum'];
        fileObj = data;
        let myfileList = [];
        for (let i = 0; i < fileNum; i++) {
          (function (i) {
            setTimeout(function () {
                myfileList.splice(i, 0, fileObj['fileOrder' + i]);
                tempThis.show_progress = true
                let part = 100 / (fileNum + 1)
                tempThis.number = parseInt( part * (i+1) )
                console.log(i)
                if (i === fileNum - 1) {
                  tempThis.show_progress = false;
                  tempThis.number = 0;
                  const fileContent = myfileList.join('');
                  tempThis.downloadFileByBase64(fileContent, filename, ShowProgerss);
                  if (ShowProgerss === true) {
                    tempThis.number = 100;
                    tempThis.$message({
                      message: '下载完成',
                      center: true,
                      duration: 900
                    });
                    tempThis.show_progress = false;
                    tempThis.number = 0;
                  }
                  myfileList = [];
                }
            }, (i + 1) * 300);
          })(i);
        }
      })
    },
    dataURLtoBlob(dataurl) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    downloadFile(url, name = '') {
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', name);
      a.setAttribute('target', '#');
      const clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent('click', true, true);
      a.dispatchEvent(clickEvent);
    },
    downloadFileByBase64(base64, name, ShowProgerss) {
      const myBlob = this.dataURLtoBlob(base64);
      let str;
      str = myBlob.type.split('/');
      const myUrl = URL.createObjectURL(myBlob);
      if (ShowProgerss) {
        this.downloadFile(myUrl, name);
      } else {
        if (str[0] === 'image') {
          // 进入图片预览
          this.$refs.image_view.previewImagess(myUrl);
          this.show_preview = true;
        }
        else if (str[1] === 'pdf') {
          // 进入pdf预览
          this.$refs.preview_pdf.previewPdf(myUrl);
          this.ispreview_pdf = true;
        }
      }
    },
    getFileList(FileObj) {
      if (FileObj === undefined || FileObj === null) {
        return []
      }
      const tempThis = this
      const fileNum = FileObj.numberOfFile
      for (let i = 1; i <= fileNum; i++) {
        let filename = 'filename' + i
        if (FileObj[filename] !== undefined && FileObj[filename] !== null) {
          tempThis.myfilelist.push(FileObj[filename])
        }
      }
      tempThis.downloadNum = FileObj['downloadNum']
      tempThis.fileValidityTime = FileObj['fileValidityTime']
      return tempThis.myfilelist
    }
  }
};
</script>
<style scoped>
div {
  font-family: 'webfont';
}
.message_box {
  z-index: 1;
  position: absolute;
  height: 100%;
  width: 100%;
  border: 10px;
}
.progress_box {
  z-index: 2;
  position: absolute;
  height: 40%;
  width: 75%;
}
.imag_preview {
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
}
.date {
  margin-top: -30px;
  font-family: 'webfont';
  font-size: 16px;
  color: black;
}
.unshow {
  display: none;
}
.hasborder {
  padding: 1px;
  box-shadow: 3px 3px 1px 1px rgba(155, 155, 155, 0.3);
  transition: 0.4s;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-left: 10px;
  background-color: rgba(187, 228, 228, 0.2);
  border: 1px;
  border-radius: 5px;
}
.move {
  margin-right: 8px;
}
.not_move {
  margin-right: 15px;
}
.noborder {
  transition: 0.5s;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border: 0;
}
.fileinfo {
  margin-top: 40px;
  margin-bottom: 40px;
  font-family: 'webfont';
  font-size: 18px;
  color: black;
}
.el-icon-document {
  margin-left: 5px;
  color: #909399;
  font-size: 14px;
}
.href {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;
  color: #606266;
  box-sizing: border-box;
  line-height: 1.8;
  font-size: 17px;
  margin-left: 10px;
  margin-right: 30px;
}
.big {
  width: 300px;
}
.small {
  width: 200px;
}
.progress_bar {
  width: 100%;
  margin: 0 auto;
  margin-left: 20px;
  font-size: 1px;
}
.progress_barbox {
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: -5px;
  width: 70%;
  height: 12%;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
}
.aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.previewbTitle {
  margin: 0;
  margin-top: 30px;
  letter-spacing: 8px;
  font-family: 'FileFont';
  color: #999;
  font-size: 45px;
  align-self: center;
  text-align: center;
}
.preview_button {
  margin-left: auto;
  outline: none;
  width: 58px;
  padding: 0 0 0 4px;
  letter-spacing: 4px;
  height: 25px;
  font-size: 14px;
  color: rgb (77, 82, 95);
  border: 0;
  border-radius: 6px;
  background-color: rgb(231, 245, 224);
  transition: 0.5s;
}
.previewItem {
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  margin-left: -14%;
  font-size: 20px;
  color: white;
  font-family: 'webfont';
}
#go-upload {
  position: absolute;
  top: 75px;
  left: 1%;
}
.go-upload {
  width: 110px;
  height: 40px;
  font-size: 23px;
  letter-spacing: 4px;
  line-height: 40px;
  color: #fff;
  border: 0;
  border-radius: 6px;
  outline: none;
  background: rgba(221, 172, 184, 0.6);
}
.go-uploads {
  width: 121px;
  height: 44px;
  font-size: 25px;
  letter-spacing: 4px;
  line-height: 44px;
  color: #fff;
  border: 0;
  border-radius: 6px;
  outline: none;
  background-color: yellowgreen;
}
#go-upload:hover .go-upload {
  transform: scale(1.1) translate(2px);
  box-shadow: 4px 4px 8px rgb(156, 134, 139);
  background-color: rgba(221, 172, 184);
}
</style>
