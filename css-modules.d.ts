/**
 * Global CSS module declarations.
 *
 * Lets tsup's DTS generation resolve side-effect CSS imports like:
 *   import "@xyflow/react/dist/style.css";
 */
declare module "*.css" {
  const content: string;
  export default content;
}
