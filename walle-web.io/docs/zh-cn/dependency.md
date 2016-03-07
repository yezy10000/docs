title: 依赖
---

* Bash(git、ssh)
    * 意味着不支持win、mac的zsh
* LNMP/LAMP(php5.4+)
    * php需要开启pdo_mysql，exec函数执行
* Composer
    * 如果国内环境安装极慢，可以直接下载[vendor](http://pan.baidu.com/s/1c0wiuyc)解压到项目根目录

**php5.6环境CentOS安装：**

- 删除老的安装包

    ```yum remove php.x86_64 php-cli.x86_64 php-common.x86_64 php-gd.x86_64 php-ldap.x86_64 php-mbstring.x86_64 php-mcrypt.x86_64 php-mysql.x86_64 php-pdo.x86_64```

- 更新源

    ```
    CentOs 6.x
    rpm -Uvh http://mirror.webtatic.com/yum/el6/latest.rpm
    CentOs 7.X
    rpm -Uvh https://mirror.webtatic.com/yum/el7/epel-release.rpm
    ```

- 安装php 5.6相关组件

    ```yum install php56w.x86_64 php56w-cli.x86_64 php56w-common.x86_64 php56w-gd.x86_64 php56w-ldap.x86_64 php56w-mbstring.x86_64 php56w-mcrypt.x86_64 php56w-mysql.x86_64 php56w-pdo.x86_64```

- 安装php-fpm 5.6

    ```yum install php56w-fpm```