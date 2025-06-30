"use client"
import { Bot } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRobotTypes } from "@/hooks/queries/use-robots-queries"
import { useGenericUrlState } from "@/hooks/use-generic-url-state"
import type { RobotUrlState } from "@/types/robot"
import RobotTab from "./_components/robot/robot-tab"
import TypeTab from "./_components/robot-type/type-tab"

export default function RobotManagementPage() {
  const { filters, updateFilters } = useGenericUrlState<RobotUrlState>({
    tab: "robots",
    search: "",
    status: "all",
    typeId: "all",
    page: 1,
    limit: 6,
  })

  const { data: robotTypes } = useRobotTypes()
  const handleTabChange = (value: string) => {
    updateFilters({ tab: value, page: 1 })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 pt-20 pb-32">
      <section className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="-top-40 -right-40 absolute h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 blur-3xl" />
      </section>

      <div className="relative mx-auto max-w-7xl pt-10">
        <section className="mb-8">
          <div className="mb-2 flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-3xl text-white tracking-tight">
                Robot Management
              </h1>
              <p className="text-slate-400 text-sm">
                Manage robots and their types
              </p>
            </div>
          </div>
        </section>

        <Tabs
          value={filters.tab || "robots"}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 border border-slate-700/50 bg-slate-800/50">
            <TabsTrigger
              value="robots"
              className="text-slate-300 data-[state=active]:bg-slate-700/50 data-[state=active]:text-white"
            >
              Robots ({robotTypes?.length || 0})
            </TabsTrigger>
            <TabsTrigger
              value="types"
              className="text-slate-300 data-[state=active]:bg-slate-700/50 data-[state=active]:text-white"
            >
              Types ({robotTypes?.length || 0})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="robots">
            <RobotTab />
          </TabsContent>
          <TabsContent value="types">
            <TypeTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
