# Vercel 部署指南

本文档介绍如何将项目部署到 Vercel。

## 前置要求

- [x] Vercel 账号 (https://vercel.com/signup)
- [x] GitHub 账号 (或其他 Git 托管服务)
- [x] 项目代码已推送到 Git 仓库

---

## 部署步骤

### 方法一：通过 Vercel Dashboard 部署

#### 1. 登录 Vercel
访问 [https://vercel.com/dashboard](https://vercel.com/dashboard)

#### 2. 创建新项目
- 点击 "Add New Project"
- 导入你的 Git 仓库
- 选择 `image-editor-recreation` 项目

#### 3. 配置项目

**Framework Preset**: Next.js
**Root Directory**: `/` (保持默认)
**Build Command**: `pnpm build`
**Output Directory**: `.next`
**Install Command**: `pnpm install`

#### 4. 配置环境变量

在部署设置页面添加以下环境变量：

```
# OpenRouter API
OPENROUTER_API_KEY=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
OPENROUTER_HTTP_REFERRER=https://your-domain.com
OPENROUTER_SITE_TITLE=image-editor-recreation

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://lutxxqjyqevdzayhtwca.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Tyf1vecRJGEXOf7tdwe4mA_sG4PrKd8
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# PayPal SDK Configuration
# Production Client ID (从 PayPal Developer Dashboard 获取)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=YOUR_PAYPAL_LIVE_CLIENT_ID

# PayPal NCP Configuration
# 为每个计划配置独立的 PayPal NCP 链接
NEXT_PUBLIC_PAYPAL_BASIC_MONTHLY=https://www.paypal.com/ncp/payment/[BASIC_MONTHLY_ID]
NEXT_PUBLIC_PAYPAL_BASIC_YEARLY=https://www.paypal.com/ncp/payment/[BASIC_YEARLY_ID]
NEXT_PUBLIC_PAYPAL_PRO_MONTHLY=https://www.paypal.com/ncp/payment/[PRO_MONTHLY_ID]
NEXT_PUBLIC_PAYPAL_PRO_YEARLY=https://www.paypal.com/ncp/payment/[PRO_YEARLY_ID]
NEXT_PUBLIC_PAYPAL_MAX_MONTHLY=https://www.paypal.com/ncp/payment/[MAX_MONTHLY_ID]
NEXT_PUBLIC_PAYPAL_MAX_YEARLY=https://www.paypal.com/ncp/payment/[MAX_YEARLY_ID]

# PayPal Success/Cancel URLs
NEXT_PUBLIC_PAYPAL_SUCCESS_URL=https://your-domain.com/success
NEXT_PUBLIC_PAYPAL_CANCEL_URL=https://your-domain.com/pricing-paypal
```

#### 5. 部署
- 点击 "Deploy" 按钮
- 等待部署完成（通常 1-2 分钟）
- 获得部署 URL：`https://your-project.vercel.app`

---

### 方法二：通过 Vercel CLI 部署

#### 1. 安装 Vercel CLI
```bash
pnpm add -D vercel
```

#### 2. 登录 Vercel
```bash
pnpx vercel login
```

#### 3. 部署
```bash
pnpx vercel
```

按照提示选择项目配置，完成后项目将部署到 Vercel。

---

### 方法三：通过 GitHub 自动部署

#### 1. 将代码推送到 GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin master-paypal
```

#### 2. 在 Vercel 中连接 GitHub
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New Project"
3. 选择 "Continue with GitHub"
4. 选择你的仓库和分支
5. 按照方法一的步骤配置环境变量

#### 3. 自动部署
之后每次 push 到主分支，Vercel 会自动重新部署。

---

## 部署后配置

### 1. 获取 Production PayPal Client ID

1. 登录 [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. 选择 "Live" 模式（不是 Sandbox）
3. 创建或选择 REST API App
4. 复制 **Client ID**
5. 在 Vercel 项目设置中更新 `NEXT_PUBLIC_PAYPAL_CLIENT_ID`

### 2. 配置 PayPal NCP 重定向 URL

为每个 PayPal NCP 链接配置重定向 URL（在 PayPal NCP Dashboard 中）：

```
成功页面: https://your-domain.com/success
取消页面: https://your-domain.com/pricing-paypal
```

### 3. 配置 Supabase Redirect URLs

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard/)
2. 选择你的项目
3. 进入 "Authentication" > "URL Configuration"
4. 添加你的域名：
   - Site URL: `https://your-domain.com`
   - Redirect URLs: `https://your-domain.com/auth/callback`

### 4. 配置 OpenRouter Site URL

更新 `NEXT_PUBLIC_SITE_URL` 为你的生产域名：
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## 域名配置

### 添加自定义域名

1. 在 Vercel 项目设置中，点击 "Settings" > "Domains"
2. 点击 "Add Domain"
3. 输入你的域名（如 `app.yourdomain.com`）
4. 按照提示配置 DNS 记录

### DNS 配置示例

```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

---

## 监控和调试

### 查看部署日志
1. 访问 Vercel Dashboard
2. 选择你的项目
3. 点击 "Deployments"
4. 点击特定部署查看日志

### 环境变量管理
1. 访问 Vercel Dashboard
2. 选择你的项目
3. 点击 "Settings" > "Environment Variables"
4. 添加、编辑或删除环境变量

---

## 故障排除

### 问题：部署失败
- 检查 `package.json` 中的 `build` 脚本
- 检查 TypeScript 错误（运行 `pnpm build` 本地测试）
- 查看 Vercel 部署日志

### 问题：PayPal 按钮不显示
- 确认 `NEXT_PUBLIC_PAYPAL_CLIENT_ID` 已正确配置
- 检查浏览器控制台是否有错误
- 确认 PayPal Client ID 是 Live 模式的 ID

### 问题：Supabase 认证失败
- 确认 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 正确
- 检查 Supabase 重定向 URL 配置
- 查看浏览器控制台错误信息

---

## 后续维护

### 更新代码
```bash
# 拉取最新代码
git pull origin master-paypal

# 进行修改
# ...

# 提交并推送
git add .
git commit -m "Your commit message"
git push origin master-paypal
```

Vercel 会自动检测到 push 并重新部署。

### 更新环境变量
1. 访问 Vercel Dashboard
2. 进入项目设置
3. 修改环境变量
4. 部署会自动重启（或手动触发 redeploy）

---

## 安全检查清单

- [ ] 所有敏感密钥（API Keys）都通过环境变量配置，不在代码中硬编码
- [ ] `.gitignore` 包含 `.env*` 文件
- [ ] 使用 HTTPS 进行所有 API 调用
- [ ] CORS 配置正确
- [ ] 环境变量在 Production 环境中使用正确的值（非 Sandbox）
- [ ] 支付功能使用 Live 模式的凭证
