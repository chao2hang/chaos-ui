# Verdaccio 私有 npm 仓库使用说明

## 服务信息

| 项目 | 值 |
|------|-----|
| **Registry URL** | `http://10.91.3.253:4873` |
| **Web UI** | http://10.91.3.253:4873 |
| **用户名** | `chaos` |
| **密码** | `ChaosPass2026` |
| **认证 Token** | `YWFkODM3NjZjMzQ0M2ZjOGI0ZDUxYmVkMmM2MGQ0Zjk6YWUwZjQ3ZWRjNjc3ZWUyZjVlM2E0MjlhYjMzOTIwZjA=` |
| **存储路径** | `~/.config/verdaccio/storage` |
| **配置文件** | `~/.config/verdaccio/config.yaml` |
| **进程管理** | pm2（开机自启） |

## 服务管理命令

```bash
# 加载环境变量
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 22

# 服务状态
pm2 status

# 启动 / 停止 / 重启
pm2 start verdaccio
pm2 stop verdaccio
pm2 restart verdaccio

# 查看日志
pm2 logs verdaccio

# 查看完整日志路径
cat ~/.pm2/logs/verdaccio-out.log
cat ~/.pm2/logs/verdaccio-error.log
```

## 权限策略

| 包名 | 读取 | 发布 | 取消发布 |
|------|------|------|----------|
| `@qxyfoods/*` | 已认证用户 | 已认证用户 | 已认证用户 |
| `**`（其他） | 所有用户 | 已认证用户 | 已认证用户 |

代理上游：未在私有仓库的包会从 `https://registry.npmjs.org/` 拉取并缓存。

---

## 1. 发布 @qxyfoods/chaos-ui 到私有仓库

### 1.1 在 chaos_style 项目中添加 `.npmrc`

```ini
@qxyfoods:registry=http://10.91.3.253:4873
//10.91.3.253:4873/:_authToken=YWFkODM3NjZjMzQ0M2ZjOGI0ZDUxYmVkMmM2MGQ0Zjk6YWUwZjQ3ZWRjNjc3ZWUyZjVlM2E0MjlhYjMzOTIwZjA=
```

### 1.2 登录（可选，CI 用 token 即可）

```bash
npm login --registry=http://10.91.3.253:4873
# Username: chaos
# Password: ChaosPass2026
# Email: chaos@qxyfoods.com
```

### 1.3 发布

```bash
cd D:\Projects\qxyfoods\chaos_style

# 确保包已构建（如果还没构建）
npm run build:pkg

# 发布
npm publish
```

发布成功后访问 http://10.91.3.253:4873/ 即可在 Web UI 中看到 `@qxyfoods/chaos-ui`。

---

## 2. 在其他项目中使用私有仓库

### 2.1 创建测试项目

```bash
mkdir my-app && cd my-app
npm init -y
```

### 2.2 在项目根目录添加 `.npmrc`

```ini
@qxyfoods:registry=http://10.91.3.253:4873
//10.91.3.253:4873/:_authToken=YWFkODM3NjZjMzQ0M2ZjOGI0ZDUxYmVkMmM2MGQ0Zjk6YWUwZjQ3ZWRjNjc3ZWUyZjVlM2E0MjlhYjMzOTIwZjA=

# 公共包仍然走官方 registry（速度优化可改成 npmmirror）
registry=https://registry.npmjs.org/
```

### 2.3 安装 chaos-ui

```bash
npm install @qxyfoods/chaos-ui
```

### 2.4 在代码中使用

```tsx
import { Button, Card } from "@qxyfoods/chaos-ui";
```

---

## 3. 添加新用户

如果需要添加团队成员，仓库管理员执行：

```bash
# 方式一：让成员自己注册
ssh chaos@10.91.3.253
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 22
node /tmp/reguser.js  # 修改其中的 name/password/email

# 方式二：通过 npm adduser（交互式）
npm adduser --registry http://10.91.3.253:4873
```

---

## 4. CI/CD 中使用

在 GitHub Actions / GitLab CI 中：

```yaml
- name: 登录私有仓库
  run: |
    echo "@qxyfoods:registry=http://10.91.3.253:4873" >> .npmrc
    echo "//10.91.3.253:4873/:_authToken=${VERDACCIO_TOKEN}" >> .npmrc

- name: 发布
  run: npm publish
```

把 `VERDACCIO_TOKEN` 配置为 CI 的 Secret。

---

## 5. 常见问题

### 5.1 访问超时

如果从外网访问不稳定，可以用 SSH 端口转发：

```bash
ssh -L 4873:127.0.0.1:4873 chaos@10.91.3.253
```

然后本地访问：`http://localhost:4873`

### 5.2 修改配置后需要重启

```bash
ssh chaos@10.91.3.253 'pm2 restart verdaccio'
```

### 5.3 数据持久化

- 包数据：`~/.config/verdaccio/storage/`
- 用户账号：`~/.config/verdaccio/htpasswd`
- **建议定期备份这两个目录**

---

## 6. 升级与维护

```bash
# 升级 Verdaccio
ssh chaos@10.91.3.253
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 22
npm install -g verdaccio@latest
pm2 restart verdaccio
```

---

## 7. 卸载

```bash
ssh chaos@10.91.3.253
pm2 delete verdaccio
pm2 unstartup systemd
sudo systemctl disable pm2-chaos
rm -rf ~/.config/verdaccio ~/.pm2
```
