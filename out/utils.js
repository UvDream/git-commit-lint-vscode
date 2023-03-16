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
 * @Author: Lanrri
 * @Email: lanrri@163.com
 * @Date: 2023-03-16 14:18:17
 * @Description:
 * @LastEditors: Lanrri
 * @LastEditTime: 2023-03-16 16:33:54
 */
const vscode = require("vscode");
const DEFAULT_CUSTOM_FORMAT = '${code}${emoji}: ';
const CUSTOM_KEY_REGEX = /\${(\w+)}/g;
const customItems = (emoji, custom_key) => {
    return emoji.map((item) => {
        const value = custom_key.replace(CUSTOM_KEY_REGEX, (_match, variable) => {
            return item[variable];
        });
        return {
            value,
            label: `${value} ${item.name}`,
            description: '[' + item.description + ']',
        };
    });
};
// 点击小图标进入插件
const getGitExtension = () => {
    const vscodeGit = vscode.extensions.getExtension('vscode.git');
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension && gitExtension.getAPI(1);
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
const emojiCommit = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    const git = getGitExtension();
    if (!git) {
        vscode.window.showErrorMessage('无法加载git插件! 请先安装git插件!');
        return;
    }
    const config = vscode.workspace.getConfiguration('gitCommitLintVscode');
    const custom_format = config.get('customFormat', DEFAULT_CUSTOM_FORMAT);
    const custom_type = config.get('customType', []);
    const items = customItems(custom_type, custom_format);
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
});
exports.emojiCommit = emojiCommit;
//# sourceMappingURL=utils.js.map