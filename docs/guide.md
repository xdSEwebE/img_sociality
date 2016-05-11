## 基础准备

- 安装`git`环境，[下载地址](https://git-scm.com/download/)
    - `windows`用户下载好以后使用`Git Bash`进行相关操作
- 可以去学习廖雪峰的`git`教程，[站点地址](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)
- `markdown`去写文档，置于`wiki`中，你可以在本地用任何你喜欢的编辑器去写😄，比如`sublime`,`visual studio code`,`atom`，它只是纯文本而已。
- 命名所有文档请使用英文，并且追加到`docs/README.md`里

## 基于Git的代码协作流程

你当前所访问的仓库为`xdSEwebE/img_sociality`，是项目组的共有仓库，我们使用基于`fock`的协作流程，每一个人都会在自己独立的分支上进行开发，开发完毕后开启`pull request`，由`项目管理员`及`相关人员`讨论结束后，方可归并至`master`分支。

#### 开发流程：

开发者`fock`公共仓库，去个人主页找到仓库，随后克隆至本地
    ```
    git clone git@github.com:__your_name__/img_sociality.git
    ```
- 开发者需要添加一个远程主机，使用`upstream`作为名称，指向共有仓库，用以**和共有仓库进行同步。**
    ```
    git remote add upstream https://github.com/xdSEwebE/img_sociality.git
    ```
- 按照分支规范去创建新分支
    ```
    git branch -b new_branch
    ```
- 开始工作，合理的`commit`
- 工作完毕，准备合并至共有仓库
    - 因为我们不能保证在我们工作期间，主分支一定不会发生更新，所以为了避免冲突，我们需要先将自己的仓库更新至最新状态，为此，我们首先切换回本地仓库
    ```
    git checkout master
    ```
    - 获取远程分支的最新内容，随后会在我们本地仓库创建了名为`upstream/master`的分支，可以使用`git branch -a`命令进行查看
    ```
    git fetch upstream master
    ```
    - 我们尝试合并，如果遇到冲突，自行使用`git add`解决冲突。
    ```
    git merge upstream/master #合并分支
    ```
    - 修正分支线，我们切换回刚才的工作分支，将当前分支时间线修正到`master`分支前，并且纳入刚刚主线的更新
    ```
    git checkout new_branch
    git base master
    ```
- 此时我们已经准备好了，我们将更新推送到自己的仓库里
	```
    git push -u origin new_branche  #第一次使用-u命令，将本地分支和远程分支关联起来，随后只需要使用 git push
    
	```
- 发起`pull request`,我们需要在Web页面打开自己`fock`的仓库，发起`pull request`，原目标为`自己仓库的new_branch`，目标为`共有分支的master分支`，
随后将会通知项目管理员进行审查，可以进行相关讨论，做一些新的改进，随后重复上述过程，最终由项目管理员接受`pull request`，并纳入`master`分支。

## 参考资料

- 《Git pro 中文版》[http://git.oschina.net/progit/](http://git.oschina.net/progit/)

---

author:Lucky Jing
 
Date: 2016/5/11 