title: 原理分析
---

宿主机、目标机群、操作用户关系如下图所示，宿主机（walle所在的机器），是一个中间机器，是代码托管与远程目标机群的纽带。所以宿主机需要与代码托管(github/gitlab)和远程目标机群都建立ssh-key信任。
![](./static/walle-flow-relation.jpg)

#### 上线流程图
![](./static/walle-flow-deploy.jpg)
