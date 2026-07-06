/**
 * Type declaration for the bundled stylesheet.
 *
 * 消费方在 TypeScript 项目中可以直接：
 *   import "@chaos_team/chaos-ui/styles.css";
 *
 * 此声明让 TS 识别 CSS 导入，避免 "Cannot find module or its type declarations"。
 * 仅导入即生效（副作用），不导出值。
 */
declare const stylesheet: string;
export default stylesheet;
