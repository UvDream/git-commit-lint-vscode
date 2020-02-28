/*
 * @Author: wangzhongjie
 * @Date: 2020-01-17 19:47:44
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2020-02-28 11:30:46
 * @Description:提交规范
 * @Email: UvDream@163.com
 */
export interface Emoji {
  readonly emoji: any;
  readonly code: any;
  readonly description: any;
  readonly name: any;
}
let emojis: Array<Emoji> = [
  {
    emoji: "feat✨",
    code: ":sparkles:",
    description: "引入新功能",
    name: "新功能"
  },
  {
    emoji: "fix🐛",
    code: ":bug:",
    description: "修复bug",
    name: "bug"
  },
  {
    emoji: "style💄",
    code: ":lipstick:",
    description: "更新UI样式文件",
    name: "样式"
  },
  {
    emoji: "format🎉",
    code: ":tada:",
    description: "格式化代码",
    name: "格式化"
  },
  {
    emoji: "docs📝",
    code: ":pencil:",
    description: "添加/更新文档",
    name: "文档"
  },
  {
    emoji: "perf👌",
    code: ":ok_hand:",
    description: "提高性能/优化",
    name: "优化"
  },
  {
    emoji: "init🎉",
    code: ":tada:",
    description: "初次提交/初始化项目",
    name: "初始化"
  },
  {
    emoji: "test✅",
    code: ":white_check_mark:",
    description: "增加测试代码",
    name: "测试"
  },
  {
    emoji: "refactor🎨",
    code: ":art:",
    description: "改进代码结构/代码格式",
    name: "优化"
  },
  {
    emoji: "patch🚑",
    code: ":ambulance:",
    description: "添加重要补丁",
    name: "补丁"
  },
  {
    emoji: "file📦",
    code: ":package:",
    description: "添加新文件",
    name: "新文件"
  },
  {
    emoji: "publish🚀",
    code: ":rocket:",
    description: "发布新版本",
    name: "新版本"
  },
  {
    emoji: "tag📌",
    code: ":pushpin:",
    description: "发布版本/添加标签",
    name: "书签"
  },
  {
    emoji: "config🔧",
    code: ":wrench:",
    description: "修改配置文件",
    name: "配置"
  },
  {
    emoji: "git🙈",
    code: ":see_no_evil:",
    description: "添加或修改.gitignore文件",
    name: "不可见"
  }
];
export default emojis;
