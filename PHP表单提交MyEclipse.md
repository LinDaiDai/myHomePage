#PHP表单提交MyEclipse

利用php配合myEclipse完成表单提交工作

###1. 数据库

1.创建数据库内容

打开页面`localhost:8888/phpmyadmin`就是你的数据库控制台

新建一个数据库1704

在1704中

创建一个数据表

数据表名：users

id int 长度100   索引PRIMARY  id名 

user varchar 长度1000 user名

pass varchar 长度1000 pass名

表注释：

用户信息注册表

Collation:

utf-8 general

存储引擎:

innoDB



###2. 前端工作

创建名为`3-form.html`文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="jquery-3.2.1.js"></script>
    <title>Document</title>
</head>
<body>
    用户名： <input type="text" id="user"></br>
    密码：<input type="password" id="pass"></br>
    <button id="add">注册</button>
    <button id="login">登录</button>
</body>
<script>
    $(function () {
        $('#login').on('click', function () {
            var url = '/php/day04/login_add.php';
            var user = $('#user').val();
            var pass = $('#pass').val();
            console.log(user, pass);
            $.ajax({
                url: url,
                data: {
                    user: user,
                    pass: pass,
                    act: 'login'
                },
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                }
            })
        })
        $('#add').on('click', function () {
            var url = '/php/day04/login_add.php';
            var user = $('#user').val();
            var pass = $('#pass').val();
            console.log(user, pass);
            $.ajax({
                url: url,
                data: {
                    user: user,
                    pass: pass,
                    act: 'add'
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                }
            })
        })
    })

</script>
</html>
```



### 3.连接数据库

创建`common.php`

```
<?php 
  // 1.连接mysql
  mysql_connect('localhost', 'root', '');

  // 2.选择哪个数据库
  mysql_select_db('1704');
 ?>
```



###4.编写php

创建`login_add.php`文件

```php
<?php 
  include './common.php';

  $act = $_GET['act'];
  switch ($act) {
    case 'add':
      $user = $_GET['user'];

      // 查询数据中有没有该用户
      $query = "SELECT user FROM `users` WHERE user='{$user}'";
      // 4.执行sql语句
      $result = mysql_query($query);

      $arr = mysql_fetch_row($result);
      if ($arr) {
        // 该用户名注册过了该
        $jsonArr = array('err'=>1, 'msg'=>'用户名已被注册');
        echo json_encode($jsonArr);
      } else {
        // 没有这个用户
        // 获取用户输入的密码
        $pass = $_GET['pass'];
        $pass = md5($pass);
        $query = "INSERT INTO users(id, user, pass) VALUES(null, '{$user}', '{$pass}')";
        $result = mysql_query($query);
        $insertId = mysql_insert_id();
        if ($insertId > 0) {
          $jsonArr = array('err'=>0, 'msg'=>'插入成功');
        } else {
          $jsonArr = array('err'=>1, 'msg'=>'插入失败');
        }
        echo json_encode($jsonArr);
      }
      break;
    case 'login': 
      $user = $_GET['user'];

      // 查询数据中有木有该用户
      $query = "SELECT user FROM `users` WHERE user='{$user}'";

      // 4.执行sql语句
      $result = mysql_query($query);
      
      $bol = mysql_fetch_row($result);
      if ($bol) {
        $pass = $_GET['pass'];
        $pass = md5($pass);

        $query = "SELECT user, pass FROM `users` WHERE user= `{$user}` AND pass=`{$pass}`";
        $result = mysql_query($query);
        $bol = mysql_fetch_row($result);
        if ($bol) {
          $jsonArr = array('err'=>0, 'msg'=>'登陆成功');
        } else {
          $jsonArr = array('err'=>1, 'msg'=>'密码错误');
        }
      } else {
        $jsonArr = array('err'=>1,'msg'=>'用户名不存在');
      }
      echo json_encode($jsonArr);

      break;
  }

  mysql_close();
 ?>
```

