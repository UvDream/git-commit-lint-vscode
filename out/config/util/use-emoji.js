"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use_emoji = void 0;
function use_emoji(emoji) {
    console.log("使用表情");
    return {
        label: `${emoji.emoji} ${emoji.description}`,
        code: emoji.code,
        emoji: emoji.emoji + ' ',
        description: '[' + emoji.name + ']',
    };
}
exports.use_emoji = use_emoji;
//# sourceMappingURL=use-emoji.js.map