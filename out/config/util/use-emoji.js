"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function use_emoji(emoji) {
    console.log("使用表情");
    return {
        label: `${emoji.emoji}${emoji.code}: ${emoji.description}`,
        code: emoji.code,
        emoji: `${emoji.emoji}${emoji.code}: `,
        description: '[' + emoji.name + ']',
    };
}
exports.use_emoji = use_emoji;
//# sourceMappingURL=use-emoji.js.map