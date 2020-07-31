<template>
  <div>
    <div class="main">
      <div :class="show ? 'linkshow' : 'linkshow unshow'">
        <linkbox @close="close" :link="linked"></linkbox>
      </div>
      <gun-panel>
        <section slot="uploadFile">
          <el-upload
            :disabled="disabled"
            class="upload-demo"
            ref="upload"
            action
            :on-remove="handleRemove"
            :file-list="fileList"
            :before-remove="beforeRemove"
            :on-change="uploadFile"
            :auto-upload="false"
          >
            <div class="upload-layout">
              <div id="confirm-file">
                <button
                  @click="canclick"
                  :class="is_confirm_file ? 'confirm-files' : 'confirm-file'"
                  slot="trigger"
                  @mousedown="changeChooseFile"
                  @mouseup="changeChooseFiles"
                >
                  <i class="el-icon-folder-add"></i>
                </button>
              </div>
            </div>
            <div slot="tip" class="el-upload-tip">上传文件不超过60M</div>
          </el-upload>
          <div class="progress-bar" v-show="number>0">
            <el-progress
              class="progress-inner"
              :stroke-width="3"
              color="black"
              :percentage="number"
            ></el-progress>
          </div>
        </section>
        <div slot="uploadOption">
          <div class="upload-option">
            <section>
              <form id="pass-table">
                <label>是否有密码 :</label>
                <input class="select" type="radio" name="pass" value="1" v-model="select_status" />是
                <input class="select" type="radio" name="pass" value="0" v-model="select_status" />否
              </form>
              <p class="password" v-if="new_status==1">
                <label>请输入密码 :</label>
                <input class="input-password" type="text" name="password" v-model="input_password" />
              </p>
            </section>
            <section class="download-amount">
              <label>下载次数:</label>
              <select v-model="downloadNum" id="download-amount">
                <option>1</option>
                <option>2</option>
                <option>5</option>
                <option>8</option>
                <option>10</option>
              </select>
            </section>
            <section class="validity">
              <label>有效日期:</label>
              <select id="validity" v-model="fileValidityTime">
                <option value="1">1天</option>
                <option value="3">3天</option>
                <option value="5">5天</option>
                <option value="7">7天</option>
                <option value="10">10天</option>
              </select>
            </section>
            <div class="upload-layouts">
              <div id="sure-file">
                <button
                  :class="confirm_file ? 'sure-files' : 'sure-file'"
                  @click="confirm"
                  @mousedown="changeSureFile"
                  @mouseup="changeSureFiles"
                >确认上传</button>
              </div>
            </div>
          </div>
        </div>
      </gun-panel>
    </div>
  </div>
</template>

// 下面的函数是利用RED的API，突破本地存储限制

