"use client";
import React from "react";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
              <Card className="h-full">
                <CardHeader className="flex flex-col space-y-2 bg-secondary text-center mb-0">
                  <h2 className="py-1 font-semibold mx-auto">Area Details</h2>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-5 text-xs px-2 items-start justify-start my-0 -mt-4">
                  <div className="">
                    <h4 className="font-bold">Area Location</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Beatae dolorem ducimus ea sequi qui
                    </p>
                  </div>
                  <div className="">
                    <div className="mb-2">
                      <h4 className="font-bold">Center Location </h4>
                      <div className="text-xs">
                        <p>Lat : 12.34561368109</p>
                        <p>Lon : 78.901136191312</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Dock Location </h4>
                      <div className="text-xs">
                        <p>Lat : 12.345183610916</p>
                        <p>Lon : 78.901361903112</p>
                      </div>
                    </div>
                  </div>

                  <div className=""></div>
                </CardContent>
              </Card>
            </section>
          </section>
        </section>
      </div>
    </PageContainer>
  );
}
