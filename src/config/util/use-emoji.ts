import { Emoji } from '../git_emoji_zh'

export function use_emoji(emoji: Emoji) {
  console.log("使用表情");
  return {
    label: `${emoji.emoji} ${emoji.description}`,
    code: emoji.code,
    emoji: emoji.emoji + ' ',
    description: '[' + emoji.name + ']',
  }
}
