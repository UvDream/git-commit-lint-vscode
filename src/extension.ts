/*
 * @Author: wangzhongjie
 * @Date: 2020-01-17 19:47:44
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2020-02-28 13:42:35
 * @Description:主入口
 * @Email: UvDream@163.com
 */
import * as vscode from "vscode";
import { display_method } from "./config/util";
import { GitExtension, Repository } from "./config/git";
import emojis from "./config/git_emoji_zh";
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.gitEmoji",
    (uri?) => {
      const git = getGitExtension();
      if (!git) {
        vscode.window.showErrorMessage("无法加载git插件!请先安装git插件!");
        return;
      }
      const method_key = context.globalState.get("display_method", "default");
      let items = emojis.map(display_method[method_key]);
      // 显示选项列表，提示用户选择
      vscode.window.showQuickPick(items).then(function(selected) {
        if (selected) {
          console.log(uri);
          vscode.commands.executeCommand("workbench.view.scm");
          if (uri) {
            let selectedRepository = git.repositories.find(repository => {
              return repository.rootUri.path === uri._rootUri.path;
            });
            if (selectedRepository) {
              prefixCommit(selectedRepository, selected.emoji);
            }
          } else {
            for (let repo of git.repositories) {
              prefixCommit(repo, selected.emoji);
            }
          }
        }
      });
    }
  );
  let label_switching = vscode.commands.registerCommand(
    "extension.switching",
    (uri?) => {
      const items = [];
      for (const key in display_method) {
        items.push(key);
      }
      vscode.window.showQuickPick(items).then(res => {
        context.globalState.update("display_method", res);
      });
    }
  );

  context.subscriptions.push(disposable);
}
// 选完填入操作
function prefixCommit(repository: Repository, prefix: String) {
  repository.inputBox.value !== ""
    ? ((repository.inputBox.value = ""),
      (repository.inputBox.value = `${prefix}${repository.inputBox.value}`))
    : (repository.inputBox.value = `${prefix}${repository.inputBox.value}`);
}
// 点击小图标进入插件
function getGitExtension() {
  const vscodeGit = vscode.extensions.getExtension<GitExtension>("vscode.git");
  const gitExtension = vscodeGit && vscodeGit.exports;
  return gitExtension && gitExtension.getAPI(1);
}
// this method is called when your extension is deactivated
export function deactivate() {}
