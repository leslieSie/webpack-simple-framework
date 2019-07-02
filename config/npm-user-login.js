module.exports = {
  loginConfig: {
    // 账号，密码，邮箱需要到https://www.npmjs.com/ 网站去注册
    username: "lesliesie", // 必填
    password: "1qaz@WSXxcy", // 必填
    email: "2358407968@qq.com" // 必填
  },
  /**
   * 默认初始化版本是0.0.1
   *
   * version接受两种类型的传参Object,Function，默认采用version Object
   *  Function 指定需要返回的版本号，传入version函数的第一个参数为当前系统的版本号
   *  函数返回的值将作为当前发布的版本号和下一次传入的参数。
   *
   *  Object version的参数配置对象
   *    version.auto 接受参数为布尔类型，默认值为true,表示的是自动计算版本号，当static生效的时候，autoIncrement无效
   *    version.static 接受类型为String类型，无默认值，当static不等于undefined或者空字符串的时候，该值表示手动自定版本号
   *    version:autoIncrement 接受Number类型，默认值为1，当static生效的时候，autoIncrement无效
   *
   *  type支持三种类性质：structure,feature,bug
   *  type用来表示修复版本的类型，配合 version.autoIncrement 定位发布版本的增量修改位置
   *  每发布一个版本号，对于下一级的版本号都会清零
   *  版本号的定义格式是：
   *  {structure}.{feature}.{bug}
   *
   *  structure:用来定义框架的组织结构的更改
   *  feature:定义对框架的功能上的拓展
   *  bug:修复框架原有的bug
   *
   *  支持String类型的传入。默认值 type:'bug'
   *
   *  例如：当前版本号：0.0.1，version.autoIncrement:1
   *    当type:structure时，version:1.0.0
   *    当type:feature时:0.1.0
   *    当type:bug时，version:0.0.2
   *
   **/

  releaseConfig: {
    version: function(){},
    type: ""
  },

  /*
   * name <String> 包或发布名 (必填)
   * description <String> 描述 default:undefined
   * main <String> 入口配置 default:undefined
   * repository <String> git远程仓库（必填）
   * dependencies <String> 生产环境依赖 default:undefined
   * devDependencies <String> 开发环境依赖 default:undefined
   */
  packageConfig: {
    name: "test",
    description: "",
    main: "",
    repository: "https://github.com/docker-library/mariadb"
  },

  /**
   * 用来指定再file_storage文件夹中信息存储的配置
   * name <String> 用来指定存储信息的文件名 default:'setting.json'
   * vFiled <String> 指定version存储的字段 default:'version'
   */
  storageConfig: {
    name: "",
    vFiled: ""
  }
};
