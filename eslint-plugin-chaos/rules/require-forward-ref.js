const requireForwardRef = {
  meta: {
    type: "problem",
    docs: {
      description:
        "UI 组件必须使用 React.forwardRef 包裹，确保 ref 可以传递到底层 DOM 元素",
    },
    messages: {
      missingForwardRef:
        "UI 组件 {{name}} 必须使用 React.forwardRef 包裹。\n当前是普通函数组件，<{{name}} ref={myRef}> 的 ref 会被静默丢弃。\n修复: const {{name}} = React.forwardRef<HTMLElement, Props>((props, ref) => { ... })",
    },
    schema: [
      {
        type: "object",
        properties: {
          // 允许直接 re-export Base UI 原语的组件
          allowPatterns: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    // 只检查 components/ui/ 目录下的文件
    const filename = context.filename || context.getFilename();
    if (!filename.includes("components\\ui\\") && !filename.includes("components/ui/")) {
      return {};
    }

    function isExportedComponentName(name) {
      if (!name) return false;
      if (!/^[A-Z]/.test(name)) return false; // 组件首字母大写
      // 跳过以 Primitive/Root/Provider 结尾的组件（它们通常是 re-export）
      if (
        name.endsWith("Primitive") ||
        name.endsWith("Provider") ||
        name.endsWith("Root") ||
        name === "Slot"
      )
        return false;
      return true;
    }

    function checkInit(id, init) {
      if (!init) return;
      if (init.type !== "ArrowFunctionExpression" && init.type !== "FunctionExpression") {
        return;
      }
      if (!isExportedComponentName(id.name)) return;
      // 已使用 forwardRef
      if (
        init.type === "CallExpression" &&
        init.callee.type === "MemberExpression" &&
        init.callee.property?.name === "forwardRef"
      ) {
        return;
      }
      // 函数体是否有 ref 参数
      const params = init.params || [];
      const hasRef = params.some((p) => {
        if (p.type === "Identifier" && p.name === "ref") return true;
        if (
          p.type === "AssignmentPattern" &&
          p.left?.type === "Identifier" &&
          p.left?.name === "ref"
        )
          return true;
        return false;
      });
      if (!hasRef) {
        context.report({
          node: id,
          messageId: "missingForwardRef",
          data: { name: id.name },
        });
      }
    }

    return {
      // 只在 Program > ExportNamedDeclaration / ExportDefaultDeclaration 顶层导出处检查
      // 嵌套的辅助函数、handler、内部 hook helper 一律放行
      ExportNamedDeclaration(node) {
        const decl = node.declaration;
        if (!decl) return;
        if (decl.type === "FunctionDeclaration") {
          if (!isExportedComponentName(decl.id?.name)) return;
          // 形如 export function Component() {}
          // 检查函数体是否有 ref 参数
          const params = decl.params || [];
          const hasRef = params.some((p) => {
            if (p.type === "Identifier" && p.name === "ref") return true;
            if (
              p.type === "AssignmentPattern" &&
              p.left?.type === "Identifier" &&
              p.left?.name === "ref"
            )
              return true;
            return false;
          });
          if (hasRef) return;
          // 已经是 forwardRef(...)? 这里 FunctionDeclaration 不会是 forwardRef 包裹
          context.report({
            node: decl.id,
            messageId: "missingForwardRef",
            data: { name: decl.id.name },
          });
          return;
        }
        if (decl.type === "VariableDeclaration") {
          for (const v of decl.declarations) {
            if (!v.id || v.id.type !== "Identifier") continue;
            checkInit(v.id, v.init);
          }
        }
      },
      ExportDefaultDeclaration(node) {
        const decl = node.declaration;
        if (!decl) return;
        if (decl.type === "FunctionDeclaration") {
          if (!isExportedComponentName(decl.id?.name)) return;
          const params = decl.params || [];
          const hasRef = params.some((p) => {
            if (p.type === "Identifier" && p.name === "ref") return true;
            if (
              p.type === "AssignmentPattern" &&
              p.left?.type === "Identifier" &&
              p.left?.name === "ref"
            )
              return true;
            return false;
          });
          if (hasRef) return;
          context.report({
            node: decl.id,
            messageId: "missingForwardRef",
            data: { name: decl.id.name },
          });
          return;
        }
        // export default () => {} - 没有 name，用 "Component" 占位
        if (decl.type === "ArrowFunctionExpression" || decl.type === "FunctionExpression") {
          const params = decl.params || [];
          const hasRef = params.some((p) => {
            if (p.type === "Identifier" && p.name === "ref") return true;
            if (
              p.type === "AssignmentPattern" &&
              p.left?.type === "Identifier" &&
              p.left?.name === "ref"
            )
              return true;
            return false;
          });
          if (hasRef) return;
          context.report({
            node: decl,
            messageId: "missingForwardRef",
            data: { name: "Component" },
          });
        }
      },
    };
  },
};

module.exports = { "require-forward-ref": requireForwardRef };
