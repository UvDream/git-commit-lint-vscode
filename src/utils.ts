/*
 * @Author: Lanrri
 * @Email: lanrri@163.com
 * @Date: 2023-03-16 14:18:17
 * @Description:
 * @LastEditors: Lanrri
 * @LastEditTime: 2023-03-17 09:56:57
 */
import * as vscode from 'vscode';
import { GitExtension, Repository } from './git';
import { CustomType } from './type';

const DEFAULT_CUSTOM_FORMAT = '${type}${emoji}: ';
const CUSTOM_KEY_REGEX = /\${(\w+)}/g;

const customItems = (emoji: CustomType[], custom_key: string) => {
  return emoji.map((item) => {
    const value = custom_key.replace(CUSTOM_KEY_REGEX, (_match, variable: keyof CustomType) => {
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
  const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
  const gitExtension = vscodeGit && vscodeGit.exports;
  return gitExtension && gitExtension.getAPI(1);
};

// 选完填入操作
const prefixCommit = (repository: Repository, prefix: String) => {
  const coverInputValue = vscode.workspace.getConfiguration().get('gitCommitLintVscode.coverInputValue');
  if (coverInputValue) {
    repository.inputBox.value = `${prefix}`;
    //! 不删除是因为不知道为什么要先清空再赋值，所以注释掉了原代码，测试了一下修改后的代码，感觉也没发现什么问题啊
    // repository.inputBox.value !== ''
    // ? ((repository.inputBox.value = ''), (repository.inputBox.value = `${prefix}${repository.inputBox.value}`))
    // : (repository.inputBox.value = `${prefix}${repository.inputBox.value}`);
  } else {
    repository.inputBox.value = `${prefix}${repository.inputBox.value}`;
  }
};

const emojiCommit = async (uri?: { rootUri: { path: any } }) => {
  const git = getGitExtension();

  if (!git) {
    vscode.window.showErrorMessage('无法加载git插件! 请先安装git插件!');
    return;
  }

  const config = vscode.workspace.getConfiguration('gitCommitLintVscode');

  const custom_format = config.get('customFormat', DEFAULT_CUSTOM_FORMAT);
  const custom_type = config.get('customType', []);

  const items = customItems(custom_type, custom_format);
  const selected = await vscode.window.showQuickPick(items);
  if (!selected) {
    return;
  }
  const { value } = selected;
  vscode.commands.executeCommand('workbench.scm.focus');

  if (git.repositories.length === 1) {
    const alwaysShowRepositories = vscode.workspace.getConfiguration().get('scm.alwaysShowRepositories');
    // 确保聚焦到输入框，参考 https://github.com/microsoft/vscode/issues/131006#issuecomment-915751155
    if (alwaysShowRepositories) {
      // 启用了该配置时，ui会有变动，所以向下移动一格再选中
      vscode.commands.executeCommand('list.focusFirst');
      vscode.commands.executeCommand('list.focusDown');
      vscode.commands.executeCommand('list.select');
    } else {
      vscode.commands.executeCommand('list.focusFirst');
      vscode.commands.executeCommand('list.select');
    }
    prefixCommit(git.repositories[0], value);
    return;
  }
  if (uri) {
    const selectedRepositoryIndex = git.repositories.findIndex(
      (repository) => repository.rootUri.path === uri.rootUri.path
    );
    const selectedRepository = git.getRepository(uri.rootUri.path);
    if (!selectedRepository) {
      return;
    }
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
  } else {
    for (let repo of git.repositories) {
      prefixCommit(repo, value);
    }
  }
};

export { emojiCommit };
