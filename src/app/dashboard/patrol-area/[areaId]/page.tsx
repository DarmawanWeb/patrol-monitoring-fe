"use client";
import React from "react";
import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import AreaDetailCard from "./_components/area-detail-card";
import PatrolAreaCreateModal from "../_components/patrol-area-form";

import MapComponent from "@/components/maps/maps";

type Marker = {
  name: string;
  type: "overheat-component" | "robot" | "station";
  temperature: number;
  positions: { lat: number; lon: number; heading: number };
};

export default function AreaPage() {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const generateDummyMarkers = () => {
      const dummyMarkers = [];
      for (let i = 0; i < 1000; i++) {
        const lat = -8.45 + Math.random() * 0.1;
        const lon = 115.8 + Math.random() * 0.1;
        const temperature = Math.random() * 50 + 30;
        dummyMarkers.push({
          name: `Component ${i}`,
          type: (i % 3 === 0
            ? "overheat-component"
            : "robot") as Marker["type"],
          temperature: temperature,
          positions: { lat, lon, heading: Math.random() * 360 },
        });
      }
      setMarkers(dummyMarkers);
    };

    generateDummyMarkers();
  }, []);
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
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="account">Robot</TabsTrigger>
                <TabsTrigger value="password">Routes</TabsTrigger>
                <TabsTrigger value="password">Mission</TabsTrigger>
                <TabsTrigger value="password">Configuration</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
              </TabsContent>
            </Tabs>
            {/* <Card className="h-full w-full py-0 overflow-hidden">
              <CardHeader className="flex flex-col space-y-2 bg-secondary text-center">
                <h2 className="py-1 font-semibold mx-auto">Robot List</h2>
              </CardHeader>
              <CardContent className="p-4 space-y-2"></CardContent>
            </Card>/h
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
            </Card> */}
          </section>

          <section className="w-full h-full">
            <section className="h-8/12">
              <MapComponent markers={markers} />
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
