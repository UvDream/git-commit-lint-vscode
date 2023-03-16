"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function customItems(emoji) {
    return {
        label: `${emoji.emoji}${emoji.code}: ${emoji.description}`,
        code: emoji.code,
        emoji: `${emoji.emoji}${emoji.code}: `,
        description: '[' + emoji.name + ']',
    };
}
exports.customItems = customItems;
//# sourceMappingURL=custom.js.map