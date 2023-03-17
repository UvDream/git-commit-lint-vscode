"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
/*
 * @Author: wangzhongjie
 * @Date: 2020-01-17 19:47:44
 * @LastEditors: Lanrri
 * @LastEditTime: 2023-03-16 15:56:33
 * @Description: 主入口
 * @Email: UvDream@163.com
 */
const vscode = require("vscode");
const utils_1 = require("./utils");
const activate = (context) => {
    const disposable = vscode.commands.registerCommand('extension.gitEmoji', utils_1.emojiCommit);
    context.subscriptions.push(disposable);
};
exports.activate = activate;
//# sourceMappingURL=extension.js.map