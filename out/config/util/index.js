"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const use_label_1 = require("./use-label");
const use_emoji_1 = require("./use-emoji");
exports.display_method = {
    default: use_emoji_1.use_emoji,
    // 表情使用代码
    "use code": use_label_1.use_label,
    // 使用表情
    "use emoji": use_emoji_1.use_emoji
};
//# sourceMappingURL=index.js.map