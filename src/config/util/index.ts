import { use_label } from "./use-label";
import { use_emoji } from "./use-emoji";

export const display_method = {
  default: use_emoji,
  // 表情使用代码
  "use code": use_label,
  // 使用表情
  "use emoji": use_emoji
};
