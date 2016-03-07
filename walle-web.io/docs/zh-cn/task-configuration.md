title: 高级任务配置
---

高级任务方便用户自定义一些操作，无论是在代码检出前后，还是切换版本前后。

## 一、java配置实例
----------------------------
**pre_deploy**任务

```
echo pre_deploy >> /tmp/cmd        # 初始化一些东西，自由发挥
```

**post_deploy**任务
```
mvn package -Dmaven.test.skip=true # 编译java
mvn clean                          # 打扫
mv WEB-INF/config.Properties.test WEB-INF/config.Properties # 切换环境相应的配置
rm -rf src                         # 甚至删除无用代码
```

**pre_release**任务
```
./xx.sh stop                       # 暂停服务
```

**post_release**任务
```
./xx.sh start                      # 启动服务
```

## 二、如果我想执行`sudo`命令？
---------------------------

想执行`sudo`命令的前提是用户有root权限，要执行哪些命令？

- 添加用户到sudoers

    ```
    visudo
    www    ALL=(ALL)       ALL
    ```

- 添加免密码命令

    ```
    visudo
    www ALL = (ALL) NOPASSWD: /usr/local/nginx/bin/nginx
    ```

- 设置用户的tty（宿主机执行sudo需要此步，目标机可以跳过此步）

    ```
    Defaults:www    !requiretty
    ```