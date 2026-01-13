import { AuthState } from '@/components/auth-provider'
import { Navigation } from '@/components/navigation'

export default function AuthDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">欢迎使用 Supabase 认证</h2>
            <p className="text-muted-foreground text-lg">
              这是一个演示页面，展示了如何使用 Supabase 实现 Google OAuth 登录功能。
              点击右上角的登录按钮开始体验。
            </p>
          </section>

          <section className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold">功能特性</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✅ Google OAuth 登录（服务器端 PKCE 流程）</li>
              <li>✅ 自动 token 刷新</li>
              <li>✅ Cookie-based 会话管理</li>
              <li>✅ 用户信息显示</li>
              <li>✅ 安全的登出功能</li>
            </ul>
          </section>

          <section className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold">如何使用</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>点击右上角的 &quot;Sign in with Google&quot; 按钮</li>
              <li>在 Google 授权页面选择你的 Google 账号</li>
              <li>授权完成后会自动返回本页面</li>
              <li>登录成功后会显示用户头像和邮箱</li>
              <li>点击用户头像可以查看菜单并登出</li>
            </ol>
          </section>

          <section className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold">集成到你的页面</h3>
            <p className="text-muted-foreground">
              只要在任何页面中引入并使用 {`<AuthState />`} 组件即可：
            </p>
            <pre className="bg-background p-4 rounded-md overflow-x-auto text-sm">
{`import { AuthState } from '@/components/auth-provider'

export default function YourPage() {
  return (
    <div>
      <AuthState />
      {/* 其他内容 */}
    </div>
  )
}`}
            </pre>
          </section>

          <section className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold">服务器端获取用户信息</h3>
            <pre className="bg-background p-4 rounded-md overflow-x-auto text-sm">
{`import { createClient } from '@/lib/supabase/server'

export default async function ServerPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  return <div>Welcome, {user?.email}</div>
}`}
            </pre>
          </section>
        </div>
      </main>
    </div>
  )
}