<script src='https://cdn.jsdelivr.net/npm/gun/gun.js'></script>
<script src='https://cdn.jsdelivr.net/npm/gun/lib/radix.js'></script>
<script src='https://cdn.jsdelivr.net/npm/gun/lib/radisk.js'></script>
<script src='https://cdn.jsdelivr.net/npm/gun/lib/store.js'></script>
<script src='https://cdn.jsdelivr.net/npm/gun/lib/rindexed.js'></script>
<script>
import Linkbox from '../components/Linkbox.vue';
import Common from '../assets/common.vue';
import GunPanel from '../components/GunPanel.vue'
export default {
  inject: ['reload'],
  name: 'Upload',
  components: {
    Linkbox,
    GunPanel
  },
  data: function () {
    return {
      disabled: false,
      id: null,
      hasalert: false,
      isBig: false,
      file_num: 0,
      linked: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
      input_password: 'gundb',
      select_status: 0,
      new_status: 0,
      number: 0,
      numberOfFile: 0,
      show: false,
      pageID: '0',
      pageIDwithFilename: {},
      downloadNum: 1,
      fileValidityTime: 1,
      fileList: [],
      myFileList: {},//自定义的文件列表，用来判断是否有重复文件，采用键值对的方式
      confirm_file: false,
      is_confirm_file: false,
      isGoDownload: false
    }
  },
  methods: {
    close () {
      this.show = false;
      this.reload();
      return true;
    },
    changeSureFile () {
      this.confirm_file = true;
    },
    changeSureFiles () {
      this.confirm_file = false;
    },
    changeChooseFile () {
      this.is_confirm_file = true;
    },
    changeChooseFiles () {
      const tempThis = this
      setTimeout(() => {
        tempThis.is_confirm_file = false;
      }, 2000);
    },
    beforeRemove (file, fileList) {
      if (!this.isBig) {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    },
    handleRemove (file, fileList) {
      const tempThis = this
      console.log('删除')
      if (file.isDelete === undefined) {
        tempThis.myFileList[file.name] = undefined
        tempThis.isBig = true
        let temp;
        tempThis.$gun.get('myfiles').get(tempThis.pageID + file.name).once(function (data) {
          temp = data
        })
        if (temp !== null && temp !== undefined) {
          tempThis.file_num--;
        }
        for (let i = 1; i <= tempThis.numberOfFile; i++) {
          if (tempThis.pageIDwithFilename['filename' + i] === file.name) {
            tempThis.pageIDwithFilename['filename' + i] = null;
          }
        }
        tempThis.$gun.get('myfiles').get(tempThis.pageID + file.name).put(null)
      }
    },
    randomString (len) {
      len = len || 32;
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      var maxPos = $chars.length;
      var pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          fileResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(fileResult)
        }
      })
    },
    SplitBase64 (str, num = 2000000) {
      if (str == null || str == undefined) return null;
      if (!(/^[0-9]*[1-9][0-9]*$/.test(num))) return null;
      let array = new Array();
      let len = str.length;
      for (let i = 0; i < (len / num); i++) {
        if ((i + 1) * num > len) {
          array.push(str.substring(i * num, len));
        } else {
          array.push(str.substring(i * num, (i + 1) * num));
        }
      }
      return array;
    },
    canclick () {
      if (this.number !== 0) {
        this.$message({
          message: '有文件正在上传，请稍后……',
          center: true,
          duration: 900
        });
        return true;
      }
    },
    confirm () {
      const tempThis = this
      if (tempThis.file_num <= 0) {
        tempThis.$message({
          message: '请选择要传输的文件',
          center: true,
          duration: 900
        });
        return true;
      }
      if (tempThis.select_status != 0 && tempThis.input_password === '') {
        tempThis.$message({
          message: '密码不能为空',
          center: true,
          duration: 900
        });
        return true;
      }
      if (tempThis.number !== 0) {
        tempThis.$message({
          message: '有文件正在上传，请稍后……',
          center: true,
          duration: 900
        });
        return true;
      }
      tempThis.confirm_file = true
      tempThis.linked = window.location.href + 'download/' + tempThis.pageID;
      let temp = {};
      temp['pageID'] = tempThis.pageID;
      var salt = Common.bcrypt.genSaltSync(12);
      var hash = Common.bcrypt.hashSync(tempThis.input_password, salt);
      if (tempThis.new_status != 0) {
        temp['password'] = hash;
      } else {
        temp['password'] = '';
      }
      tempThis.$gun.get('password').get(tempThis.pageID).put(temp);
      tempThis.$gun.get('password').get(tempThis.pageID).on(function (data) {
      })
      tempThis.pageIDwithFilename['createTime'] = tempThis.getCurrentDate(2)
      tempThis.pageIDwithFilename['downloadNum'] = tempThis.downloadNum
      tempThis.pageIDwithFilename['fileValidityTime'] = tempThis.fileValidityTime
      tempThis.$gun.get('pageIDwithFilename').get(tempThis.pageID).put(tempThis.pageIDwithFilename)
      tempThis.$gun.get('pageIDwithFilename').get(tempThis.pageID).once(function (data) {
      })
      tempThis.uploadFileInfo()
      tempThis.show = true;
    },
    getCurrentDate (format) {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth();
      var date = now.getDate();
      var day = now.getDay();
      var hour = now.getHours();
      var minu = now.getMinutes();
      var sec = now.getSeconds();
      month = month + 1;
      if (month < 10) month = '0' + month;
      if (date < 10) date = '0' + date;
      if (hour < 10) hour = '0' + hour;
      if (minu < 10) minu = '0' + minu;
      if (sec < 10) sec = '0' + sec;
      var time = '';
      if (format == 1) {
        time = year + '-' + month + '-' + date;
      }
      else if (format == 2) {
        time = year + '-' + month + '-' + date + ' ' + hour + ':' + minu + ':' + sec;
      }
      return time;
    },
    uploadFilePart (fileName, fileContent, i) {
      let tempThis = this
      let file_count = fileContent.length
      const dataName = 'fileOrder' + i
      let tempObj = {}
      tempObj[dataName] = fileContent[i]
      tempThis.$gun.get('myfiles').get(tempThis.pageID + fileName).put(tempObj, function (ack) {
        if (i === file_count - 1) {
          clearInterval(tempThis.id);
          tempThis.number = 100
          tempThis.$message({
            message: '文件上传成功',
            center: true,
            duration: 1200
          });
          tempThis.uploadFileInfo(fileName)
          tempThis.number = 0
        }
      });
      tempThis.$gun.get('myfiles').get(tempThis.pageID + fileName).once(function (data) {
      });
    },
    uploadFileInfo (filename) {
      const tempThis = this
      if (filename !== null) {
        tempThis.numberOfFile += 1
        tempThis.pageIDwithFilename['filename' + (tempThis.numberOfFile)] = filename
        tempThis.pageIDwithFilename['numberOfFile'] = tempThis.numberOfFile
      }
    },
    uploadFile (item) {
      let tempThis = this
      if (tempThis.myFileList[item.name] !== undefined) {
        tempThis.$message({
          message: '该文件已上传',
          center: true,
          duration: 900
        });
        tempThis.isBig = true;
        item.isDelete = 1 // 当isdelete=1时，不需要删除数据库的内容，只要删除文件列表的内容,
        // 这样同名字的文件就不会被错误删除
        tempThis.$refs.upload.handleRemove(item);
        return false
      }
      tempThis.myFileList[item.name] = 1 // 证明该文件名已经上传
      console.log(tempThis.myFileList)
      tempThis.isBig = false;
      tempThis.hasalert = false;
      tempThis.file_num++;
      let sizes = 80777216;
      if (tempThis.isBig) {
        return false
      }
      if (item.size > sizes) {
        tempThis.$message({
          message: '文件上传失败,太大了',
          center: true,
          duration: 900
        });
        tempThis.isBig = true;
        tempThis.myFileList[item.name] = undefined
        tempThis.$refs.upload.handleRemove(item);
        return false;
      } else {
        let temp;
        tempThis.isBig = false;
        const reader = new FileReader()
        reader.readAsDataURL(item.raw)
        reader.onload = e => {
          const code = e.target.result
          let fileContent = tempThis.SplitBase64(code)
          let file_message = {}
          file_message['filenum'] = fileContent.length;
          file_message['size'] = item.size
          tempThis.$gun.get('myfiles').get(tempThis.pageID + item.name).put(file_message)
          tempThis.$gun.get('myfiles').get(tempThis.pageID + item.name).once(data => {
          })
          let progressPart = 100 / (fileContent.length + 1)
          for (let i = 0; i < fileContent.length; i++) {
            (function (i) {
              setTimeout(function () {
                if (!tempThis.isBig) {
                  tempThis.uploadFilePart(item.name, fileContent, i)
                  tempThis.number = parseInt((i + 1) * progressPart)
                  console.log(i, '上传', tempThis.number)
                } else {
                  tempThis.number = 0
                }
              }, (i + 1) * 400);
            })(i);
          }
        }
      }
    },
    clearAll () {
      const tempThis = this
      for (let filename in tempThis.myFileList) {
        console.log(filename)
        tempThis.$gun.get('myfiles').get(tempThis.pageID + filename).put(null)
      }
    }
  },
  mounted: function () {
    this.pageID = this.randomString(32);
  },
  beforeDestroy: function () {
    const tempThis = this
    if (!this.confirm_file) {
      tempThis.clearAll();
    }
  },
  watch: {
    select_status (new_val, old_val) {
      this.new_status = new_val
    },
    number (news, old) {
      const tempThis = this
      if (news > 0) {
        tempThis.disabled = true;
      }
      else {
        tempThis.disabled = false;
      }
    }
  }
}
</script>

