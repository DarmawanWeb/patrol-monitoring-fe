import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import PatrolAreaCreateModal from "./[areaId]/_components/patrol-area-form";

const areaData = [
  {
    id: "kbasdkabui18161",
    name: "Gardu Induk 450KV",
    description: "Patrol area for Gardu Induk 450KV",
    imageUri:
      "https://web.pln.co.id/statics/uploads/2020/03/IMG-20200330-WA0019-1.jpg",
    numberOfRobots: 3,
    identifier: "345678456723",
    assignedMissions: 6,
  },
  {
    id: "kbasdkabui18162",
    name: "Gardu Induk 150KV",
    description: "Patrol area for Gardu Induk 150KV",
    imageUri:
      "https://web.pln.co.id/statics/uploads/2020/03/IMG-20200330-WA0019-1.jpg",
    numberOfRobots: 2,
    identifier: "345678456724",
    assignedMissions: 4,
  },
  {
    id: "kbasdkabui18163",
    name: "Gardu Induk 70KV",
    description: "Patrol area for Gardu Induk 70KV",
    imageUri:
      "https://web.pln.co.id/statics/uploads/2020/03/IMG-20200330-WA0019-1.jpg",
    numberOfRobots: 1,
    identifier: "345678456725",
    assignedMissions: 3,
  },
  {
    id: "kbasdkabui18164",
    name: "Gardu Induk 70KV",
    description: "Patrol area for Gardu Induk 70KV",
    imageUri:
      "https://web.pln.co.id/statics/uploads/2020/03/IMG-20200330-WA0019-1.jpg",
    numberOfRobots: 1,
    identifier: "345678456726",
    assignedMissions: 3,
  },
  {
    id: "kbasdkabui18164",
    name: "Gardu Induk 70KV",
    description: "Patrol area for Gardu Induk 70KV",
    imageUri:
      "https://web.pln.co.id/statics/uploads/2020/03/IMG-20200330-WA0019-1.jpg",
    numberOfRobots: 1,
    identifier: "345678456726",
    assignedMissions: 3,
  },
];

export default function PatrolArea() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Patrol Area"
            description="Manage patrol areas for robots and missions."
          />
          <PatrolAreaCreateModal
            initialData={null}
            pageTitle="Create Patrol Area"
            pageDescription="Create a new patrol area by filling out the details below. You can
              edit or delete areas later."
          />
          {/* <Link
            href="/dashboard/patrol-area/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {areaData.map((area) => (
            <Link
              href={`/dashboard/patrol-area/${area.id}`}
              key={area.id}
              className="hover:scale-105 transform transition-all duration-200"
            >
              <Card className="w-full max-w-sm mx-auto overflow-hidden py-0">
                <Image
                  src={area.imageUri}
                  alt={area.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <CardContent>
                  <h1 className="font-semibold text-lg">{area.name}</h1>
                  <p className="text-sm">{area.description}</p>
                  <div className="pt-3 text-sm">
                    <p>Num of Robots: {area.numberOfRobots}</p>
                    <p>Num of Route: {area.assignedMissions}</p>
                  </div>
                </CardContent>
                <CardFooter className="pb-3 text-right flex justify-end">
                  <h3>View Detail</h3>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
