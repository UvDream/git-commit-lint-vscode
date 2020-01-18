/*
 * @Author: wangzhongjie
 * @Date: 2020-01-17 19:47:44
 * @LastEditors  : wangzhongjie
 * @LastEditTime : 2020-01-17 23:06:23
 * @Description:提交规范
 * @Email: UvDream@163.com
 */
export interface Emoji {
  readonly emoji: any;
  readonly entity?: any;
  readonly code: any;
  readonly description: any;
  readonly name: any;
}
let emojis: Array<Emoji> = [
  {
    emoji: "feat✨",
    entity: "&#x1f525;",
    code: ":fire:",
    description: "引入新功能",
    name: "新功能"
  },
  {
    emoji: "fix🐛",
    entity: "&#x1f41b;",
    code: ":bug:",
    description: "修复 bug",
    name: "bug"
  },
  {
    emoji: "style💄",
    entity: "&#x1f525;",
    code: ":lipstick:",
    description: "更新 UI 和样式文件",
    name: "样式"
  },
  {
    emoji: "docs📖",
    entity: "&#ff99cc;",
    code: ":lipstick:",
    description: "添加/更新文档",
    name: "文档"
  },
  {
    emoji: "perf👌",
    entity: "&#x2705;",
    code: ":white_check_mark:",
    description: "提高性能/优化",
    name: "优化"
  },
  {
    emoji: "init🎉",
    entity: "&#x1f3a8;",
    code: ":tada:",
    description: "初次提交/初始化项目",
    name: "初始化"
  },
  {
    emoji: "test✅",
    entity: "&#x1f680;",
    code: ":rocket:",
    description: "增加测试代码",
    name: "测试"
  },
  {
    emoji: "refactor🎨",
    entity: "&#x2728;",
    code: ":sparkles:",
    description: "改进代码结构/代码格式",
    name: "优化"
  },
  {
    emoji: "patch🚑",
    entity: "&#128657;",
    code: ":ambulance:",
    description: "添加重要补丁",
    name: "补丁"
  },
  {
    emoji: "file📦",
    entity: "&#x1f4dd;",
    code: ":pencil:",
    description: "添加新文件",
    name: "新文件"
  },
  {
    emoji: "publish🚀",
    entity: "&#127881;",
    code: ":tada:",
    description: "发布新版本",
    name: "新版本"
  },
  {
    emoji: "tag🔖",
    entity: "&#x1f516;",
    code: ":bookmark:",
    description: "发布版本/添加标签",
    name: "书签"
  },
  {
    emoji: "config🔧",
    entity: "&#x1f527;",
    code: ":wrench:",
    description: "修改配置文件",
    name: "配置"
  },
  {
    emoji: "git🙈",
    entity: "&#8bdfe7;",
    code: ":see_no_evil:",
    description: "添加或修改.gitignore文件",
    name: "不可见"
  }
];
export default emojis;