<style>
.el-upload-list__item-name {
  color: #606266;
  display: block;
  font-size: 16px;
  margin-right: 40px;
  padding-left: 4px;
  transition: color 0.3s;
}
li {
  display: flex;
  float: left;
  align-items: center;
}
.el-icon-close {
  display: flex;
  margin-top: 4px;
  margin-right: 5px;
}
.el-progress__text {
  margin-left: 25px;
}
.el-progress-bar {
  padding: 0 35px 0 20px;
}
.el-message-box__message {
  font-size: 20px;
}
.el-message-box__content {
  display: block;
  height: 40px;
  line-height: 40px;
  font-family: "webfont";
  color: rgb(0, 0, 0);
  font-size: 10px;
}
.el-message-box__headerbtn {
  position: absolute;
  top: 10px;
  right: 5px;
  font-size: 23px;
}
.el-message-box {
  width: 600px;
  height: 120px;
  margin: 0 auto;
  padding: 0 10px 25px;
  border-radius: 10px;
  box-shadow: 6px 6px 12px rgb(80, 145, 142);
  background-color: rgb(207, 236, 235);
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #ebeef5;
  text-align: left;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>
<style scoped>
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.main {
  display: flex;
}
#title {
  display: block;
  margin: auto;
  font-size: 30px;
  line-height: 60px;
  width: 100%;
  font-family: "webfont";
  color: black;
  text-align: center;
}
.upload-demo {
  width: 300px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "webfont";
}
.upload-option {
  font-family: "webfont";
  font-size: 22px;
}
.upload-layout {
  display: flex;
  flex-direction: row;
}
.upload-layouts {
  margin-right: 15%;
  display: flex;
  flex-direction: row;
}
.confirm-file {
  float: left;
  border: 0;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}
