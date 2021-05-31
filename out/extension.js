"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: wangzhongjie
 * @Date: 2020-01-17 19:47:44
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2021-05-31 10:10:17
 * @Description:主入口
 * @Email: UvDream@163.com
 */
const vscode = require("vscode");
const util_1 = require("./config/util");
const git_emoji_zh_1 = require("./config/git_emoji_zh");
function activate(context) {
    let disposable = vscode.commands.registerCommand("extension.gitEmoji", (uri) => {
        const git = getGitExtension();
        if (!git) {
            vscode.window.showErrorMessage("无法加载git插件!请先安装git插件!");
            return;
        }
        const method_key = context.globalState.get("display_method", "default");
        let items = git_emoji_zh_1.default.map(util_1.display_method[method_key]);
        // 显示选项列表，提示用户选择
        vscode.window.showQuickPick(items).then(function (selected) {
            if (selected) {
                vscode.commands.executeCommand("workbench.view.scm");
                if (uri) {
                    let selectedRepository = git.repositories.find(repository => {
                        return repository.rootUri.path === uri._rootUri.path;
                    });
                    if (selectedRepository) {
                        prefixCommit(selectedRepository, selected.emoji);
                    }
                }
                else {
                    for (let repo of git.repositories) {
                        prefixCommit(repo, selected.emoji);
                    }
                }
            }
        });
    });
    let label_switching = vscode.commands.registerCommand("extension.switching", (uri) => {
        const items = [];
        for (const key in util_1.display_method) {
            items.push(key);
        }
        vscode.window.showQuickPick(items).then(res => {
            context.globalState.update("display_method", res);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// 选完填入操作
function prefixCommit(repository, prefix) {
    repository.inputBox.value !== ""
        ? ((repository.inputBox.value = ""),
            (repository.inputBox.value = `${prefix}${repository.inputBox.value}`))
        : (repository.inputBox.value = `${prefix}${repository.inputBox.value}`);
}
// 点击小图标进入插件
function getGitExtension() {
    const vscodeGit = vscode.extensions.getExtension("vscode.git");
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension && gitExtension.getAPI(1);
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map