import { Emoji } from '../git_emoji_zh'

export function use_label(emoji: Emoji) {
  return {
    label: `${emoji.emoji} ${emoji.description}`,
    code: emoji.code,
    emoji: emoji.code + ' ',
    description: '[' + emoji.name + ']',
  }
}
