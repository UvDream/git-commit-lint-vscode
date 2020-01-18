import { use_label } from "./use-label";
import { use_emoji } from "./use-emoji";

export const display_method = {
  default: use_emoji,
  "use code": use_label,
  "use emoji": use_emoji
};
