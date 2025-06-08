import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/layout/page-container";
import PatrolAreaCard from "./_components/patrol-area-card";
import PatrolAreaCreateModal from "./_components/patrol-area-form";
import ChatComponent from "@/components/chat";

const areaData = [
  {
    id: 1,
    name: "Gardu Induk 450KV",
    description: "Patrol area for Gardu Induk 450KV",
    imageUri:
      "https://web.pln.co.id/statics/uploads/2020/03/IMG-20200330-WA0019-1.jpg",
    numberOfRobots: 3,
    assignedMissions: 6,
  },
  {
    id: 2,
    name: "Gardu Induk 150KV",
    description: "Patrol area for Gardu Induk 150KV",
    imageUri:
      "https://web.pln.co.id/statics/uploads/2020/03/IMG-20200330-WA0019-1.jpg",
    numberOfRobots: 2,
    assignedMissions: 4,
  },
  {
    id: 3,
    name: "Gardu Induk 70KV",
    description: "Patrol area for Gardu Induk 70KV",
    imageUri:
      "https://web.pln.co.id/statics/uploads/2020/03/IMG-20200330-WA0019-1.jpg",
    numberOfRobots: 1,
    assignedMissions: 3,
  },
  {
    id: 4,
    name: "Gardu Induk 70KV",
    description: "Patrol area for Gardu Induk 70KV",
    imageUri:
      "https://web.pln.co.id/statics/uploads/2020/03/IMG-20200330-WA0019-1.jpg",
    numberOfRobots: 1,
    assignedMissions: 3,
  },
  {
    id: 5,
    name: "Gardu Induk 70KV",
    description: "Patrol area for Gardu Induk 70KV",
    imageUri:
      "https://web.pln.co.id/statics/uploads/2020/03/IMG-20200330-WA0019-1.jpg",
    numberOfRobots: 1,
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
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <PatrolAreaCard area={areaData} />
        </div>
      </div>
    </PageContainer>
  );
}
