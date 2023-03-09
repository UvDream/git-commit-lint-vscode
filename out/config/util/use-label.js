"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use_label = void 0;
function use_label(emoji) {
    console.log("使用label");
    return {
        label: `${emoji.emoji} ${emoji.description}`,
        code: emoji.code,
        emoji: emoji.code + ' ',
        description: '[' + emoji.name + ']',
    };
}
exports.use_label = use_label;
//# sourceMappingURL=use-label.js.map