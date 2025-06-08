"use client";
import React from "react";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import AreaDetailCard from "./_components/area-detail-card";
import PatrolAreaCreateModal from "../_components/patrol-area-form";

import MapComponent from "@/components/maps/maps";

export default function AreaPage() {
  const { areaId } = useParams();
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 w-full">
        <div className="flex items-start justify-between">
          <Heading
            title={`Patrol Area: ${areaId}`}
            description="Manage patrol areas for robots and missions."
          />
          <PatrolAreaCreateModal
            initialData={null}
            pageTitle="Update Patrol Area"
            pageDescription="Update patrol area details."
          />
        </div>
        <Separator />
        <section className="w-full  h-full grid grid-cols-2 gap-2">
          <section className="h-full grid grid-rows-3 gap-2">
            <Card className="h-full w-full py-0 overflow-hidden">
              <CardHeader className="flex flex-col space-y-2 bg-secondary text-center">
                <h2 className="py-1 font-semibold mx-auto">Robot List</h2>
              </CardHeader>
              <CardContent className="p-4 space-y-2"></CardContent>
            </Card>
            <Card className="h-full w-full py-0 overflow-hidden">
              <CardHeader className="flex flex-col space-y-2 bg-secondary text-center">
                <h2 className="py-1 font-semibold mx-auto">Route List</h2>
              </CardHeader>
              <CardContent className="p-4 space-y-2"></CardContent>
            </Card>
            <Card className="h-full w-full py-0 overflow-hidden">
              <CardHeader className="flex flex-col space-y-2 bg-secondary text-center">
                <h2 className="py-1 font-semibold mx-auto">Mission Result</h2>
              </CardHeader>
              <CardContent className="p-4 space-y-2"></CardContent>
            </Card>
          </section>

          <section className="w-full h-full">
            <section className="h-8/12">
              <MapComponent />
            </section>
            <section className="h-4/12 pt-2">
              <AreaDetailCard />
            </section>
          </section>
        </section>
      </div>
    </PageContainer>
  );
}
