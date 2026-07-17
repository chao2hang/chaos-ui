# 反馈 API 决策表

> 何时用哪个反馈通道？本表对齐 Ecology 体系，统一 chaos-ui 的反馈职责边界。

## 决策表

| 场景                          | 用什么                      | API                                   | 持久性                          | 示例                        |
| ----------------------------- | --------------------------- | ------------------------------------- | ------------------------------- | --------------------------- |
| 操作成功 / 失败即时提示       | **toast**                   | `message.success/error/warning/info`  | 即时消失（3s）                  | 保存成功、删除失败          |
| 异步加载中                    | **toast loading**           | `message.loading` / `message.promise` | 手动关闭 / Promise 完成自动关闭 | 导出中…、提交中…            |
| 需要用户确认才继续            | **confirm dialog**          | `Modal.confirm` / `ConfirmDialog`     | 阻塞式                          | 删除确认、提交确认          |
| 全局加载遮罩                  | **global loading**          | `<GlobalLoading>`                     | 阻塞式                          | 页面级数据加载              |
| 流程到达 / 系统通知（需留痕） | **inbox**                   | `messageCenter.push` / `notify.inbox` | 持久（标记已读前常驻）          | 审批到达、系统告警          |
| 同时 toast + 留痕             | **notify.inbox(alsoToast)** | `notify.inbox({ alsoToast: true })`   | toast 即时 + inbox 持久         | 重要消息需即时看到 + 可回查 |
| 全站公告横幅                  | **announcement**            | `<AnnouncementBanner>`                | 持久（手动关闭）                | 系统维护通知、版本更新      |

## 核心 API

### 1. `message.*` — toast（即时反馈）

```ts
import { message } from "@chaos_team/chaos-ui";

message.success("保存成功");
message.error("保存失败", { duration: 5 });
message.warning("库存不足");

// loading + 链式更新
const hide = message.loading("导出中…", { key: "export" });
// …完成后
message.success("导出完成", { key: "export" }); // 同 key 替换

// Promise 自动链式
message.promise(api.export(), {
  loading: "导出中…",
  success: "导出完成",
  error: "导出失败",
});
```

**能力清单**：`success` / `error` / `warning` / `info` / `loading` / `promise` / `destroy(key?)` / `config({ duration, maxCount, placement, richColors })`

**选项**：`key`（更新同 key 消息）、`duration`（秒，0=不关闭）、`description`、`action`、`icon`、`onClick`、`onDismiss`

### 2. `notify` — 协调助手（toast + inbox）

```ts
import { notify } from "@chaos_team/chaos-ui";

// 纯 toast（等价 message.success）
notify.success("保存成功");

// inbox 留痕（不弹 toast）
notify.inbox({
  title: "审批通过",
  body: "报销单 #123 已审批",
  href: "/expense/123",
});

// inbox + 同时弹 toast
notify.inbox({
  title: "紧急告警",
  body: "库存低于安全线",
  level: "error",
  alsoToast: true,
  toastType: "error",
});

// loading 句柄
const handle = notify.loading("处理中…");
handle.success("完成"); // 或 handle.error('失败'); 或 handle.dismiss();
```

### 3. `messageCenter` — 消息中心 store（命令式）

```ts
import { messageCenter, useMessageCenter } from "@chaos_team/chaos-ui";

// 任何地方写入（WebSocket / SSE / 轮询）
messageCenter.push({
  title: "流程到达",
  body: "报销单待审批",
  href: "/flow/1",
});
messageCenter.markAllRead();
messageCenter.clear();

// 组件内读取
const { items, unreadCount } = useMessageCenter();
```

### 4. `Modal.confirm` — 阻塞确认

```ts
import { Modal } from "@chaos_team/chaos-ui";

Modal.confirm({
  title: "确认删除？",
  content: "此操作不可撤销",
  onOk: () => doDelete(),
});
```

## 选型原则

1. **即时 vs 留痕**：用户操作后需要即时反馈 → toast；系统事件需要回查 → inbox；两者都要 → `notify.inbox({ alsoToast: true })`。
2. **阻塞 vs 非阻塞**：需要用户确认才能继续 → `Modal.confirm`；只是告知 → toast。
3. **全局 vs 局部**：全站可见的加载 → `<GlobalLoading>`；局部操作反馈 → toast。
4. **不要双通道重复**：同一消息不要既 toast 又 Modal；选择一个主通道。
5. **toast key 复用**：连续操作（如多次保存）用同一 `key` 避免堆叠。

## 与 Ecology 对齐说明

| Ecology              | chaos-ui                               | 说明                  |
| -------------------- | -------------------------------------- | --------------------- |
| WeaMessageCenter     | `MessageCenter` + `messageCenter.push` | 顶栏铃铛 + push store |
| toast (antd message) | `message.*` / `notify.*`               | 即时 toast            |
| Modal.confirm        | `Modal.confirm` / `ConfirmDialog`      | 阻塞确认              |
| 公告                 | `AnnouncementBanner`                   | 全站横幅              |

## 相关 Issue

- #65 MessageCenter 面板 + push API
- #69 反馈 API 文档决策表 + message.loading
