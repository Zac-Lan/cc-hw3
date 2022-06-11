# cc-hw3  

## 在本地端運行  
### in terminal  
‵‵‵
npm install express --save  
node app.js  
‵‵‵

### in browser  
網址列輸入‵‵‵http://localhost:3000/index.html‵‵‵  

## 建立docker image  
‵‵‵
docker build -t ${image-name} .  
‵‵‵

## run docker container  
‵‵‵
sudo docker run -d --rm -p 3000:3000 --name ${container-name} ${image-name}  
‵‵‵
