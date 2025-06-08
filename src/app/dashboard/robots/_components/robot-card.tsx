import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component

export interface RobotsCardProps {
  id: number;
  name: string;
  description: string;
  imageUri: string;
  operatingHours: string;
  numberMissionsCompleted: number;
  projectId: number;
  currentStatus: string;
  soc: number;
}

export default function RobotsCard({ data }: { data: RobotsCardProps[] }) {
  return (
    <>
      {data.map((item) => (
        <Link
          href={`/dashboard/projects/${item.id}`}
          key={item.id}
          className="hover:scale-105 transform transition-all duration-200"
        >
          <Card className="w-full max-w-sm mx-auto overflow-hidden py-0">
            <div className="relative">
              <Image
                src={item.imageUri}
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-primary text-white px-2 py1 rounded-full shadow-md text-xs">
                {item.currentStatus}
              </Badge>
              <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded-full text-sm">
                SOC: {item.soc}%
              </div>
            </div>

            <CardContent>
              <h1 className="font-semibold text-lg">{item.name}</h1>
              <p className="text-sm">{item.description}</p>
              <div className="pt-3 text-sm">
                <p>Operating hours: {item.operatingHours}</p>
                <p>Num Completed Mission: {item.numberMissionsCompleted}</p>
              </div>
            </CardContent>
            <CardFooter className="pb-3 text-right flex justify-end text-sm">
              <h3>View Detail Robot</h3>
              <ChevronRight className="h-4 w-4 ml-2" />
            </CardFooter>
          </Card>
        </Link>
      ))}
    </>
  );
}
