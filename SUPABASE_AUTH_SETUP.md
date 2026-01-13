# Supabase Google 登录集成说明

## 已完成的实现

### 1. 依赖安装
- ✅ `@supabase/supabase-js` - Supabase 客户端
- ✅ `@supabase/ssr` - 服务端渲染支持

### 2. 文件结构

```
├── lib/supabase/
│   ├── server.ts       # 服务器端客户端配置
│   ├── client.ts       # 客户端客户端配置
│   └── proxy.ts        # Token 刷新代理逻辑
├── app/auth/
│   ├── login/route.ts  # Google 登录入口
│   ├── callback/route.ts # OAuth 回调处理
│   └── logout/route.ts # 登出处理
├── components/
│   ├── auth-button.tsx # 登录/登出按钮组件
│   ├── user-menu.tsx   # 用户菜单组件
│   └── auth-provider.tsx # 认证状态组件
└── proxy.ts            # Next.js 代理中间件
```

### 3. 如何使用

#### 在任何页面中使用认证状态组件

```tsx
import { AuthState } from '@/components/auth-provider'

export default function YourPage() {
  return (
    <div>
      <AuthState />
      {/* 其他内容 */}
    </div>
  )
}
```

#### 在服务器组件中获取用户信息

```tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ServerPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <div>Welcome, {user.email}</div>
}
```

#### 在客户端组件中获取用户信息

```tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export default function ClientComponent() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase])

  return <div>{user ? `Welcome ${user.email}` : 'Not logged in'}</div>
}
```

#### 保护路由（需要登录才能访问）

在服务器组件中使用 `getClaims()` 来保护路由：

```tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = await createClient()

  // 使用 getClaims() 验证用户身份，它会自动验证 JWT 签名
  const claims = await supabase.auth.getClaims()

  if (claims.error) {
    redirect('/auth/login')
  }

  return <div>Protected content</div>
}
```

## 下一步配置

### 1. 配置 Supabase 项目

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 进入你的项目
3. 导航到 **Authentication** → **Providers**
4. 启用 **Google** 提供商
5. 配置 Google OAuth 凭据

### 2. 获取 Google OAuth 凭据

1. 访问 [Google Cloud Console](https://console.cloud.google.com/auth/clients)
2. 创建新的 OAuth 客户端 ID
3. 应用类型选择 **Web 应用**
4. 添加授权的重定向 URI：
   - 生产环境: `https://your-project.supabase.co/auth/v1/callback`
   - 本地开发: `http://localhost:3000/auth/callback`
5. 复制 Client ID 和 Client Secret
6. 将这些凭据添加到 Supabase Dashboard 的 Google 提供商配置中

### 3. 环境变量

确保 `.env.local` 文件包含以下变量：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. 配置重定向 URL

在 Supabase Dashboard 中配置允许的重定向 URL：

1. 导航到 **Authentication** → **URL Configuration**
2. 添加以下 URL 到允许的重定向列表：
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/`

生产环境需要添加：
   - `https://your-domain.com/auth/callback`
   - `https://your-domain.com/`

## 功能特性

### ✅ 已实现

- ✅ Google OAuth 登录（服务器端 PKCE 流程）
- ✅ 自动 token 刷新（通过 proxy.ts）
- ✅ Cookie-based 会话管理
- ✅ 登出功能
- ✅ 用户菜单显示
- ✅ 认证状态管理

### 🔒 安全特性

- 使用 PKCE (Proof Key for Code Exchange) 流程
- 服务器端 token 验证
- 通过 `getClaims()` 验证 JWT 签名
- HttpOnly Cookies 存储会话

## 测试

1. 启动开发服务器：
```bash
npm run dev
```

2. 访问 `http://localhost:3000`

3. 点击 "Sign in with Google" 按钮

4. 完成 Google OAuth 流程

5. 登录成功后会重定向回首页

## 故障排除

### 登录后没有重定向
- 检查 `.env.local` 中的 `NEXT_PUBLIC_SITE_URL` 是否正确
- 确认 Supabase Dashboard 中配置的重定向 URL 是否正确

### Token 刷新问题
- 确保 `proxy.ts` 文件在项目根目录
- 检查 `lib/supabase/proxy.ts` 中的 `updateSession` 函数

### Google 登录按钮不工作
- 检查浏览器控制台是否有错误
- 确认 Google OAuth 凭据配置正确
- 验证重定向 URL 配置

## 参考文档

- [Supabase Google 登录](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Supabase 服务器端认证](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
