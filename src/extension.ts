/*
 * @Author: wangzhongjie
 * @Date: 2020-01-17 19:47:44
 * @LastEditors: Lanrri
 * @LastEditTime: 2023-03-16 15:56:33
 * @Description: 主入口
 * @Email: UvDream@163.com
 */
import * as vscode from 'vscode';
import { emojiCommit } from './utils';

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand('extension.gitEmoji', emojiCommit);
  context.subscriptions.push(disposable);
}
