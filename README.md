# webpack-simple-framework

webpack-simple-framework一个基于webpack构建的脚手架工具，用于对JS框架进行打包处理使用，**面向轮子打包使用，非直接构建web应用**。



### webpack-simple-framework与vue-cli的差异：

> 1. webpack-simple-framework相较于vue-cli比较简单，没有太过复杂的框架配置，方便上手与对脚手架的修改
> 2. webpack-simple-framework将演示的代码与最后打包出来的代码分离出来，而且vue-cli只针对项目代码，也即是vue-cli开发和生产模式下打包的代码是一样的。
> 3. webpack-simple-framework支持命令行发布代码到npm上（实现中）:worried:
> 4. webpack-simple-framework支持对 eslint 一键自动修复代码编码风格
> 5. 未来支持vue和react(虽然目前只支持vue) :worried:



### 安装运行方法

> git clone https://github.com/leslieSie/webpack-simple-framework.git
>
> yarn install (推荐) || npm install
>
> yarn dev || npm run dev



### scripts的用法

**dev** : 用来开启开发模式，自动运行开发服务器，默认网址：http:localhost:8888

可以通过在config文件夹下面的dev.config.js文件去做修改。

**build** : 用于对要编写的框架进行打包成最终发布效果的,生成的地址在build文件夹下面

**lint** : 用于对代码进行eslint的检测和修复，相当执行lint:dev和lint:prod两条命令

**lint:dev** : 对view目录下面的代码进行风格检测修复

**lint:prod**  : 对src目录下面的代码进行风格化修复



##### 目录结构说明

![目录文档结图](./public/directory.png)



**build目录** : 用于存放最终打包发布的文件目录，一般在这个文件目录进行修改，如果安装之后没有build文件的话，执行yarn build就会自动生成产生。

**config目录** : 存放webpack打包配置文件

**dist目录** : dev server的指向目录，用于开发模式下面的调试，不在上面进行修改

**public目录** : 存放公共的资源文件，一般存放图片等静态资源

**src目录** : 最终要打包的框架的源码

**view目录** : 开发模式对应测试代码存放的目录，区别于**src目录**,view目录执行yarn build的情况下，不会对view目录下面的代码进行打包，该目录下面的代码仅用于在开发模式下的调试使用。



### 扶持作者

开源不易，一分钱也是钱，希望得到各位大佬们的支持，你的支持是我前进的动力。

![微信支付码](./public/alipay_qrcode.jpg)