.select {
  font-size: 16px;
  margin: 0 10px;
}
#confirm-file {
  margin: 0 auto;
  margin-top: 30px;
}
.confirm-files {
  float: left;
  border: 0;
  font-family: "webfont";
  font-size: 22px;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: 0.2s;
}
.confirm-file i {
  font-size: 80px;
  color: rgb(43, 45, 45);
}
.confirm-files i {
  font-size: 80px;
  color: rgb(27, 27, 27);
}
.el-upload-tip {
  margin: 5px auto;
  font-size: 20px;
  color: black;
}
.sure-file {
  width: 100px;
  height: 40px;
  font-family: "webfont";
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  border: 0;
  padding: 4px 10px;
  background-color: rgb(54, 153, 153);
  letter-spacing: 4px;

  /* ;background-color:transparent背景颜色为透明 */
  transition: 0.3s;

  /* 设置动画时间 */
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}
#sure-file {
  margin: auto;
}
.sure-files {
  width: 100px;
  height: 40px;
  font-family: "webfont";
  letter-spacing: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  border: 0;
  padding: 4px 10px;
  background-color: rgb(83, 182, 182);
  border-radius: 5px;
  cursor: pointer;
}
#confirm-file:hover .confirm-file {
  transform: translatey (-3px);
  box-shadow: 3px 3px 10px rgb(129, 131, 118);
  border: 0;
  border-radius: 4px;
}
#sure-file:hover .sure-file {
  transform: translatey (-3px);
  box-shadow: 3px 3px 12px rgb(145, 148, 128);
  color: black;
  border: 0;
  background-color: rgb(187, 228, 209);
}
.progress-bar {
  margin-top: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 8%;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
}
.progress-inner {
  margin: 0;
  width: 100%;
  font-size: 1px;
}
.linkshow {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto;
}
.unshow {
  display: none;
}
#pass-table {
  align-items: center;
  margin: 40px 0;
  width: 100%;
  display: flex;
  font-family: "webfont";
  font-size: 20px;
  color: black;
}
.password {
  align-items: center;
  width: 100%;
  margin: -15px 0;
  display: flex;
  font-family: "webfont";
  font-size: 20px;
  color: black;
}
.input-password {
  width: 100px;
  height: 28px;
  outline: none;
  margin-left: 8px;
  padding-left: 10px;
  border: 0;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: rgba(220, 220, 220, 0.55);
}
.download-amount,
.validity {
  letter-spacing: 7px;
  align-items: center;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  height: 35px;
  margin: 40px 0;
  font-family: "webfont";
  color: black;
}
#download-amount,
#validity {
  outline: none;
  width: 112px;
  height: 28px;
  border-radius: 5px;
  font-family: "webfont";
  font-size: 16px;
  border: 0;
  background-color: rgba(220, 220, 220, 0.55);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
label {
  color: black;
  margin-right: 10px;
}
button {
  outline: none;
}
#go-download {
  position: absolute;
  top: 75px;
  left: 89%;
}
.go-download {
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
.go-downloads {
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
#go-download:hover .go-download {
  transform: scale(1.1) translate(2px);
  box-shadow: 4px 4px 8px rgb(156, 134, 139);
  background-color: rgba(221, 172, 184);
}
</style>
