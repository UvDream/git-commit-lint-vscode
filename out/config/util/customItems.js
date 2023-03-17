"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regex = /\${(\w+)}/g;
function customItems(emoji, custom_key) {
    return emoji.map((item) => {
        const value = custom_key.replace(regex, (_match, variable) => {
            return item[variable];
        });
        return {
            value,
            label: `${value} ${item.name}`,
            description: '[' + item.description + ']',
        };
    });
}
exports.default = customItems;
//# sourceMappingURL=customItems.js.map