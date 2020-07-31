<template>
<div class="page-container">
  <el-dialog :visible.sync="pdfDlgVisible" title="pdf预览" height="calc(100vh - 10px)" class="pdf-dialog">
    <div class="main">
      <pdf :src="src" :page="currentPage" @progress="loadedRatio = $event" @loaded="loadPdfHandler" @num-pages="pageCount=$event" @page-loaded="currentPage=$event" ref="wrapper" class="pdf"></pdf>
    </div>
    <div slot="footer" class="footers">
      <ul class="footer-ul">
        <li id="bigger" :class="{select:idx==0}" @touchstart="idx=0" @touchend="idx=-1" @click="scaleD">
        <li id="last" :class="{select:idx==2}" @touchstart="idx=2" @touchend="idx=-1" @click="changePdfPage(0)">
          <p class="up-p">上一页</p>
        </li>
        <li id="next" :class="{select:idx==3}" @touchstart="idx=3" @touchend="idx=-1" @click="changePdfPage(1)">
          <p class="down-p">下一页</p>
        </li>
        <li id="now">
          <p class="page-number">当前第{{ currentPage }}页/共100页</p>
        </li>
      </ul>
      <el-button @click="closePdf">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import pdf from 'vue-pdf';
export default {
  name: 'PreviewPdf',
  components: {
    pdf
  },
  data() {
    return {
      currentPage: 1, // 当前页码
      pageCount: 0, // 总页码
      scale: 100,
      idx: -1,
      loadedRatio: 0,
      src: '',
      pdfDlgVisible: false,
      checkPage: [],
      checkPageList: []
    };
  },
  mounted() {
  },
  methods: {
    previewPdf(url) {
      this.currentPage = 1;
      this.pageCount = 0;
      this.pdfDlgVisible = true;
      this.src = url;
    },
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
      for (let i = 0; i < this.checkPageList.length; i++) {
        const datas = this.checkPageList[i];
        if (datas.page === this.currentPage) {
          this.checkPage[this.currentPage] = datas.check;
          break;
        } else {
          this.checkPage[this.currentPage] = false;
        }
      }
    },
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    },
    // 放大
    scaleD() {
      this.scale += 5;
      this.$refs.wrapper.$el.style.width = parseInt(this.scale) + '%';
    },
    // 缩小
    scaleX() {
      if (this.scale === 100) {
        return;
      }
      this.scale += -5;
      this.$refs.wrapper.$el.style.width = parseInt(this.scale) + '%';
    },
    closePdf() {
      this.currentPage = 1;
      this.pageCount = 0;
      this.pdfDlgVisible = false;
      this.$emit('closePdf');
    }
  }
};
</script>

<style scoped>
.main {
  overflow: hidden;
}
body {
  margin: 0;
  padding: 0;
}
.footer-ul {
  bottom: 0;
  display: flex;
  margin: 0;
  z-index: 200;
  list-style: none;
}
.page-number {
  color: black;
  font-size: 1rem;
  margin-left: auto;
  margin-right: auto;
}
#last {
  width: 100px;
  flex-shrink: 2;
  font-size: 1rem;
}
#next {
  width: 100px;
  flex-shrink: 2;
  font-size: 1rem;
}
#now {
  flex-shrink: 3;
  width: 400px;
}
</style>
