/*
 * @Author: wangzhongjie
 * @Date: 2020-01-17 19:47:44
 * @LastEditors: FreezeNow
 * @LastEditTime: 2023-03-08 13:11:41
 * @Description: 主入口
 * @Email: UvDream@163.com
 */
import * as vscode from 'vscode';
import { display_method } from './config/util';
import { GitExtension, Repository } from './config/git';
import emojis from './config/git_emoji_zh';
export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand('extension.gitEmoji', async (uri?) => {
    const git = getGitExtension();
    if (!git) {
      vscode.window.showErrorMessage('无法加载git插件!请先安装git插件!');
      return;
    }
    const method_key = context.globalState.get('display_method', 'default');
    const items = emojis.map(display_method[method_key]);
    // 显示选项列表，提示用户选择
    const selected = await vscode.window.showQuickPick(items);
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
      const selectedRepositoryIndex = git.repositories.findIndex(
        (repository) => repository.rootUri.path === uri.rootUri.path
      );
      const selectedRepository = git.repositories[selectedRepositoryIndex];
      if (selectedRepository) {
        prefixCommit(selectedRepository, emoji);
      
      }
    } else {
      for (let repo of git.repositories) {
        prefixCommit(repo, selected.emoji);
      }
    }
  });
  context.subscriptions.push(disposable);

  // 命令和设置是否使用 emoji 的映射关系
  const displayMethodMap: { [key: string]: string } = {
    default: 'emoji',
    'use emoji': 'emoji',
    'use code': 'code',
  };
  const gitCommitFormatKey = 'gitCommitLintVscode.gitCommitFormat';
  vscode.commands.registerCommand('extension.switching', async () => {
    const items = [];
    for (const key in display_method) {
      items.push(key);
    }
    const res = await vscode.window.showQuickPick(items);
    if (!res) {
      return;
    }
    context.globalState.update('display_method', res);
    const gitCommitFormat = vscode.workspace.getConfiguration().get(gitCommitFormatKey);
    if (displayMethodMap[res] !== gitCommitFormat) {
      vscode.workspace.getConfiguration().update(gitCommitFormatKey, displayMethodMap[res], true);
    }
  });
  // 监听设置改变事件，如果改变就将命令的配置也改变
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(() => {
      const gitCommitFormat = vscode.workspace.getConfiguration().get(gitCommitFormatKey);
      const displayMethod = context.globalState.get('display_method', 'default');
      if (displayMethodMap[displayMethod] !== gitCommitFormat) {
        context.globalState.update('display_method', 'use ' + gitCommitFormat);
      }
    })
  );
};
// 选完填入操作
const prefixCommit = (repository: Repository, prefix: String) => {
  repository.inputBox.value !== ''
    ? ((repository.inputBox.value = ''), (repository.inputBox.value = `${prefix}${repository.inputBox.value}`))
    : (repository.inputBox.value = `${prefix}${repository.inputBox.value}`);
};
// 点击小图标进入插件
const getGitExtension = () => {
  const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
  const gitExtension = vscodeGit && vscodeGit.exports;
  return gitExtension && gitExtension.getAPI(1);
};
// this method is called when your extension is deactivated
export const deactivate = () => {};
