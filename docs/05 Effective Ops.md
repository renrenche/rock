## 运维自动化

> 在运维自动化方面，Rock提供了一些脚本示例供参考，这些示例已经有所应用。

在部署方面，Rock提供了一键部署的解决方案。前提是，要有公司内部的jenkins系统支持。
所有命令脚本都在scripts目录下，并且在package.json中做了命令的声明。
在介绍如何实现一键部署之前，先来聊聊在不借助任何集成工具的情况下，如何部署一个服务？

1. <a href="#部署的演变">部署的演变</a>
2. <a href="#部署流程">部署流程</a>
3. <a href="#一键部署">一键部署</a>

### <a name="部署的演变">部署的演变</a>

![部署的演变](/docs/image/deployment-evolution.png)

最初，我们的HTTP服务和静态资源都serve在一台机器上。

后来，有了CND，我们可以将无需实时编译，且很少变化的资源（静态资源如css,image,js)交由CDN提供服务。这样可以减少请求时间，同时降低服务器的压力。

这时，文件分布在“两台”机器上了，需要保证静态资源的地址是指向CDN的服务器的，例如

	<img src="http://cdn.xxx.com/index.js" />。

同时，为了保证静态资源发生变化，CDN能正常回源，我们还为文件加上了版本号。不过这是另外一件事了。

### <a name="部署流程">部署流程</a>
对于前一种情况，我们只需要在一台服务上更新所有文件，重启服务即可。

但是在后一种情况下，一般需要如下3个步骤：

![部署的演变](/docs/image/deployment-process.png)

ROCK对这三个步骤，都提供了支持脚本：

1. 编译静态文件的命令

		npm run build:release
3. 替换资源版本号的命令

		gulp deploy

2. 步骤3的命令

		npm run deploy:production

### <a name="一键部署">一键部署</a>
配合gitlab和jenkins系统，我们优化了整个部署上线的流程，分为以下4个阶段（如图）。

下面将对每个阶段以及阶段之间的触发配置做简单说明。
![部署的演变](/docs/image/deployment-quick.png)

**阶段介绍：**

1. 将开发分支push到远程
2. jenkins-CI 运行自动化测试命令

		npm run test:coverage

3. Jenkins-Build运行构建资源的命令，实现预编译，并且将资源上传到CDN的功能

		npm run build:jenkins

4. Jenkins-Deploy运行重启服务的命令


		./scripts/deploy.sh

**其中，过程之间的触发需要配置：**

a. 提交merge request的配置
b. 在gitlab中添加webhooks, 代码被merge后即可触发。
c. 手动到jenkins-deploy上，一键点击部署。

**最终达到的效果是：**

在使用我们提供的命令，配置了Jenkins-CI, build, deploy后，提一个Merge Request后（Jenkins-CI）会立即运行单元测试并且将单测结果显示在Gitlab上。测试通过后，由管理员合并代码，代码合并后，会自动触发（Jenkins-Build）资源构建。资源构建成功后会发送一条通知到钉钉上（该服务由通知系统提供）。最后，管理员一键部署（Jenkins-Deploy）服务即可。
