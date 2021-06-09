# 基于GunDB的网络文件分享平台


## 介绍

 GunDB是一个开源的去中心化数据库。其着重关心需要在应用程序中存储、加载和共享的数据。

- 去中心化: 在一个分布有众多节点的系统中,每个节点都具有高度自治的特征。
- 对网络状况不佳的用户有非常良好的脱机工作支持
- MariaDB is used. Data are persistently stored in local files.
- 工作方式: GunDB 存储在所有参与网络的节点(peer)上。 它是所有节点的图的集合。
- 存储需求:理论上不限制大小,可使用的数据受主机环境配置限制,运行之外的
  持久存储量取决于存储引擎。Web 浏览器中通常为 5MB 的本地存储

**前端技术主要使用Vue框架进行实现，将Vue与Gun进行绑定，基于此进行应用开发**

## 环境要求
- 你需要安装 [vue](https://cn.vuejs.org/) 和 [npm](https://www.npmjs.com/)

### 服务器现在暂且不稳定而且带宽不太够，如果进行测试建议在本地搭建服务器

在项目的根目录
执行
```
cd gundb
cnpm install gun
cd node_modules/gun
cnpm start
```
服务默认开启在本地的8765端口，可以通过访问浏览器`localhost:8765`来进行访问


## 快速开始

**你应该将仓库`clone`到本地后，进入所在文件夹，在文件根目录下，执行**



``` shell
    cd gundb
    npm install  
```


**遇到安装速度过慢的问题可以通过换源解决**
``` shell
    npm config set registry https://registry.npm.taobao.org
    npm config list
```

**若electron安装失败，可以选择换淘宝源之后手动安装electron**
``` shell
    npm config set ELECTRON_MIRROR=https://cdn.npm.taobao.org/dist/electron/
    npm install electron -g
```


## eslint代码规范检查
安装Git，并将Git安装目录里的bin目录添加到Windows的PATH系统变量里，这样git就可以全局访问。
之后运行下面的代码：
``` shell
　　cp hooks/* .git/hooks/
```
## 具体更多细节可以看Wiki开发文档
 [《码的全队GunDB去中心化分享平台项目》](https://www.yuque.com/books/share/fd666b8b-570d-499e-bcfa-2c7eede5cff0?#)
