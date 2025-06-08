import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface AreaCardProps {
  id: number;
  name: string;
  description: string;
  imageUri: string;
  numberOfRobots: number;
  assignedMissions: number;
}

export default function PatrolAreaCard({ area }: { area: AreaCardProps[] }) {
  return (
    <>
      {area.map((item) => (
        <Link
          href={`/dashboard/patrol-area/${item.id}`}
          key={item.id}
          className="hover:scale-105 transform transition-all duration-200"
        >
          <Card className="w-full max-w-sm mx-auto overflow-hidden py-0">
            <Image
              src={item.imageUri}
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
            <CardContent>
              <h1 className="font-semibold text-lg">{item.name}</h1>
              <p className="text-sm">{item.description}</p>
              <div className="pt-3 text-sm">
                <p>Num of Robots: {item.numberOfRobots}</p>
                <p>Num of Route: {item.assignedMissions}</p>
              </div>
            </CardContent>
            <CardFooter className="pb-3 text-right flex justify-end text-sm">
              <h3>View Detail</h3>
              <ChevronRight className="h-4 w-4 ml-2" />
            </CardFooter>
          </Card>
        </Link>
      ))}
    </>
  );
}
