## PHP



### 第一章: 安装和运行



示例代码开发环境submit

服务器xampp

1.在xampp/htdocs文件夹下创建文件php

编写php代码

2.打开xampp,这里我监听的是8080端口.要是想要改端口号可以在Apache中的Config中的第一个选项中修改.

看到`10:43:11  [Apache] 	Status change detected: running`就表示已开启.

3.将你的php文件拖入谷歌浏览器中,将地址栏改为`http://localhost:8888/php/hellow.php`





### 第二章: 基本语法



####2.1 php标记

```
- 1 , <?php echo “hello php”; ?>
- 2, <? echo “hello php”; ?>     //短标记
- 3, <script language=“php”>echo “hello php”</script>
- 4, <% echo “hello php”; %>  //asp风格
```

**注: 1,3可以直接使用，但是2，4需要修改php.ini的配置文件才能使用,只做了解**



#### 2.2 php注释

```
1，多行注释
/*
注释的内容
注释的内容
*/
2，单行注释
 // 被注释的内容
3，文档注释
/**
  *被注释的文档
  *被注释的文档
  */
```



#### 2.3 变量

**声明:**	

- 变量以$开头，后面跟变量名
- 变量字母，数字，下划线组成，不以数字开头
- 变量名区分大小写
- php于javascript类似是弱类型语言，不需要实现声明变量的数据类型

```
<?php $a = 20; $b = "30"; echo $a + $b ?>
<div>
	<?php echo "hello"; ?>
</div>
```

运行结果:

```
50
hello
```

此时若是:

```
<?php $a = 20; $b = &$a; $b = "30"; echo $a + $b ?>
<div>
	<?php echo "hello"; ?>
</div>
```

```
60
hellow
```

类似于js中的对象.赋值传递的地址,所以会对原来的变量也进行更改.

在声明变量为一个字符串时单引号和双引号没区别,如:

```
$a = 'aaa'
$a = "aaa"
```

但在引用时要是输出的字符串中有变量 一定要用双引号.类似于Js中的字符串模板

```
$a = 'aaa'	// 变量可以是单引号
echo "输出一个字符串:{$a}"		// 有变量是要用双引号
```



#### 2.4 常量

在js中定义常量是:

```
const PI = 3.1415926
```

php中:

```
define('PI', 3.1415926)
echo PI;	// 输出是不用像变量一样加$符
```



#### 2.5 内置常量

   PHP_OS   php所在操作系统的名称

   PHP_VERSION   当前php的版本号



#### 2.6 魔术常量

​     `__LINE__`	文件中的当前行号;

​	`__FILE__`	文件的完整路径和文件名;

​	`__FUNCTION__`	函数名称;

​	`__CLASS__`	类的名称;

​	`__METHOD__`	类的方法名;	

```
<?php 
	echo __LINE__;
	echo "<br>";
	echo __FILE__;
?>

=> 13
=> D:\xampp\htdocs\php\day01\hellow.php
```



#### 2.7 函数

在php中定义函数和js中一样.

如:

```
<?php 
	function show () {
		echo "show";
		echo "<hr>";
		echo "函数名称是:".__FUNCTION__;
	};
	show();
?>
=> show
=> show
```

**注: 一定要分号**

#### 2.8 字符串可以换行

在js中字符串换行的话会报错,但是在php中提供`<<<`来盛放这种换行的字符串.

```
<?php
	$c = <<<END
	DFEFD
	FDFDDF
END;			// 注:这里的END一定要挨着边缘.
	echo "输出一个字符串:{$c}";
?>
```

####2.9 模拟表单提交 

1. 创建一个`form.php`

```
	<form action="http://localhost:8888/php/day01/result.php">
		<input type="text" name="user">
		<input type="submit" name="">
	</form>
```

2. 创建接受信息的`result.php`

```
	<?php
		$u = $_GET['user'];
		echo "传过来的数据是:" . $u;
	 ?>
```



上面使用的是get请求,若是用post

```
	<form action="http://localhost:8888/php/day01/result.php" method="POST">
		<input type="text" name="user">
		<input type="submit" name="">
	</form>
```

```
	<?php
		$u = $_POST['user'];
		echo "传过来的数据是:" . $u;
	 ?>
```



###第三章: 类型数据

#### 3.1 标量数据类型

1.字符串:

三种定义方式:单引号,双引号,定界符

```
字符串转义

\n  换行

\r  回车

\t  水平制表符(tab键)

\  (反斜杠)

$  $(美元符)

\”   “(双引号)

```

2.整型(integer)

​	$age = 25;

3.浮点型(float, double)

$num = 5.39;

4.布尔型（bool）

​	$bo = TRUE;

​	$bo = FALSE;

####3.2 复合数据类型

#####1.索引数组

类似于js中的数组

```
	$week = array('星期一', '星期二', '星期四');
	print_r($week);
	echo "<br>";
	echo $week[1];
	
	=> Array ( [0] => 星期一 [1] => 星期二 [2] => 星期四 ) 
	=> 星期二
	

	// 索引数组的遍历
	for ($i=0; $i < count($week); $i++) {
		echo $week[$i]."<hr>";
	}
	=>	星期一
		星期二
		星期四
		
	// 利用for循环创建二维数组
	$arr = array();
	for ($i = 0; $i < 10; $i++) {
		$arr[$i] = [1, 2];
	}
	echo var_dump($arr)
```



#####2.关联数组

类似于js中的对象

```
	// 关联数组
	$userInfo = array('user' => 'wangxiansheng', 'pass' => '12345');
	print_r($userInfo);
	echo $userInfo['user'];
	
	=> Array ( [user] => wangxiansheng [pass] => 12345 ) 
	=> wangxiansheng
	
	echo "<br>";
	// 遍历关联数组
	foreach ($userInfo as $key => $value) {
		echo $value."<hr>";
	}
	
	=> 	wangxiansheng
		12345
```

