[English](./README.md) | [简体中文](./README.zh.md)

# Network File Sharing Platform based on GunDB

## 1. Introduction

GunDB is an open-source decentralized database that focuses on storing, loading, and sharing data in applications.

- **Decentralization**: In a system with multiple nodes, each node has a high level of autonomy.
- Excellent **offline support** for users with poor network conditions.
- **MariaDB** is used. Data is persistently stored in local files.
- **Functionality**: GunDB is stored on all participating nodes (peers) and is a collection of graphs for all nodes.
- **Storage requirements**: Theoretically unlimited in size, the available data is limited by the host environment configuration. The amount of persistent storage outside of runtime depends on the storage engine. In web browsers, it is typically 5MB of local storage.

**The frontend technology is mainly implemented using the Vue framework, which is bound to Gun for application development.**

## 2. Web Deployment

### 1. System Requirements

#### The server is currently unstable and has limited bandwidth. It is recommended to set up a local server for testing.

In the root directory of the project (note that there is no `package.json` file in this directory), execute the following:

```powershell
npm install gun
cd node_modules/gun
npm start
```

The service is by default running on port 8765 in localhost, and you can access it by visiting `localhost:8765` in your browser.

### 2. Quick Start

You need to install [Vue](https://cn.vuejs.org/) and [npm](https://www.npmjs.com/).

**After cloning the repository to your local machine, navigate to the `gundb` folder on the second level, and in that directory, execute the following:**

```powershell
cd gundb/gundb
npm install
npm run serve
```

**If you encounter slow installation speed, you can solve it by changing the source:**

```powershell
npm config set registry https://registry.npm.taobao.org
npm config list
```

**If the installation of Electron fails, you can choose to manually install Electron after changing to the Taobao source:**

```powershell
npm config set ELECTRON_MIRROR=https://cdn.npm.taobao.org/dist/electron/
npm install electron -g
```

### 3. eslint Code Style Checking

Install Git and add the `bin` directory of the Git installation directory to the `PATH` system variable in Windows, so that Git can be accessed globally. Then run the following code:

```powershell
cp hooks/* .git/hooks/
```


## 3. Client Deployment
### 1. Environment Requirements

The server should be running on port 8765 locally. Make sure that port 8765 is not occupied by any other process. You can access the server by visiting `localhost:8765` in your browser.

You need to install [Vue](https://cn.vuejs.org/) and [npm](https://www.npmjs.com/).

### 2. Quick Start

**After cloning the repository to your local machine, navigate to the respective folder and execute the following commands in the root directory:**

```c
npm install
vue add electron-builder
```
**When prompted to add electron-builder:**

```c
? Still proceed? Yes
? Choose Electron Version ^9.0.0
? Add tests with Spectron to your project? No
```

**If you encounter slow installation speed, you can solve it by changing the source:**

```c
npm config set registry https://registry.npm.taobao.org
npm config list
```
**If the installation of Electron fails, you can choose to manually install Electron after changing to the Taobao source:**

```c
npm config set ELECTRON_MIRROR=https://cdn.npm.taobao.org/dist/electron/
npm install electron -g
```
### 3. Application Deployment

**Run the client in development mode (inside the 'gundb' directory):**
```c
npm run electron:serve
```

**Build the client:**

```c
npm run electron:build
```

### 4. eslint Code Style Checking

**Install Git and add the 'bin' directory of the Git installation directory to the PATH system variable in Windows so that Git can be accessed globally. Then run the following code:**

```c
cp hooks/* .git/hooks/
```

# Detailed Documentation

## 1. Requirements

### (I) Software Overview

This is a file sharing platform called "Gun File," which consists of a web client and a desktop client. The platform utilizes Gun as its core technology and is developed using JavaScript language and Vue framework. It provides a decentralized file sharing platform with CDN functionality to accommodate unstable network environments in different regions, as well as enabling file sharing within a local network. The software supports both web and desktop clients, comprising of upload and download interfaces. Users can upload files on the upload interface, supporting all file types up to 60MB. After selecting a file, users can choose to encrypt the file for sharing, set download limits, and specify the file's expiration period. The software encrypts the file transfer password using bcrtjs, ensuring secure file transmission. Once the file upload is complete, the software generates a shareable link that users can share with others for downloading or previewing the file. The software retains the uploaded files within the specified expiration period, allowing users to download or preview them using the file share link. Encrypted files require the correct password for downloading or previewing, and the software only supports online preview for PDF and image files up to 10MB. When a user accesses the download interface and initiates a file download, the download count decreases by one. Once the download count reaches zero, further access to the download interface is prohibited, and the software deletes files with zero downloads or files that have exceeded the expiration period.

### (II) Specifications

#### 1. Web Client Specifications
##### (1) Uploading Files on the Platform

Users first access the website in an internet-supported environment. On the file upload interface, users select the files they want to share and configure options such as file encryption, download limits, and expiration period. After confirming the upload, the website provides a link that users can share with others who need to download the file.

##### (2) Downloading or Previewing Files via Links

Users access the link via the internet. If the link is within the expiration period and the file's download count is within the specified range, they can access the download interface. If the file is encrypted, users need to enter the password to download or preview the file. If the file is not encrypted, they can directly download or preview it. Currently, file preview supports only PDF and image formats. To prevent excessive strain on local browsers, slow performance, and high CPU usage, file preview is limited to files under 10MB.

#### 2. Desktop Client Specifications

##### (1) Sharing Files within a Local Network via the Desktop Client

The desktop client has options in the menu bar to start and stop the local server. To enable local file sharing within a local network, users must start the local server, upload files, and copy the page ID to another client. This allows access to the files. Note that the other client must be in the same local network (e.g., connected to the same Wi-Fi or network environment) to enjoy high-speed file transfer. Otherwise, the desktop client will default to connecting to the wide-area network server for file upload and download, which is similar to the web client. For more detailed usage instructions, please refer to the user manual below.


### (III) User Manual

## I. Introduction

If you simply want to perform file transfers using the Gun file and do not wish to understand its underlying development principles, you only need to read this user manual. If you are a developer and want to understand the underlying software architecture, we recommend reading the [Developer's Manual](./Developer_Manual.md) in addition to this user manual. This user manual will provide you with detailed instructions on how to use this software. Whether you want to transfer files over a local network or a wide area network, by referring to this user manual, you can seamlessly use this platform to achieve your goals.

## II. Software Overview

### I. Software Description

Users can upload one or more files through the web page by accessing the URL. There are no restrictions on file types, but individual file sizes should not exceed 60MB. If a file exceeds the size limit, an upload failure prompt will be displayed. After selecting the files to be uploaded, if a file extraction password is required, users can choose to set a password and enter a string of characters and numbers in the corresponding field. Once a password is set, the correct password must be entered during file extraction, otherwise the file cannot be downloaded or previewed. Users can also specify the number of times a file can be downloaded, with options such as 1, 2, or 5. If the file is downloaded more times than the specified limit, it cannot be downloaded. Users can also set an expiration date for the file, with options such as 1 day, 3 days, or 5 days. After the expiration date, the file cannot be previewed or downloaded. When the user clicks the "Confirm Upload" button, the platform will generate a link. By clicking the copy button, the link can be copied. This link can be used to access the download page. If the correct password is entered, the file can be previewed and downloaded. Currently, online preview only supports images and PDF files with a size limit of 10MB.

## III. Basic Operations and Functionality Introduction

### I. Uploading Files via Web Interface

#### 1. Click the "Select Files" button to open the file selection dialog. Choose the desired file(s) from your local device. Once the prompt "File upload successful" appears, you can select the next file to upload.

![上传文件gif.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596081609835-1794cc25-a96c-4e0e-a9dc-1652cb4345e6.gif#align=left&display=inline&height=928&originHeight=928&originWidth=1812&size=1035080&status=done&style=none&width=1812)

#### 2. The file size limit for upload is 60MB. If the file exceeds this limit, the platform will display a prompt indicating that the file cannot be uploaded.

![大文件上传.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596081825822-e50f6814-7e58-4adb-92bf-0c9b2735b8d9.gif#align=left&display=inline&height=934&originHeight=934&originWidth=1818&size=1155966&status=done&style=none&width=1818)

#### 3. If a file is selected incorrectly, hover the mouse over the file name in the file list and click the "Remove" button on the right to remove the file.

![移除文件.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596081948702-7e932290-f9af-40a0-8cd6-695169d42571.gif#align=left&display=inline&height=923&originHeight=923&originWidth=1824&size=2282028&status=done&style=none&width=1824)

#### 4. Uploading files with the same name is not allowed. If a file with the same name is uploaded, the system will display a prompt saying "File already uploaded."

![同名文件.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596082139750-760c1146-6783-4e53-a081-f5aa238fa382.gif#align=left&display=inline&height=918&originHeight=918&originWidth=1822&size=1031939&status=done&style=none&width=1822)

#### 5. Choose whether to set a password for file extraction. If a password is required, enter it in the password input field. If no password is needed, you can skip this step. Once a password is set, it cannot be changed.

![输入密码.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596082273988-59ae2219-41ab-4c49-9ae4-1787db614df8.gif#align=left&display=inline&height=928&originHeight=928&originWidth=1815&size=755620&status=done&style=none&width=1815)

#### 6. Specify the number of times the file can be downloaded. The options include 1, 2, or 5 times. If the file is downloaded more times than the specified limit, it cannot be downloaded.

![选择.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596082625438-bcbdcd2d-2e85-4c6b-8127-bfe4f49e1db3.gif#align=left&display=inline&height=921&originHeight=921&originWidth=1803&size=719306&status=done&style=none&width=1803)

#### 7. Set an expiration date for the file. The options include 1 day, 3 days, or 5 days. After the expiration date, the file cannot be previewed or downloaded.

![选择有效日期.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596082642597-1e8de42d-4ec2-4ed7-93b3-0b1c79dbc3bc.gif#align=left&display=inline&height=944&originHeight=944&originWidth=1804&size=751394&status=done&style=none&width=1804)


#### 8. Click the "Confirm Upload" button to generate a link. Click the copy button to copy the link. This link can be shared with others to access the download page.

![确认上传文件.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596082686765-c373fd5f-d0d4-4c83-a36f-905f22ac6d07.gif#align=left&display=inline&height=940&originHeight=940&originWidth=1817&size=842732&status=done&style=none&width=1817)

#### 9. Clicking the "Copy" button allows you to share this link with others who need to download or preview the uploaded file. They can use this link to access the website and perform download or preview operations on the file. After copying the link, click the "Close" button to proceed with the next file upload.

![Copy Button.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596082834398-82d4d306-170e-4338-9630-fc0adc85205e.gif#align=left&display=inline&height=930&originHeight=930&originWidth=1821&size=752999&status=done&style=none&width=1821)

#### 10. Complete process of uploading a file
![Complete Process.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596083944866-a835014d-0db6-49df-ab02-6457dbae0fd5.gif#align=left&display=inline&height=974&originHeight=974&originWidth=1823&size=1804597&status=done&style=none&width=1823)

### (II) Previewing or downloading files on the web page

#### 1. Access the file download page through the file link. If the shared file is still within the storage period and the number of downloads is within the limit, proceed to the next step.

![Enter Download Page.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596082944641-83efffa4-795a-4acd-b904-800f8c3e9852.gif#align=left&display=inline&height=990&originHeight=990&originWidth=1819&size=519802&status=done&style=none&width=1819)

#### 2. If no password is required to extract the file, you can directly access the download page and perform file operations. If a password is required, you need to enter the correct password to access the download page.

![Correct Password.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596083290323-5df0c6fe-161b-45e9-83c8-055048728448.gif#align=left&display=inline&height=922&originHeight=922&originWidth=1818&size=775563&status=done&style=none&width=1818)

#### 3. When hovering over the file name, a "Preview" button will appear on the right side of the file. Click the button to preview the file if it meets the requirements for file format (PDF or image) and is within 10MB in size. If the requirements are not met, the system will prompt the user with "Preview not available for this file".

Image preview:

![Click to Preview Image.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596083373252-21d9bce2-3dc1-466f-8b2b-e4610ecee75b.gif#align=left&display=inline&height=940&originHeight=940&originWidth=1824&size=2147611&status=done&style=none&width=1824)

PDF file preview:

![Preview PDF.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596084179236-c8c23231-450d-4f23-92bd-4dae9de32d53.gif#align=left&display=inline&height=945&originHeight=945&originWidth=1820&size=2859045&status=done&style=none&width=1820)

#### 4. After meeting the above conditions, enter the download page. The page displays all the shared file names. Clicking a file in the list allows you to download the file. By default, the files are downloaded to the C drive. Once a file is downloaded, the download count will decrease by 1. You can continue downloading other files on the same page without decreasing the download count. In other words, if you open the page but do not download any file, the download count remains the same. If you download a file, the download count will decrease by at most 1 until you close or refresh the page. This design is mainly for the convenience of monitoring multiple file downloads, as specifying download counts for each file would result in cluttered and difficult-to-manage information.

![点击进行下载.gif](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596083302457-520a7b90-f697-4eb8-bae0-a27e803986ec.gif#align=left&display=inline&height=914&originHeight=914&originWidth=1810&size=1010157&status=done&style=none&width=1810)

#### 5. Refresh the page or revisit the page. If the file is still within the expiration period and the download limit has not been reached, the user can continue to perform operations on the file. If the file has exceeded the validity period, it will display "File has expired". If the download limit has been exceeded, it will display "File has reached the maximum download limit" and automatically redirect to the upload page.

![Maximum Download Limit Exceeded](https://cdn.nlark.com/yuque/0/2020/gif/2142105/1596084526967-3828e3fd-4d5d-430f-8371-9fcee0ae2365.gif#align=left&display=inline&height=988&originHeight=988&originWidth=1818&size=407484&status=done&style=none&width=1818)

### (III) File Transfer on Client-side

#### 1. Install the client.

#### 2. The steps for uploading files are similar to the web interface. Please refer to [Uploading Files on the Web](#7c21f307). The only difference is that after clicking the "Confirm Upload" button, a dialog box with a pageID will appear.

![Client Screenshot 2](https://cdn.nlark.com/yuque/0/2020/png/2142105/1596083498913-bfade717-6ffc-44ce-a728-d3000ab23701.png#align=left&display=inline&height=1249&originHeight=1249&originWidth=1920&size=350873&status=done&style=none&width=1920)

#### 3. To receive files on the client-side, open the client and click the "Go to Download" button located at the top left corner of the page.

![Client Screenshot 1](https://cdn.nlark.com/yuque/0/2020/png/2142105/1596083506429-ea2a574f-582d-49af-860f-9e5f6a9d1b7d.png#align=left&display=inline&height=1080&originHeight=1080&originWidth=1920&size=119003&status=done&style=none&width=1920)

#### 4. You will be redirected to the download page where you need to enter the pageID obtained after confirming the upload.

![Client Enter Link](https://cdn.nlark.com/yuque/0/2020/png/2142105/1596083524572-4eb01213-19f0-43f6-b1d0-b5a49e5adcb8.png#align=left&display=inline&height=885&originHeight=885&originWidth=1100&size=87330&status=done&style=none&width=1100)

#### 5. After entering the correct pageID, if the file is password-protected, it will prompt for the password. Upon entering the correct password, it will display "Password Correct" and allow access to the download page for normal downloading and previewing.

![Client Password Input](https://cdn.nlark.com/yuque/0/2020/png/2142105/1596083550273-8980bf9c-8871-4924-869a-276723e46d13.png#align=left&display=inline&height=924&originHeight=924&originWidth=1159&size=95146&status=done&style=none&width=1159)

#### 6. The client's download page allows downloading and previewing files similar to the web interface. 

#### 7. The menu bar has options to open and close the server, which corresponds to enabling and disabling the local server. To enable LAN file sharing, you must upload files after starting the local server, and then copy the file link to another client to access the file.

![Screenshot AAAAA](https://cdn.nlark.com/yuque/0/2020/png/2142105/1596130629624-3b963170-a9ad-4d70-8dd8-3bed790281bc.png#align=left&display=inline&height=1024&originHeight=1024&originWidth=1920&size=382744&status=done&style=none&width=1920)


## Introduction or Overview

This documentation provides a detailed explanation of the underlying construction principles of this software. Before reading this documentation, you should have a basic understanding of the following programming languages: HTML, JavaScript, and additionally, familiarity with the front-end framework Vue.js is required. Gun is the core technology of this software, and we recommend reading the [Gun official documentation](https://gun.eco/docs/Todo-Dapp) before proceeding with this documentation. This documentation will cover the software's runtime environment and how to run it, including detailed descriptions of each component.

## Software Overview

### 1. Software Description

This system is based on GunDB, an open-source decentralized database. It focuses on storing, loading, and sharing data in applications without the need to worry about servers, network calls, databases, or tracking offline changes or concurrency conflicts.
Decentralization: In a system with multiple nodes, each node has a high degree of autonomy. Nodes can freely connect with each other to form new connection units. Any node can become a temporary center, but it does not possess mandatory central control. The influence between nodes forms non-linear causal relationships through the network. Decentralization does not mean the absence of a center, but rather the freedom for nodes to choose and determine the center. In simple terms, centralization means the center determines the nodes. Nodes must rely on the center, and they cannot survive without it. In a decentralized system, anyone can be a node, and anyone can also become a center. No center is permanent; they are all temporary, and no center has control over nodes. The front-end part uses the Vue framework and binds Vue with Gun for application development. The client-side uses Electron for project packaging, and the overall project structure is not significantly different from the web version.

### 2. Runtime Environment

To develop this project, you need to install npm, Vue dependencies, and Git for cloning the project repository.

#### (1) Clone the Repository

Choose a method and clone the project repository to your local machine using the following links:

- SSH
- HTTPS

#### (2) Environment Configuration

Please refer to the previous section and make sure to run it within the second-level gundb directory (inside the second-level gundb file). After running it, access the webpage using the provided link.

![Web Interface](https://cdn.nlark.com/yuque/0/2020/png/2142105/1596081111655-ec3f534c-7b1b-4a1c-a26c-6dd0fed24463.png#align=left&display=inline&height=891&originHeight=891&originWidth=1918&size=217169&status=done&style=none&width=1918)

### 3. Introduction to Components and Features

#### (1) Upload.vue

Upload.vue is the file upload interface that implements file upload functionality and UI.

#### (2) Download.vue

Download.vue is the file download interface that implements file download or preview functionality and UI.

#### (3) App.vue

App.vue is the common layout for the interface, implementing the common layout for the web page.

#### (4) Linkbox.vue

Linkbox.vue is the file sharing link component that implements file sharing link functionality.

#### (5) Password.vue

Password.vue is the file password input component that implements input and verification of file passwords.

#### (6) PreviewImage.vue

PreviewImage.vue is the image preview component that enables image preview functionality.

#### (7) PreviewPdf.vue

PreviewPdf.vue is the PDF file preview component that enables PDF file preview functionality.

#### (8) Common.vue

Common.vue is the data storage file for Upload.vue and Download.vue, implementing file transfer password encryption functionality.

#### (9) GunPanel.vue

GunPanel.vue is the layout component that dynamically responds to the main panels of the upload and download interfaces.

#### (10) routers/index.js

routers/index.js is the browser routing configuration that enables page navigation functionality.

#### (11) tests folder

The tests folder contains related test files.

#### (12) public/index.html

public/index.html imports Alibaba icons for easy use in various components.

#### (13) (Client-side) background.js

background.js is the client-side main process that enables client on/off and server operations.

#### (14) (Client-side) vue.config.js

vue.config.js is the client-side packaging configuration file that allows custom installations for the client.

### 3. Basic Operations and Features

#### (1) Clone the project to your local machine according to the README.

#### (2) Open the files using VS Code and make modifications. The following section will describe the main functions in this project.

- Functions in Upload.vue

   1) getBase64(file)

      This function encodes the file by converting it to base64. The parameter is the file object, and this function encodes the passed file object into base64.

   2) SplitBase64(str, num = 2000000)

      This function accepts two parameters: the first one is the base64 encoding of the file after conversion, and the second one is the size of each file chunk, with a default size of 2MB. It implements file splitting and returns an array.

   3) uploadFilePart(fileName, fileContent, i)

      This function uploads a small portion of the file. The first parameter is the file name, the second parameter is the array of files returned above, and the third parameter is the index of the file array.

   4) uploadFileInfo(filename = null)

      This function stores the number and names of files. Each time a file is inserted, this function is called to update the file name and quantity in the local storage of Vue. When the user clicks on the confirm upload button, all the file names will be uploaded to the database.

   5) uploadFile(item)

      This function is the entry point for uploading files. The parameter is the file object. This function calls several other functions to upload the file to the server. The operations performed include file chunking and file upload. It is one of the core functions.

- Functions in Download.vue

   1) checkFileValidity()

      This function checks the validity of the file information.

   2) downloadfile(item)

      This function is the entry point for file downloading. The parameter is the base64 encoding of the file object. This function calls other functions to download the file to the local machine.

   3) previewfile(item)

      This function is the entry point for file preview. The parameter is the base64 encoding of the file object. This function calls other functions to preview the file.

   4) dataURLtoBlob(dataurl)

      This function is a decoding function. The parameter is the base64 encoding of the file. This function decodes the file and returns the file object.

   5) downloadFile(url, name = '')

      This function downloads the file to the local machine using the URL of the file object as a parameter.

   6) downloadFileByBase64(base64, name, ShowProgerss)

      This function takes the base64 encoding of the file, the file name, and a boolean value to determine the file operation. It calls the decoding function to decode the file and then previews or downloads the file.

- Functions in (Client-side) background.js

   1) createWindow()

      Opens the client-side window.

   2) gunInstall()

      Checks if the Gun package is installed and automatically installs it if not.

   3) closeGunSever()

      Checks if the local Gun server is running and closes it if it is.

   4) runGunSever()

      Starts the local Gun server.

   5) runExec()

      Gets all the IP addresses in the local network and adds the running IP addresses to the Gun database.


### (IV) Performance Requirements

#### 1. Accuracy

##### (1) File Upload

- File Selection: Can select files of any format.
- File Password Input: Can input passwords of any length and symbols.
- File Storage Time: Can choose from 1 day, 3 days, 5 days, 7 days, and 10 days.
- File Download Limit: Can choose 1, 2, 5, 7, or 10 downloads.

##### (2) File Download

- File Selection: Can select files of any format.

##### (3) File Preview

- File Selection for Preview: Only supports preview of PDF format and all image formats, with a file size limit of 10MB.

#### 2. Flexibility

Once the product is deployed, the following adjustments may be made based on user feedback, product testing, or technical updates:

##### (1) Changes in the Operating Environment

- The server is running on port 8765 locally. Please ensure that port 8765 is not occupied by any other process. The server can be accessed by visiting `localhost:8765` in the browser. The main development and debugging are done on the Windows platform. If time permits, support for the SUSE Linux server version will be synchronized.

### (V) Problem Analysis Report

#### 1. Problem Description:

For situations where the network environment is unstable in different regions, a decentralized file sharing platform is needed to solve the file sharing scenario within the local area network (LAN). It requires the development of a web client and a desktop client. The web client should support file preview for certain file types and also provide file encryption. The desktop client should support file sharing within the LAN based on the web client.

#### 2. Problem Analysis:

This project requires the construction of a decentralized file sharing platform. GunDB is an open-source decentralized database that provides technical support for building the platform. The web client needs to be developed, requiring the selection of suitable programming languages and frameworks. File preview functionality will require the integration of relevant plugins. The desktop client needs to be built by packaging the web client. For file transfer in the wide area network, files need to be uploaded to a remote server. For file sharing within the LAN, files need to be uploaded to a local server within the LAN so that the desktop client can access files uploaded by other clients within the LAN for preview and download.

#### 3. Solution:

Use GunDB as the core technology to achieve decentralization. Choose JavaScript and HTML as the main languages based on the requirements. Develop the web client using Vue.js, and for file preview, integrate the vue-pdf and vue-viewer plugins. Set up a custom Gun node and connect Gun nodes to each other. Finally, set up a remote node and deploy it on a remote server to achieve file transfer in the wide area network. Introduce the desktop client, which sets up a local Gun server and deploys it when the client is started. Users can manually start or stop the server in the desktop client, and successful file upload and download can only occur when the server is running.



# Design

## (I) Design Overview

### 1. Web Front-end

The web front-end of this project is developed using the Vue.js framework combined with GunDB. Vue.js is a lightweight front-end framework that provides many independent features or libraries which can be extended based on choice. GunDB is an open-source decentralized database that allows nodes to freely connect with each other, forming new connection units. This design pattern ensures data security and efficient transmission.

During the design process, we did not separate the front-end and back-end of our project because GunDB database can be imported through NPM and integrated into the Vue project using the vue-gun plugin. This design pattern introduces higher coupling and makes it difficult for further development. However, GunDB itself is written in JavaScript and does not provide an interface for front-end and back-end connection. If a better design pattern is discovered during continuous development, it can be modified accordingly. At this stage, it resembles a Vue project with integrated storage functionality, reflecting the concept of "frontend as a big part".

In the design, we also incorporated some third-party libraries such as ElementUI, Eslint code checking tool, vue-pdf plugin for PDF preview support, etc. These third-party libraries simplify the development process, allowing us to focus more on core functionality and interface implementation.

### 2. Client-side

The client-side utilizes Electron to package and encapsulate the Vue project, enabling quick project portability and generating cross-platform applications. However, this approach has a downside: it is difficult to control the file size. Electron's design philosophy is more like a lightweight browser. To package and run it, all the dependencies of the Vue project and the Node.js environment of Electron itself need to be installed. As a result, the installation size of the combined project exceeds 150MB, while the Vue project itself is only around 4MB.

## (II) Runtime Structure

### 1. Web Structure

The web structure in this case is essentially the same as a Vue project. The database operations are directly performed in the views folder, and the front-end handles almost all the work. The main directory structure is as follows:

![1web.png](https://cdn.nlark.com/yuque/0/2020/png/2142105/1596122938899-4f482be7-323a-46bf-9c3e-2616f3dc186a.png#align=left&display=inline&height=619&originHeight=619&originWidth=344&size=22975&status=done&style=none&width=344)

Under the views folder, the Download, Upload, and Team correspond to three pages. The components used are encapsulated in the Components folder. Additionally, we introduced unit testing, GitLab pipelines, and other tools to check the project. The introduction of these automated testing tools greatly simplifies our code testing work and allows us to focus more on development.

#### 2. Module Design

- Upload
  The Upload page is responsible for file retrieval, splitting, uploading, and storage. It is one of the core functionalities of this project. It initializes the Gun database and connects to the backend database using the Vue-Gun plugin. By directly manipulating file elements in the front-end using JavaScript, it performs encoding, splitting, and storage. Essentially, this page encompasses all the required functionalities.

- Download
  The Download page allows users to download, merge, and preview files. It communicates with the database to support URL parsing, file password validation, and file downloading.

- Team
  The Team page provides information about the development team. The Upload and Download pages are connected through URLs. After a user uploads a file, they receive a unique URL containing a PageID. The Download page uses this PageID to parse and retrieve information such as password, file name, and file expiration date.

- Component Design

  ① GunPanel
  During the development process, some components were extracted and encapsulated separately. The main panel of the main page is encapsulated into its own component with added animation effects. The panels on the Upload and Download pages use the GunPanel component from the "components" folder. It encapsulates responsive pages and ensures code modularity.

  ② Linkbox
  This component generates file links and includes two buttons and a link box. Its parent component is the Upload page, which passes the link value to the child component to dynamically generate file links. The file link consists of the current browser address + "/#/download/" in the front and a 32-character random string representing the unique pageID at the end. For example: [http://localhost:8080/#/download/](http://localhost:8080/#/download/) stbQbtAkShwByykCc6FFX2ifBCbwhQfp. This allows file access using the pageID. In the Download page, the pageID is received and processed.

  ③ previewImage
  This component is used for online image preview and is implemented using the vue-viewer plugin. It includes a "Close Preview" button, and its parent component is the Download page. The URL of the image to be previewed is passed from the parent component to the child component. The child component initially displays the image as a thumbnail. Clicking the image enables zooming and other operations. After previewing the image, clicking the "Close" button triggers an event in the child component, which calls the parent component's event to hide this component.

  ④ previewPdf
  This component is used for online PDF preview and is implemented using the vue-pdf plugin. It includes "Previous Page," "Next Page," and "Cancel" buttons, and its parent component is the Download page. The URL of the PDF file to be previewed is passed from the parent component to the child component. The child component previews the file online, and clicking "Previous Page" or "Next Page" enables page navigation. After previewing the PDF, clicking the "Cancel" button triggers an event in the child component, which calls the parent component's event to hide this component.


  #### 3. Client Structure

The client in this project is built on the foundation of the web platform using Electron. The overall project structure is similar to the web platform. The main directory structure includes the client configuration file `background.js` and the packaging configuration file `vue.config.js`. The project structure is as follows:

![Design Work Directory.png](https://cdn.nlark.com/yuque/0/2020/png/2142105/1596079458087-c329503d-9c6d-4882-9b1e-49689fe72bbd.png#align=left&display=inline&height=913&originHeight=913&originWidth=303&size=37865&status=done&style=none&width=303)


# III. Testing

## (I) Testing Strategy

### 1. Types of Testing and Testing Framework

Currently, the project primarily uses unit testing as the testing type, with Jest as the testing framework. We also utilize Vue's accompanying testing tool, vue-test-utils. Additionally, we have added ad-hoc simple end-to-end (e2e) testing using Nightwatch as the automation testing framework. To use Nightwatch, we installed the @vue/e2e-nightwatch plugin, which is compatible with our Vue project.

### 2. Testing Environment

The testing environment is the same as the software development environment and requires npm and Vue dependencies to be installed.

### 3. Testing Objectives

The testing objective of our team is to test the JavaScript functions in the web platform under predetermined conditions to verify if they achieve the desired effects. This will facilitate further development and improvement. We also conduct partial visual testing and page interaction testing to predict if the program can correctly fulfill the corresponding requests in actual environments. Additionally, the subsequent inclusion of e2e testing simulates real user scenarios and tests the robustness of our project's code in real environments.

### 4. Testing Metrics

Currently, our testing metrics primarily include the number of tested functions and the pass rate. Due to the involvement of GunDB-related functions and methods in the project, which conflict with the current testing tools and frameworks, we encountered exceptions that we are currently unable to resolve solely with our existing capabilities. Therefore, we cannot conduct effective testing evaluations based on typical test coverage and overall pass rates. As an alternative, we focus on the test coverage and pass rate of functions unrelated to GunDB and PDF.

## (II) Test Report

We have completed the testing of the main components and partially tested the functions of some views components. The current test report is as follows (continuously updated):

![Test.png](https://cdn.nlark.com/yuque/0/2020/png/2142105/1596080904354-44bc3191-e2a2-48ba-b54a-53ae8538ff92.png#align=left&display=inline&height=400&originHeight=400&originWidth=930&size=43752&status=done&style=none&width=930)


## IV. Summary

### (I) Problems and Solutions

#### 1. Problem One

##### (1) Ideal: When file upload fails, the file should not be updated in gundb and the upload list.
##### (2) Problem: The file still exists in the upload list.
##### (3) Solution: Manually modify and call the built-in delete function `handleRemove` in `el-upload` to remove the failed file from the upload list and delete the corresponding file node in gundb.

#### 2. Problem Two

##### (1) Ideal: Web content should adapt to window changes.
##### (2) Problem: Text layout becomes chaotic when the window is resized.
##### (3) Solution: Implement responsive layout, use a different interface style to dynamically adapt to the interface changes when the interface is scaled down to a certain extent.

#### 3. Problem Three

##### (1) Ideal: Download file list should be within the background box.
##### (2) Problem: When the file name is too long, the list exceeds the background box and the background box size flickers.
##### (3) Solution: Monitor the browser window size, shrink the width of the file list by changing its style when the window is scaled down to a certain extent; when the file list exceeds a specified length, replace the excess part with an ellipsis (...) to control the length of the list.

#### 4. Problem Four

##### (1) Ideal: Uploading duplicate files should not be allowed.
##### (2) Problem: Duplicate files can be uploaded.
##### (3) Solution: When uploading a file, traverse the nodes to check if there is a file with the same name in the current file list. If it exists, call `handleRemove` to delete the uploaded file with the same name.

#### 5. Problem Five

##### (1) Ideal: Display a single prompt when file upload fails.
##### (2) Problem: During chunked upload, each failed chunk prompts a failure.
##### (3) Solution: Declare a variable to indicate whether the file has already failed to upload. If the prompt has been shown, subsequent failures will not prompt again. Use the variable to determine that if the file has already failed to upload, subsequent successful chunk uploads will not prompt, and the overall upload will not succeed.

#### 6. Problem Six

##### (1) Ideal: The download page can be accessed based on a randomly generated ID.
##### (2) Problem: After refreshing the download page, the link is not found.
##### (3) Solution: Instead of projecting all routes to the download page for unified judgment, which causes confusion in browser route navigation, project `/download/:id` to the download page. Only generated routes can be redirected to the download page, resolving the contradiction in route navigation.

#### 7. Problem Seven

##### (1) Ideal: Test files can automatically import the tested components and their referenced components.
##### (2) Problem: Imported components are shown as non-existent.
##### (3) Solution: Need to import the required referenced components at the beginning of the test file and register them in the global `localVue`. When creating the wrapper, include `localVue`.

#### 8. Problem Eight

##### (1) Ideal: Simulate testing of Date class functions using pre-set timestamps.
##### (2) Problem: Different local time zones directly affect the test results.
##### (3) Solution: After setting the timestamp, an additional Date object should be obtained to determine the appropriate test data based on the system's local time.

#### 9. Problem Nine

##### (1) Ideal: All common JavaScript functions can be tested using Jest.
##### (2) Problem: Some functions cannot be parsed by the Jest framework.
##### (3) Solution: Create mock functions to replace the original functions and simulate return values (known return value scenarios) to allow the program to continue running and check the code logic.

#### 10. Problem Ten

##### (1) Ideal: Users can freely enable and disable the local server in the client.
##### (2) Problem: It is difficult to deploy the server locally.
##### (3) Solution: Use the node.js environment of Electron to automatically install the Gun server using a script, and control the server's on/off state with a script.

#### 11. Problem Eleven

##### (1) Ideal: Users can customize the installation path when installing the client.
##### (2) Problem: The client is installed with default configurations.
##### (3) Solution: No relevant configuration files were found. After investigation, it was discovered that this version does not come with built-in configuration files and requires users to create their own. Therefore, create a configuration file in the project and write the required configurations into that file.

### 12. Problem Twelve

#### (1) Ideal: Users can automatically connect to servers on the local network.

#### (2) Problem: The client cannot find local network servers.

#### (3) Solution: Utilize the features of Gun itself. Use a script to find the IP addresses within the local network and add them to the local Gun server. Determine whether to connect to a specific node by checking if a Gun server is set up on those IP addresses.

### 13. Problem Thirteen

#### (1) Ideal: Use Gun database to insert and update data.

#### (2) Problem: Following the official Gun documentation for insertion often leads to failures, with lacking descriptions of details, resulting in a trial-and-error approach.

#### (3) Solution: Through practice and inquiries, a method was developed to ensure efficient insertion and updating of file data, successfully implementing file chunking and merging.

### 14. Problem Fourteen

#### (1) Ideal: Use Gun's asynchronous callback functions to achieve certain functionalities.

#### (2) Problem: Gun database's callback functions should be asynchronous, meaning that when sending an insertion or deletion request, it takes some time to receive and invoke the request without blocking. The biggest challenge with asynchronous callbacks is the inability to receive timely feedback during certain validations (e.g., querying passwords, checking file existence), and the inability to block in programs with strict sequential order (e.g., file chunking that must strictly follow the insertion order).

#### (3) Solution: A blocking method for asynchronous callbacks has not been explored yet. As a last resort, buffering was implemented using timing functions in consecutive insertions. Additionally, the insertion was changed from an array format to key-value pairs for updating file objects. Validation functions were placed within Gun's callback functions to ensure that the program continues running only after the callback functions are executed.

### 15. Problem Fifteen

#### (1) Ideal: Properly use Gun according to the official documentation.

#### (2) Problem: Gun sometimes produces inexplicable error messages. Gun database determines the success or failure of data insertion through callback functions. However, through practice, even if an insertion fails (i.e., the callback function encounters an error), the data of the file itself remains unaffected and can still be accessed and downloaded correctly. The challenge lies in the inability to determine when an insertion has failed.

#### (3) Solution: This problem has not been resolved yet. Instead, the approach was to give up on determining the success or failure of an insertion. Through practical experience, even if all insertions result in errors, the database still retains the correct file information, allowing for successful uploads and downloads.



# 5. Additional Information

## 1. GunDB

GunDB is an open-source decentralized database. It focuses on storing, loading, and sharing data in applications without the need to worry about servers, network calls, databases, or tracking offline changes or concurrent conflicts. For more details, please refer to the [Gun official documentation](https://gun.eco/docs/Todo-Dapp).

## 2. Decentralization

In a system with numerous nodes, each node has a high level of autonomy. Nodes can freely connect with each other to form new connectivity units. Any node can become a temporary center but does not possess mandatory central control. The influence between nodes forms nonlinear causal relationships through the network. Decentralization does not mean the absence of a center but allows nodes to freely choose and determine centers. In simple terms, centralization means the center determines the nodes. Nodes must depend on the center, and they cannot survive without it. In a decentralized system, anyone can be a node, and anyone can become a center. No center is permanent, but rather temporary, and no center has authority over nodes.

## 3. GunDB provides excellent offline work support for users with poor network conditions

When a browser requests data, it first merges the response with its own data and caches the result. The next request will receive an immediate response, including offline operation. If the server fails, data can still be recovered from the browser.

## 4. Base64 encoding is one of the most common encoding methods used for transmitting 8-bit byte code on the internet

For more details, please refer to the [detailed introduction of base64](https://baike.so.com/doc/5126695-5356001.html).

## 5. Vue.js framework is a progressive JavaScript framework for building user interfaces.

Unlike other large frameworks, Vue is designed to be incrementally adoptable. The core library of Vue focuses only on the view layer, making it easy to integrate with third-party libraries or existing projects. For more details, please refer to the [detailed introduction of Vue.js](https://baike.so.com/doc/25404384-26428381.html).

## 6. Code Variable Naming Convention

### (1) Class names should be hyphen-separated.

### (2) Method names should be camel-cased.

## 7. Code style checking with ESLint is introduced.