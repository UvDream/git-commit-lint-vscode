"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
/*
 * @Author: wangzhongjie
 * @Date: 2020-01-17 19:47:44
 * @LastEditors: FreezeNow
 * @LastEditTime: 2023-03-08 14:41:35
 * @Description: 主入口
 * @Email: UvDream@163.com
 */
const vscode = require("vscode");
const util_1 = require("./config/util");
const git_emoji_zh_1 = require("./config/git_emoji_zh");
const activate = (context) => {
    const disposable = vscode.commands.registerCommand('extension.gitEmoji', (uri) => __awaiter(void 0, void 0, void 0, function* () {
        const git = getGitExtension();
        if (!git) {
            vscode.window.showErrorMessage('无法加载git插件!请先安装git插件!');
            return;
        }
        const method_key = context.globalState.get('display_method', 'default');
        const items = git_emoji_zh_1.default.map(util_1.display_method[method_key]);
        // 显示选项列表，提示用户选择
        const selected = yield vscode.window.showQuickPick(items);
        if (!selected) {
            return;
        }
        const { emoji } = selected;
        vscode.commands.executeCommand('workbench.scm.focus');
        if (git.repositories.length === 1) {
            // 确保聚焦到输入框，参考 https://github.com/microsoft/vscode/issues/131006#issuecomment-915751155
            vscode.commands.executeCommand('list.focusFirst');
            vscode.commands.executeCommand('list.select');
            prefixCommit(git.repositories[0], emoji);
            return;
        }
        if (uri) {
            const selectedRepositoryIndex = git.repositories.findIndex((repository) => repository.rootUri.path === uri.rootUri.path);
            const selectedRepository = git.repositories[selectedRepositoryIndex];
            if (selectedRepository) {
                prefixCommit(selectedRepository, emoji);
                // 存在多个存储库时，关闭其他存储库，定位到选择的存储库并聚焦输入框
                vscode.commands.executeCommand('list.collapseAll');
                vscode.commands.executeCommand('list.focusFirst');
                for (let i = 0; i < selectedRepositoryIndex; i++) {
                    vscode.commands.executeCommand('list.focusDown');
                }
                vscode.commands.executeCommand('list.expand');
                vscode.commands.executeCommand('list.expand');
                vscode.commands.executeCommand('list.select');
                vscode.commands.executeCommand('list.toggleExpand');
            }
        }
        else {
            for (let repo of git.repositories) {
                prefixCommit(repo, selected.emoji);
            }
        }
    }));
    context.subscriptions.push(disposable);
    // 命令和设置是否使用 emoji 的映射关系
    const displayMethodMap = {
        default: 'emoji',
        'use emoji': 'emoji',
        'use code': 'code',
    };
    const gitCommitFormatKey = 'gitCommitLintVscode.gitCommitFormat';
    vscode.commands.registerCommand('extension.switching', () => __awaiter(void 0, void 0, void 0, function* () {
        const items = [];
        for (const key in util_1.display_method) {
            items.push(key);
        }
        const res = yield vscode.window.showQuickPick(items);
        if (!res) {
            return;
        }
        context.globalState.update('display_method', res);
        const gitCommitFormat = vscode.workspace.getConfiguration().get(gitCommitFormatKey);
        if (displayMethodMap[res] !== gitCommitFormat) {
            vscode.workspace.getConfiguration().update(gitCommitFormatKey, displayMethodMap[res], true);
        }
    }));
    // 监听设置改变事件，如果改变就将命令的配置也改变
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
        const gitCommitFormat = vscode.workspace.getConfiguration().get(gitCommitFormatKey);
        const displayMethod = context.globalState.get('display_method', 'default');
        if (displayMethodMap[displayMethod] !== gitCommitFormat) {
            context.globalState.update('display_method', 'use ' + gitCommitFormat);
        }
    }));
};
exports.activate = activate;
// 选完填入操作
const prefixCommit = (repository, prefix) => {
    const coverInputValue = vscode.workspace.getConfiguration().get('gitCommitLintVscode.coverInputValue');
    if (coverInputValue) {
        repository.inputBox.value = `${prefix}`;
        //! 不删除是因为不知道为什么要先清空再赋值，所以注释掉了原代码，测试了一下修改后的代码，感觉也没发现什么问题啊
        // repository.inputBox.value !== ''
        // ? ((repository.inputBox.value = ''), (repository.inputBox.value = `${prefix}${repository.inputBox.value}`))
        // : (repository.inputBox.value = `${prefix}${repository.inputBox.value}`);
    }
    else {
        repository.inputBox.value = `${prefix}${repository.inputBox.value}`;
    }
};
// 点击小图标进入插件
const getGitExtension = () => {
    const vscodeGit = vscode.extensions.getExtension('vscode.git');
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension && gitExtension.getAPI(1);
};
// this method is called when your extension is deactivated
const deactivate = () => { };
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map