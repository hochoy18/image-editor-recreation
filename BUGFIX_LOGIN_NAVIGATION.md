# Bug 修复：登录导航 RSC 错误

## 🐛 问题描述

**错误信息：**
```
Browser ERROR Failed to fetch RSC payload for http://localhost:3000/auth/login.
Falling back to browser navigation. {}
```

**原因：**
`/auth/login` 是一个 Next.js API 路由（Route Handler），它返回重定向响应到 Google OAuth，而不是一个页面。使用 `router.push('/auth/login')` 尝试导航到这个路由会导致 RSC payload 获取失败。

## ✅ 解决方案

### 修改前（错误的方式）
```tsx
const handleSignIn = () => {
  router.push('/auth/login')  // ❌ 错误：尝试导航到 API 路由
}
```

### 修改后（正确的方式）
```tsx
const handleSignIn = () => {
  window.location.href = '/auth/login'  // ✅ 正确：直接触发浏览器导航
}
```

## 📝 技术说明

### 为什么会出现这个错误？

1. **Next.js Route Handler vs 页面**
   - `/auth/login` 是 API 路由（`app/auth/login/route.ts`）
   - 它返回 `NextResponse.redirect()` 而不是 React 组件
   - 使用 `router.push()` 会尝试获取该路由的 RSC payload

2. **RSC Payload**
   - React Server Component payload 是用于服务器组件的序列化数据
   - API 路由不返回 RSC payload，只返回 HTTP 响应
   - Next.js 客户端导航期望获取 RSC payload，因此报错

### 为什么 `window.location.href` 可以工作？

- `window.location.href` 触发完整的浏览器导航
- 浏览器会直接访问该 URL，接收 HTTP 响应
- API 路由返回 302 重定向到 Google OAuth
- 浏览器自动跟随重定向到 Google 授权页面

## 🔄 完整的登录流程

```
用户点击 "Sign In"
    ↓
window.location.href = '/auth/login'
    ↓
浏览器发送 GET 请求到 /auth/login
    ↓
API 路由返回 302 重定向到 Google OAuth
    ↓
浏览器跟随重定向到 accounts.google.com
    ↓
用户授权应用
    ↓
Google 重定向到 /auth/callback?code=xxx
    ↓
API 路由交换 code 为 session
    ↓
设置 cookies 并重定向到首页
    ↓
页面显示已登录状态（用户头像）
```

## 🧪 测试步骤

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问测试页面**
   - http://localhost:3000
   - http://localhost:3000/test-auth

3. **点击 "Sign In" 按钮**
   - ✅ 应该直接跳转到 Google OAuth
   - ✅ 不应该看到 RSC 错误

4. **完成 Google 授权**
   - ✅ 返回后应该显示用户头像
   - ✅ 登录状态正确显示

## 📋 对比：不同导航方式的区别

| 方式 | 用途 | 示例 | 适用场景 |
|------|------|------|----------|
| `router.push()` | Next.js 客户端导航 | `router.push('/dashboard')` | 页面之间的导航 |
| `window.location.href` | 完整浏览器导航 | `window.location.href = '/api/redirect'` | API 路由、外部链接 |
| `<Link>` | 声明式导航 | `<Link href="/about">` | 链接和按钮 |
| `<a>` | 标准 HTML 链接 | `<a href="/external">` | 外部链接、非 JS 环境 |

## 🔧 相关代码

### API 路由（`app/auth/login/route.ts`）
```typescript
export async function GET(request: Request) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  return NextResponse.redirect(data.url)  // 返回重定向
}
```

### 客户端组件（`components/auth-provider.tsx`）
```typescript
const handleSignIn = () => {
  window.location.href = '/auth/login'  // 触发浏览器导航
}
```

## ✨ 其他注意事项

### 登出流程
登出使用 `fetch` + `router.push` 是可以的，因为：
1. 我们需要等待登出 API 完成执行
2. 登出后需要刷新页面状态
3. 不涉及外部重定向

```tsx
const handleSignOut = async () => {
  try {
    await fetch('/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
```

### 如果未来需要客户端重定向
如果需要在客户端处理 OAuth 流程，可以考虑：
1. 使用 `signInWithOAuth` 的客户端版本
2. 使用 popup 而不是重定向
3. 处理返回的 session data

但当前的实现（服务器端 PKCE 流程）更安全。

## 📚 参考

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)
- [Supabase Auth SSR](https://supabase.com/docs/guides/auth/server-side/creating-a-client)

---

**修复时间：** 2025-01-13
**影响范围：** 登录按钮点击
**修复状态：** ✅ 已完成并测试
