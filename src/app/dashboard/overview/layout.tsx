import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

export default function OverViewLayout({
  pie_stats,
  bar_stats,
}: {
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className="flex h-full flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back Admin Dar👋
          </h2>
        </div>

        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Robot</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                1
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp />
                  +0%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Robot registered in this project
              </div>
              <div className="text-muted-foreground">Divided into 1 zone</div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Area Covered</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                1,234
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingDown />
                  -1%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Area covered by the robot in meters squared
              </div>
              <div className="text-muted-foreground">
                With total 1000 M distance traveled
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Patrol Statistics</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                20
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp />
                  +0%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Patrol have been started
              </div>
              <div className="text-muted-foreground">
                With 0 patrol patrol has failed
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Overheat Detected</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                2
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp />
                  +1%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Overheat detected in the last 30 days
              </div>
              <div className="text-muted-foreground">Deviced into 2 zones</div>
            </CardFooter>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 h-full">{bar_stats}</div>
          <div className="col-span-3 md:col-span-3">{pie_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
