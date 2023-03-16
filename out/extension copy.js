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
/*
 * @Author: wangzhongjie
 * @Date: 2020-01-17 19:47:44
 * @LastEditors: Lanrri
 * @LastEditTime: 2023-03-16 15:50:35
 * @Description: 主入口
 * @Email: UvDream@163.com
 */
const vscode = require("vscode");
const git_emoji_zh_1 = require("./config/git_emoji_zh");
const customItems_1 = require("./config/util/customItems");
const CUSTOM_GIT_COMMIT_KEY = 'gitCommitLintVscode.customGitCommit';
const DEFAULT_CUSTOM_EMOJI = '${code}${emoji}: ';
exports.activate = (context) => {
    const disposable = vscode.commands.registerCommand('extension.gitEmoji', (uri) => __awaiter(void 0, void 0, void 0, function* () {
        const git = getGitExtension();
        if (!git) {
            vscode.window.showErrorMessage('无法加载git插件!请先安装git插件!');
            return;
        }
        const custom_key = context.globalState.get('custom_emoji', DEFAULT_CUSTOM_EMOJI);
        // const method_key = context.globalState.get('display_method', 'default');
        const items = customItems_1.default(git_emoji_zh_1.default, custom_key);
        console.log("🚀 ~ file: extension.ts:30 ~ disposable ~ items:", items);
        // 显示选项列表，提示用户选择
        const selected = yield vscode.window.showQuickPick(items);
        if (!selected) {
            return;
        }
        const { value } = selected;
        vscode.commands.executeCommand('workbench.scm.focus');
        if (git.repositories.length === 1) {
            // 确保聚焦到输入框，参考 https://github.com/microsoft/vscode/issues/131006#issuecomment-915751155
            vscode.commands.executeCommand('list.focusFirst');
            vscode.commands.executeCommand('list.select');
            prefixCommit(git.repositories[0], value);
            return;
        }
        if (uri) {
            const selectedRepositoryIndex = git.repositories.findIndex((repository) => repository.rootUri.path === uri.rootUri.path);
            const selectedRepository = git.repositories[selectedRepositoryIndex];
            if (selectedRepository) {
                prefixCommit(selectedRepository, value);
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
                prefixCommit(repo, value);
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
    // vscode.commands.registerCommand('extension.switching', async () => {
    //   const items = [];
    //   for (const key in display_method) {
    //     items.push(key);
    //   }
    //   const res = await vscode.window.showQuickPick(items);
    //   if (!res) {
    //     return;
    //   }
    //   context.globalState.update('display_method', res);
    //   const gitCommitFormat = vscode.workspace.getConfiguration().get(gitCommitFormatKey);
    //   if (displayMethodMap[res] !== gitCommitFormat) {
    //     vscode.workspace.getConfiguration().update(gitCommitFormatKey, displayMethodMap[res], true);
    //   }
    // });
    // 监听设置改变事件，如果改变就将命令的配置也改变
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
        const gitCommitCustom = vscode.workspace.getConfiguration().get(CUSTOM_GIT_COMMIT_KEY);
        const customEmoji = context.globalState.get('custom_emoji', DEFAULT_CUSTOM_EMOJI);
        console.log("🚀 ~ file: extension.ts:102 ", gitCommitCustom);
        if (gitCommitCustom !== customEmoji) {
            // TODO: 验证自定义的 emoji 是否符合规范
            context.globalState.update('custom_emoji', gitCommitCustom);
        }
        // const gitCommitFormat = vscode.workspace.getConfiguration().get(gitCommitFormatKey);
        // const displayMethod = context.globalState.get('display_method', 'default');
        // if (displayMethodMap[displayMethod] !== gitCommitFormat) {
        //   context.globalState.update('display_method', 'use ' + gitCommitFormat);
        // }
    }));
};
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
exports.deactivate = () => { };
//# sourceMappingURL=extension copy.js.map