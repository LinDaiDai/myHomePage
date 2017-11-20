##MyEclipse



localhost/phpmyadmin



打开XAMPP，将apache和mySQL打开



###1、模拟后台工作



1.创建数据库内容

打开页面`localhost:8888/phpmyadmin`就是你的数据库控制台

新建一个数据库1704

在1704中

创建一个数据表

数据表名：users2

id int 长度100   索引PRIMARY  id名 

user varchar 长度1000 user名

pass varchar 长度1000 pass名

表注释：

用户信息注册表

Collation:

utf-8 general

存储引擎:

innoDB

创建成功后在users2中插入4个用户信息

信息有用户名，密码



2.创建php

在xammp的服务器文件目录htdos下创建

文件夹php，再在文件夹php下创建文件夹day04

day04下创建

1-mysql.php

```
<?php
    // 1.链接mysql
    mysql_connect('localhost', 'root', '');

    // 2.选择哪个数据库
    mysql_select_db('1704');

    // 3.编写sql(查询)语句
    // 获取数据库users这张表中的所有数据(字段)
    $query = 'SELECT * FROM `users2`';
    
    // 4. 执行sql语句
    $result = mysql_query($query);

    // 5.解析返回的数据
    $arr = array();
    while ($row = mysql_fetch_row($result)) {
        $arr[] = $row;
    }
    $arr = json_encode($arr);
    var_dump($arr);
    mysql_close();
    

```

完成上面的工作后，此时要是在前端使用http代理并请求就可以获取到数据库的数据



### 2、前端工作

1.创建一个vue项目

并安装好axios

```
cnpm i axios --save
```

在`main.js`中引入`axios`

2.设置代理

由于上面创建的数据库是在服务器中，所以此时我们要请求它是属于跨域的，因此要设置代理

在config/index.js中

```
proxyTable: {
      '/api': {
        target: 'http://localhost',	// 为你服务器的默认端口号，这里我监听的是80端口，所以可以不用写80
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
```



在`App.js`中编写一个按钮，用来获取我们前面数据库上的数据

```
<template>
  <div id="app">
    <button id="btn1" @click="getData">获取users的数据</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {

  },
  methods: {
    getData () {
      // 开发环境下 -》 请求的是Node的代理服务器
      this.$http.get
      ('http://localhost:8080/api/php/day04/1-mysql.php') // 请求你vue项目监听的端口号+代理服务器
        .then(res => {
          console.log(res.data)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

此时运行npm run dev

点击按钮是可以获取到数据的



### 3.上线到生成环境中

上面的步骤是前端和后台分开的操作

真正上线的时候我们是要将我们的项目进行打包然后放到你的服务器下

在打包之前我们需要将刚刚配置再重新改动一下

首先，打包之后，=我们原来的css  js  图片 或者等到东西都会被打包到一个static文件夹下，所以我们得在config/index.js中修改一下打包路径

```
module.exports = {
  build: {
  	...
    assetsPublicPath: '/php/day04/',	// 修改为你的服务器的路径
	...
  }
}
```



此时在app.js中也得修改下你的http请求路径

```
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <h2>总价：{{total}}</h2>
    <router-link to="/">返回首页</router-link>
    <router-link to="/">苹果</router-link>
    <router-link to="/banana">香蕉</router-link>
    <router-view></router-view> -->
    <button id="btn1" @click="getData">获取users的数据</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    total () {
      //从vuex中的state获取total
      return this.$store.state.total
    }
  },
  methods: {
    getData () {
      // 开发环境下 -》 请求的是Node的代理服务器
      // this.$http.get
      // ('http://localhost:8080/api/php/day04/1-mysql.php')
      //   .then(res => {
      //     console.log(res.data)
      //   })
      this.$http.get
      ('/php/day04/1-mysql.php')	// 由于我们是要放在和数据一起的服务器环境下，所以不需要代理了
        .then(res => {
          console.log(res.data)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```



运行`npm run build`进行打包

此时项目目录下出现了dist文件夹

将文件夹中的index和static复制到php/day-4下

打开页面

```
http://localhost/php/day04/index.html
```

点击按钮获取数据