##### 3. 数组的创建

1.使用array()函数

```
	$week = array('星期一', '星期二', '星期四');
	
	$week = array();
	$week[] = '星期一';
	$week[] = '星期二';
	$week[] = '星期三';

	echo var_dump($week);
	
	=> array(3) { [0]=> string(9) "星期一" [1]=> string(9) "星期二" [2]=> string(9) "星期三" }
```



2.使用class来创建数组

```
	class db{
		function __construct()
		{

		}
		public function show($value='xx')
		{
			echo $value;
		}
	}
	$db = new db();
	$db->show('your');	// 调用对象中的方法
```



3.使用函数创建数组

range() 建立一个包含指定范围单元的数组

```
	$arr = range(1, 10);

	echo var_dump($arr);
	
	=> array(10) { [0]=> int(1) [1]=> int(2) [2]=> int(3) [3]=> int(4) [4]=> int(5) [5]=> int(6) [6]=> int(7) [7]=> int(8) [8]=> int(9) [9]=> int(10) }
```





#### 3.3 特殊数据类型





#### 3.4 类型相关函数

1.gettype() 

返回变量的类型，共有8个可能的值 string、integer、float、boolean、array、object、null、unknow

```
	$str = 'aa';
	$arr = array(1);
	$num = 5;
	$float = 5.23;
	$userInfo = array('user' => 'wangxiansheng', 'pass' => '12345');
	
	echo gettype($str);
	echo "<br>";
	echo gettype($arr);
	echo "<br>";
	echo gettype($num);
	echo "<br>";
	echo gettype($float);
	echo "<br>";
	echo gettype($userInfo);
	
	=>	string
		array
		integer
		double
		array
```

2.is_type() 查看变量是否属于某个类型,是返回 TRUE ,否返回 FALSE;

```
	$arr = array(1);
	echo is_array($arr);
	
	echo "<br>";
	
	$num = 5;
	echo is_int($num);
```

3.var_dump()  获取变量的值和类型的详细信息

```
	$num = 5;
	echo var_dump($num);
	
	=> int(5)
```





### 第四章: 数组







## 第五章: 函数



### 5.2 函数分类

1.内置函数

PHP自身提供的很多功能强大的函数

2.创建自定义函数

```
例：function sayhello(){
		echo 'hello';
	}
```





### 5.1 函数作用域



**由于引入了函数，程序中变量的能见度发生了变化，即变量的作用范围发生了改变;**

**变量分为:全局变量，局部变量，静态变量;**



在php中是没有全局作用域的.也就是函数内部不能调用函数外部的一个变量.

这和js中是不同的 

如:

```
$a = 5;
function show () {
  echo $a;
}
show();
```

在php中这样写是会报错的,

但是如果加上`global`之后就可以了 

```
$a = 5;
function show () {
	global $a;
  	echo $a;
}
show();
```

此时可以正常输出5;



**静态变量**

我们知道要是像下面这样写:

```
function show() {
  $num = 0;
  $num++;
  echo $num
}
show();
show();
show();

=> 	1
 	1
 	1
```

但是如果在$num前将上static

```
function show() {
  static $num = 0;
  $num++;
  echo $num
}
show();
show();
show();

=> 	1
 	2
 	3
```

在js中要想实现这个功能只能使用闭包:

```
	function foo() {
		var i = 0;
		return function () {
			i++;
			console.log(i);
		}
	}
	var a = foo();
	a();
	a();
	a();
	
	或者这样写:
		var a = (function () {
		var i = 0;
		return function () {
			i++;
			console.log(i);
		}
	})();
	a();
	a();
	a();
```

但是js一般要少使用闭包,这样会造成我们的内存被占用,要是内部计算的数值比较小还好.



### 5.3 参数传递

1.值传递(传值)

​	函数内对参数值的改变不会影响函数外部的值;

```
$a = 10;
function foo($b) {
  	$b = 20
	echo $b
}
foo($a);
echo $a

=> 20
=> 10
```



2.引用传递(传址)

​	有些情况下，可能希望在函数体内对参数的修改在函数体外也能反映;

​	使用引用传递参数要在参数前加上&符号;

​	变量本身传入，传入后的变量与原变量建立联系;

​	函数体内变量的变化，会影响到原变量本身;

```
$a = 10;
function foo(&$b) {
  	$b = 20
	echo $b
}
foo($a);
echo $a

=> 20
=> 20
```



### 5.4 include和require

1.include()	

​	include()语句将在其被调用的位置处包含一个文件。

有三个文件`header.html`,`footer.html`,`main.php`

在`main.php`中引用另俩个页面

```
<?php
	include 'header.html';
?>
<main>我是主体</main>
<?php
	include 'footer.html';
?>
```



并且也可以加载php文件,也可以加载多个相同的文件

```
<?php
	include 'header.php';
?>
<?php
	include 'header.php';
?>
<main>我是主体</main>
<?php
	include 'footer.html';
?>
```

2.include_once()

​	include_once()的作用与include()相同，不过它会首先验证是否已经包含了该文件，如果已经包含，则不再执行include_once();

3.require() 与include() 一样，只不过require()我们通常放在php程序的最前面；

4.require_once() 与include_once() 一样，但是也要放在php程序的最前面；

5.include和require的区别

​     require一个文件存在错误的话，那么程序就会中断执行了，并显示致命错误 

​     include一个文件存在错误的话，那么程序不会中端，而是继续执行，并显示一个警告错误。

