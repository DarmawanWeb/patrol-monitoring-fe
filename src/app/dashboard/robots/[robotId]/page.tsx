"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import RosFastImageStream from "@/components/ros/ros-fast-image-stream";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PatrolAreaCreateModal from "../_components/patrol-area-form";

export default function RobotPage() {
  const { robotId } = useParams();
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 w-full">
        <div className="flex items-start justify-between">
          <Heading
            title={`Robot ID ${robotId}`}
            description="Manage patrol areas for robots and missions."
          />
          <PatrolAreaCreateModal
            initialData={null}
            pageTitle="Update Patrol Area"
            pageDescription="Update patrol area details."
          />
        </div>
        <Separator />

        <section className="grid grid-cols-4 gap-4 pt-5">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Battery Status</h3>
            </CardHeader>
            <CardContent>
              <div>85%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Mission Status</h3>
            </CardHeader>
            <CardContent>
              <div>In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Signal Strength</h3>
            </CardHeader>
            <CardContent>
              <div>Good</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Temperature</h3>
            </CardHeader>
            <CardContent>
              <div>45°C</div>
            </CardContent>
          </Card>
        </section>
        <Separator />
        <section className="w-full h-full grid grid-cols-1 gap-4 pt-5">
          <div className="relative w-full h-[500px] mb-4 grid grid-cols-2 gap-4 items-center justify-center">
            <RosFastImageStream
              host="https://video-server.agus-darmawan.com"
              height={480}
              width={640}
              quality={55}
              topic="/object_detection/usb_cam/image_raw"
            />
            <RosFastImageStream
              host="https://video-server.agus-darmawan.com"
              height={480}
              width={640}
              quality={55}
              topic="/object_detection/usb_cam/image_raw"
            />
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
