import { CSSProperties } from "vue";
import { createTypes, VueTypesInterface, VueTypeValidableDef } from "vue-types";

// 自定义扩展vue-types
type PropTypes = VueTypesInterface & { readonly style: VueTypeValidableDef<CSSProperties> };

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
}) as PropTypes;

export { propTypes };
