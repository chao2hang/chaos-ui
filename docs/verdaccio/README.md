# Verdaccio 私有 npm 仓库使用说明

## 服务信息

| 项目                                                 | 值                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **CI 内部 Registry URL**（Gitea Actions Job 容器内） | `http://verdaccio:4873`                                                                    |
| **服务器本机**                                       | `http://127.0.0.1:4873`                                                                    |
| **本地开发机**（SSH 隧道）                           | `http://localhost:4873`                                                                    |
| **Web UI**                                           | 通过 SSH 隧道访问 `http://localhost:4873`                                                  |
| **用户名**                                           | `chaos`                                                                                    |
| **密码**                                             | `ChaosPass2026`                                                                            |
| **认证 Token**                                       | `YWFkODM3NjZjMzQ0M2ZjOGI0ZDUxYmVkMmM2MGQ0Zjk6YWUwZjQ3ZWRjNjc3ZWUyZjVlM2E0MjlhYjMzOTIwZjA=` |
| **存储路径**                                         | `~/.config/verdaccio/storage`                                                              |
| **配置文件**                                         | `~/.config/verdaccio/config.yaml`                                                          |
| **进程管理**                                         | pm2（开机自启）                                                                            |
| **Docker 网络**                                      | 同时接入 `verdaccio_default` 和 `ci-services`（Gitea Actions Job 容器共享此网络）          |

> ⚠️ Verdaccio 仅绑定 `127.0.0.1:4873`，**不直接暴露到 LAN/公网**。CI 通过 docker `ci-services` 网络以容器名 DNS 访问；本地开发使用 SSH 端口转发。

## 服务管理命令

```bash
# SSH 进入服务器（内网 IP；外网用 FRP 入口 ssh -p 20001 chaos@10.91.3.253）
ssh chaos@192.168.123.23

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

| 包名          | 读取       | 发布       | 取消发布   |
| ------------- | ---------- | ---------- | ---------- |
| `@qxyfoods/*` | 已认证用户 | 已认证用户 | 已认证用户 |
| `**`（其他）  | 所有用户   | 已认证用户 | 已认证用户 |

代理上游：未在私有仓库的包会从 `https://registry.npmjs.org/` 拉取并缓存。

---

## 1. 发布 @qxyfoods/chaos-ui 到私有仓库

### 1.1 在本地开发机通过 SSH 隧道配置 registry

先建立 SSH 端口转发（后台运行）：

```bash
# 内网
ssh -fN -L 4873:127.0.0.1:4873 chaos@192.168.123.23
# 外网（经 FRP）
ssh -fN -L 4873:127.0.0.1:4873 -p 20001 chaos@10.91.3.253
```

然后在 chaos_style 项目的 `.npmrc` 配置：

```ini
@qxyfoods:registry=http://localhost:4873
//localhost:4873/:_authToken=YWFkODM3NjZjMzQ0M2ZjOGI0ZDUxYmVkMmM2MGQ0Zjk6YWUwZjQ3ZWRjNjc3ZWUyZjVlM2E0MjlhYjMzOTIwZjA=
```

### 1.2 登录（可选，CI 用 token 即可）

```bash
pnpm login --registry=http://localhost:4873
# Username: chaos
# Password: ChaosPass2026
# Email: chaos@qxyfoods.com
```

### 1.3 发布

```bash
cd /path/to/chaos_style

# 确保包已构建（如果还没构建）
pnpm run build:pkg

# 发布
pnpm publish --registry=http://localhost:4873
```

发布成功后访问 `http://localhost:4873/`（通过 SSH 隧道）即可在 Web UI 中看到 `@qxyfoods/chaos-ui`。

---

## 2. 在其他项目中使用私有仓库

### 2.1 建立 SSH 隧道

```bash
ssh -fN -L 4873:127.0.0.1:4873 chaos@192.168.123.23
```

### 2.2 在项目根目录添加 `.npmrc`

```ini
@qxyfoods:registry=http://localhost:4873
//localhost:4873/:_authToken=YWFkODM3NjZjMzQ0M2ZjOGI0ZDUxYmVkMmM2MGQ0Zjk6YWUwZjQ3ZWRjNjc3ZWUyZjVlM2E0MjlhYjMzOTIwZjA=

# 公共包仍然走官方 registry（速度优化可改成 npmmirror）
registry=https://registry.npmjs.org/
```

### 2.3 安装 chaos-ui

```bash
pnpm add @qxyfoods/chaos-ui
```

### 2.4 在代码中使用

```tsx
import { Button, Card } from "@qxyfoods/chaos-ui";
```

---

## 3. 添加新用户

如果需要添加团队成员，仓库管理员执行：

```bash
ssh chaos@192.168.123.23
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 22
node /tmp/reguser.js  # 修改其中的 name/password/email

# 方式二：通过 npm adduser（交互式，先建立隧道）
npm adduser --registry http://localhost:4873
```

> 注意：Verdaccio 的 `npm adduser` 命令与 pnpm 和 npm 均兼容。

---

## 4. CI/CD 中使用（Gitea Actions）

Gitea Actions 的 Job 容器通过 docker `ci-services` 共享网络直接访问 Verdaccio（容器 DNS 名为 `verdaccio`），无需 SSH 隧道或暴露端口。

Runner 配置（`~/docker/gitea-runner/config/config.yaml`）：

```yaml
container:
  network: ci-services
```

**Workflow 示例**（见本仓库 `.github/workflows/release.yml`）：

```yaml
- uses: pnpm/action-setup@v4
  with:
    version: 11

- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: pnpm
    registry-url: http://verdaccio:4873 # <-- docker 内部 DNS

- run: pnpm install --frozen-lockfile
- run: pnpm run prepack
- run: pnpm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.VERDACCIO_TOKEN }}
```

> `VERDACCIO_TOKEN` 在 Gitea 仓库 Settings → Actions → Secrets 中配置。

**ci-services 网络运维**：

```bash
docker network ls | grep ci-services      # 查看网络
docker network inspect ci-services        # 查看接入容器
```

若要让新的 docker 服务接入 ci-services 网络，在其 `docker-compose.yml` 中加入：

```yaml
services:
  my-service:
    networks:
      - default
      - ci-services

networks:
  ci-services:
    external: true
```

---

## 5. 常见问题

### 5.1 本地访问超时

Verdaccio 仅监听 127.0.0.1，不直接对外暴露，LAN/外网都需要通过 SSH 端口转发（见 1.1）。

### 5.2 CI 中访问失败

- 检查 runner 容器是否已加载新配置：`cd ~/docker/gitea-runner && docker compose up -d --force-recreate`
- 检查 verdaccio 是否在 ci-services 网络：`docker inspect verdaccio | grep ci-services`
- 从一个 Job 容器内测试：
  ```bash
  docker run --rm --network ci-services node:22-bookworm bash -c \
    "curl -sS http://verdaccio:4873/-/ping"
  # 应输出 {}
  ```

### 5.3 修改配置后需要重启

```bash
ssh chaos@192.168.123.23 'pm2 restart verdaccio'
```

### 5.4 数据持久化

- 包数据：`~/.config/verdaccio/storage/`
- 用户账号：`~/.config/verdaccio/htpasswd`
- **建议定期备份这两个目录**

---

## 6. 升级与维护

```bash
ssh chaos@192.168.123.23
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 22
pnpm install -g verdaccio@latest
pm2 restart verdaccio
```

---

## 7. 卸载

```bash
ssh chaos@192.168.123.23
pm2 delete verdaccio
pm2 unstartup systemd
sudo systemctl disable pm2-chaos
rm -rf ~/.config/verdaccio ~/.pm2
```
