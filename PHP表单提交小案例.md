#PHP表单提交小案例

案例要求: 利用用户从表单输入数据, 提交之后存储到后台数据库(这里向用txt文件来代替)

然后进入用户的登录也,能够显示用户的信息



###1.编辑前端页面

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="./form-hanle.php">
        姓名：<input type="text" name="name"></br>
        性别：<input type="radio" name="sex" value="0">男<input type="radio" name="sex" value="1">女<input type="radio" name="sex" value="2">其他
        爱好：<input type="checkbox" name="love[]" value="0">敲代码<input type="checkbox" name="love[]" value="1">打游戏<input type="checkbox" name="love[]" value="2">打球<input type="checkbox" name="love[]" value="3">画画
        学历：<select name="education">
            <option value="0">初中</option>
            <option value="1">高中</option>
            <option value="2">专科</option>
            <option value="3">本科</option>
            <option value="4">研究生</option>
        </select>
        <input type="submit" value="提交">
    </form>
</body>
</html>
```



### 2. 获取数据php

form-hanle.php

```
<?php
    $name = $_GET['name'];
    $sex = $_GET['sex'];
    $love = $_GET['love'];
    $education = $_GET['education'];

    $arr = array("name" => $name, "sex" => $sex, "love" => $love, "education" => $education);
    $res = json_encode($arr);

    $fileName = './db.txt';
    if (file_exists($fileName)) {   // 判断有没有这个文件
        $result = file_put_contents($fileName, $res."\n");
        var_dump($result);
    } else {
        $str = file_get_contents($fileName);
        $str .= ($res."\n");
        $result = file_put_contents($fileName, $str);
        var_dump($result);
    }
?>
```







