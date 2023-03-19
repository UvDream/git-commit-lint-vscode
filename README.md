# git-commit-lint-vscode

在日常的开发中,目前主流的代码管理工具就是 `git` 了,当我们对代码进行改动了,首先得`git commit`提交到本地仓库,`git` 规定了提交时必须填写提交信息作为改动说明,保存 `commit` 历史中,可以找到历史代码,也方便他人 review,还可以输出 CHANGELOG,对项目的研发质量都有很大的提升。

但是在平时的工作中,大部分对于`commit` 都是简单的填写,没有好好的重视,这对于项目管理和维护来说,无疑是不友好的。这个插件就是规范化`git`提交规范,让你的提交不仅"好看"还"实用"

## git 规范提交从何说起?

`git` 规范提交从哪里开始的呢?起源在哪呢?emmmmmm,这就追溯到了`Angular`了!
让我们看下`Angular`社区的提交规范
![](static/angular.png)

这个提交记录是不是一目了然?所以`git commit`规范下还是很有必要的!

## 说明

|   类型   | emji |           描述            |
| :------: | :--: | :-----------------------: |
|   feat   |  ✨  |        引入新功能         |
|   fix    |  🐛  |         修复 bug          |
|  style   |  💄  |    更新 UI 样式文按键     |
|  format  |  🥚  |        格式化代码         |
|   docs   |  📝  |       添加/更新文档       |
|   perf   |  👌  |       提高性能/优化       |
|   init   |  🎉  |    初次提交/初始化项目    |
|   test   |  ✅  |       增加测试代码        |
| refactor |  🎨  |   改进代码结构/代码格式   |
|  patch   |  🚑  |       添加重要补丁        |
|   file   |  📦  |        添加新文件         |
| publish  |  🚀  |        发布新版本         |
|   tag    |  📌  |        发布新版本         |
|  config  |  🔧  |       修改配置文件        |
|   git    |  🙈  | 添加或修改.gitignore 文件 |

## 使用效果

![](static/git-commit-lint.png)

## 使用说明

- 1
  ![](static/first.png)
- 2
  ![](static/then.png)

## 下载

在 vscode 扩展中搜索 `git-commit-lint-vscode` 即可找到该插件。

## 插件配置

![](static/extend.png)

你可以在 vscode 的 文件 -> 首选项 -> 设置 -> 扩展 -> git-commit-lint-vscode 中对该插件进行配置，目前可选的配置项为：

1. Accurate Locating: 当存在多个存储库时，是否精确定位到选定存储库的输入框，默认为`否`。注：该功能在多数情况下可以正常运行，只有当你的源代码管理存储库存在多个存储库，如只选择部分存储库或顺序错误时，就会选中错误的输入框。
2. Cover Input Value: 是否覆盖提交信息, 默认为`是`。如果取消勾选，则会在之前的提交信息前插入 emoji 或者 code。
3. Custom Format: 自定义 git 提交格式, 默认为`${emoji}${code}: `。可以完全自定义 参数取`Custom Type`里面的`key`
4. Custom Type: 自定义 git 提交类型, 默认为

```json
[
  {
    "emoji": "✨",
    "type": "feat",
    "name": "引入新功能",
    "description": "新功能"
  },
  {
    "emoji": "🐛",
    "type": "fix",
    "name": "修复bug",
    "description": "bug"
  },
  {
    "emoji": "💄",
    "type": "style",
    "name": "更新UI样式文件",
    "description": "样式"
  },
  {
    "emoji": "🥚",
    "type": "format",
    "name": "格式化代码",
    "description": "格式化"
  },
  {
    "emoji": "📝",
    "type": "docs",
    "name": "添加/更新文档",
    "description": "文档"
  },
  {
    "emoji": "👌",
    "type": "perf",
    "name": "提高性能/优化",
    "description": "优化"
  },
  {
    "emoji": "🎉",
    "type": "init",
    "name": "初次提交/初始化项目",
    "description": "初始化"
  },
  {
    "emoji": "✅",
    "type": "test",
    "name": "增加测试代码",
    "description": "测试"
  },
  {
    "emoji": "🎨",
    "type": "refactor",
    "name": "改进代码结构/代码格式",
    "description": "优化"
  },
  {
    "emoji": "🚑",
    "type": "patch",
    "name": "添加重要补丁",
    "description": "补丁"
  },
  {
    "emoji": "📦",
    "type": "file",
    "name": "添加新文件",
    "description": "新文件"
  },
  {
    "emoji": "🚀",
    "type": "publish",
    "name": "发布新版本",
    "description": "新版本"
  },
  {
    "emoji": "📌",
    "type": "tag",
    "name": "发布版本/添加标签",
    "description": "书签"
  },
  {
    "emoji": "🔧",
    "type": "config",
    "name": "修改配置文件",
    "description": "配置"
  },
  {
    "emoji": "🙈",
    "type": "git",
    "name": "添加或修改.gitignore文件",
    "description": "不可见"
  }
]
```

## issues

使用中可以在这提问,有什么需求同样可以在这提出来

https://github.com/UvDream/git-commit-lint-vscode/issues
