import { AuthState } from '@/components/auth-provider'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { BananaIcon } from '@/components/banana-icon'

export default async function TestAuthPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const claims = await supabase.auth.getClaims()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navigation />

      {/* Page Header */}
      <div className="border-b bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <BananaIcon className="w-10 h-10 text-accent" />
            <div>
              <h1 className="text-3xl font-bold">Supabase 认证测试</h1>
              <p className="text-sm text-muted-foreground mt-1">
                完整功能验证页面
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Login Status Card */}
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-2xl">🔐</span>
              登录状态
            </h2>

            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <span className="text-xl">✅</span>
                  <span className="font-semibold">已登录</span>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div>
                    <span className="font-semibold text-sm text-muted-foreground">用户 ID：</span>
                    <p className="font-mono text-sm break-all">{user.id}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-sm text-muted-foreground">邮箱：</span>
                    <p className="text-sm">{user.email}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-sm text-muted-foreground">创建时间：</span>
                    <p className="text-sm">{new Date(user.created_at).toLocaleString('zh-CN')}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-sm text-muted-foreground">最后更新：</span>
                    <p className="text-sm">
                      {user.updated_at
                        ? new Date(user.updated_at).toLocaleString('zh-CN')
                        : 'N/A'}
                    </p>
                  </div>

                  {user.user_metadata && Object.keys(user.user_metadata).length > 0 && (
                    <div>
                      <span className="font-semibold text-sm text-muted-foreground">用户元数据：</span>
                      <pre className="bg-background p-3 rounded-md overflow-x-auto text-xs mt-2">
                        {JSON.stringify(user.user_metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600">
                <span className="text-xl">⚠️</span>
                <span className="font-semibold">未登录</span>
              </div>
            )}
          </div>

          {/* Claims Status Card */}
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              Token 验证状态 (Claims)
            </h2>

            {claims.data ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <span className="text-xl">✅</span>
                  <span className="font-semibold">Token 有效且已验证</span>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <pre className="bg-background p-3 rounded-md overflow-x-auto text-xs">
                    {JSON.stringify(claims.data, null, 2)}
                  </pre>
                </div>
              </div>
            ) : claims.error ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600">
                  <span className="text-xl">❌</span>
                  <span className="font-semibold">Token 验证失败</span>
                </div>

                <div className="bg-destructive/10 text-destructive p-4 rounded-md">
                  <p className="text-sm">{claims.error.message}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600">
                <span className="text-xl">⚠️</span>
                <span className="font-semibold">无 Token 信息</span>
              </div>
            )}
          </div>

          {/* Test Actions Card */}
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-2xl">🧪</span>
              测试操作
            </h2>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">步骤 1：</strong> 点击右上角的{" "}
                <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs">
                  Sign in with Google
                </span>{" "}
                按钮
              </p>
              <p>
                <strong className="text-foreground">步骤 2：</strong> 在 Google 授权页面选择你的账号并授权
              </p>
              <p>
                <strong className="text-foreground">步骤 3：</strong> 授权完成后会自动返回此页面
              </p>
              <p>
                <strong className="text-foreground">步骤 4：</strong> 查看上方的用户信息和 Claims 验证状态
              </p>
              <p>
                <strong className="text-foreground">步骤 5：</strong> 点击用户头像，选择{" "}
                <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs">
                  Sign out
                </span>{" "}
                测试登出功能
              </p>
            </div>

            {!user && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  💡 <strong>提示：</strong> 登录后此页面会刷新并显示你的用户信息
                </p>
              </div>
            )}
          </div>

          {/* Technical Details */}
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-xl">🔧</span>
              技术细节
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/50 rounded-lg p-3">
                <span className="font-semibold text-muted-foreground">认证流程：</span>
                <p className="mt-1">PKCE (Proof Key for Code Exchange)</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <span className="font-semibold text-muted-foreground">Token 存储：</span>
                <p className="mt-1">HttpOnly Cookies</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <span className="font-semibold text-muted-foreground">Token 刷新：</span>
                <p className="mt-1">自动刷新 (通过 proxy.ts)</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <span className="font-semibold text-muted-foreground">验证方式：</span>
                <p className="mt-1">JWT 签名验证 (getClaims)</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">API 路由：</h3>
              <ul className="space-y-1 text-sm font-mono">
                <li>• GET /auth/login - 触发 Google 登录</li>
                <li>• GET /auth/callback - OAuth 回调处理</li>
                <li>• POST /auth/logout - 登出</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
