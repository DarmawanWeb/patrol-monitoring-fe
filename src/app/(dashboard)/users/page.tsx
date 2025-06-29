"use client"

import { Users } from "lucide-react"
import { Suspense } from "react"
import UserTab from "./_components/user-tabs"

function UserManagementContent() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 pt-20 pb-32">
      <section className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="-top-40 -right-40 absolute h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 blur-3xl" />
        <div className="-bottom-40 -left-40 absolute h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-600/10 blur-3xl" />
      </section>

      <div className="relative mx-auto max-w-7xl pt-10">
        <section className="mb-8">
          <div className="mb-2 flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-3xl text-white tracking-tight">
                User Management
              </h1>
              <p className="text-slate-400 text-sm">
                Manage system users and their permissions
              </p>
            </div>
          </div>
        </section>

        <UserTab />
      </div>
    </main>
  )
}

export default function UserManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-cyan-500 border-b-2"></div>
            <p className="text-slate-400">Loading User Management...</p>
          </div>
        </div>
      }
    >
      <UserManagementContent />
    </Suspense>
  )
}
