# php文件操作



## 第一章: 打开关闭文件



**打开:**

使用`fopen()`;

例1:以只读方式打开一个位于本地服务器的文本文件

```
	$fh = fopen("./test.txt", "r");
	$str = fread($fh, filesize("./test.txt"));	// 读取文件
	echo $str;
```

例2：以只读方式打开一个远程文件

```
$fh = fopen("http://www.baidu.com", "r");
```

**关闭:**

使用`fclose()`;

```
	$fh = fopen("./test.txt", "r");
	$str = fread($fh, filesize("./test.txt"));
	echo $str;
	fclose($fh);
```



## 第二章: 读取文件

php 提供了很多从文件中读取数据的方法，不仅可以一次只读取一个字符，还可以一次读取整个文件。

1.fread()



string **fread** ( int handle, int length )

fread()函数从handle指定的资源中读取length个字符,当到达EOF或读取到length个字符时

读取将停止。

如果要读取整个文件，使用filesize()函数确定应该读取的字符数;



```
	$fh = fopen("./test.txt", "r");
	$str = fread($fh, filesize("./test.txt"));	// 读取文件
	echo $str;
	
	同样也可以这样写:
	$fh = fopen("./test.txt", "r");
	while ($str = fgets($fh)) {
		echo $str."<hr>";
	}
	echo $str;
	但是这样太过繁琐
```



上面的`fread()`是需要打开关闭文件的.而下面俩种方式是不需要,它内部已经帮我们实现了

2.file()



返回的是一个数组

```
	$arr = file('./test.txt');
	echo var_dump($arr);
	
	=> array(1) { [0]=> string(9) "我黑泥" }
```



2.file_get_contents()

返回的是一个字符串

```
	$arr = file_get_contents('./test.txt');
	echo var_dump($arr);
	
	=>string(9) "我黑泥"
```



比如利用`file_get_contents()`获取京东首页

```
<?php
    echo file_get_contents('https://item.jd.com/3627958.com')
?>
```



file_exists()

file_exists() 函数检查文件或目录是否存在。

如果指定的文件或目录存在则返回 true，否则返回 false。

```
file_exists(path)
```



## 第三章: 写入文件

1.`fwrite`

`test.txt`中开始的内容是

```
我和你
```

当使用`fwrite`之后:

```
	$filename = './test.txt';	
	$fh = fopen($filename, 'w');	// 打开文件, 并调为写入模式
	$result = fwrite($fh, "我是你");	// 进行修改
	echo var_dump($result);
	fclose($fh);	// 关闭文件
```

此时`test.txt`中的内容被覆盖:

```
我是你
```



要是想在原来的文本内容上添加文本可以将`'w'`改为`'a'`:

```
	$filename = './test.txt';	
	$fh = fopen($filename, 'a');	// 打开文件, 并调为写入模式
	$result = fwrite($fh, "我是后面添加的内容");	// 进行修改
	echo var_dump($result);
	fclose($fh);	// 关闭文件
```

此时`test.txt`可以添加内容:

```
我是你我是后面添加的内容
```



2.`file_put_contents()`

```
int file_put_contents ( string filename, string data [, int flags [, resource context]] )
```

例子:

```
	file_put_contents('./test.txt', '我是file_put_contents');
```

此时文件已被修改.



## 第四章: 访问量小案例

每访问一次页面之后,都会记住访问量:

```
	$fh = fopen("./test.txt", "r");
	$count = fread($fh, filesize("./test.txt"));	// 读取文件
	$count++;
	file_put_contents('./test.txt', "{$count}");
	echo $count;
	fclose($fh);
```



##第五章: 复制,重命名,删除文件

1.copy()

bool **copy** ( string source, string dest ) 

将文件从 *source* 拷贝到 *dest*。如果成功则返回 **TRUE**，失败则返回 **FALSE**。 

例：Copy("test.txt", "test.txt.bak");

2.rename()

bool **rename** ( string oldname, string newname [, resource context] )

尝试把 *oldname* 重命名为 *newname*。 如果成功则返回 **TRUE**，失败则返回 

**FALSE**。

例：rename("test.txt", “test2.txt”);

3.unlink()

bool **unlink** ( string filename )

删除文件，如果删除成功返回true, 否则返回false;

例1：删除一个文本文件

unlink(“test.txt")；

1. filemtime() 返回文件的最后修改时间;

注："最后改变时间"不同于 "最后修改时间"。最后改变时间指的是对文件inode数据的任何改变，包括改变权限，所属组，拥有者等; 而最后修改时间指的是对文件内容的修改

1. file_exists() 检查文件或目录是否存在，如果存在返回true, 否则返回false;

2. is_readable() 判断文件是否可读，如果文件存在并且可读，则返回true;

3. is_writable() 判断文件是否可写，如果文件存在并且可写，则返回true;

4. rmdir() 删除文件目录

   ```
   	$bol = rmdir('./sha');	// 删除当前文件目录下的sha文件目录(只能删除文件夹)
   	var_dump($bol);
   ```

   它和`unlink`的区别就是 `unlik`删除的是文件,而`rmdir`删除的是文件夹,返回的都是一个布尔值.








