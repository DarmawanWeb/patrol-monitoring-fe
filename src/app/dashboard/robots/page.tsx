import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/layout/page-container";
import RobotsCard from "./_components/robot-card";

// Dummy data for robots with the provided image URL
const dummyData = [
  {
    id: 1,
    name: "Robot A",
    description: "Robot A description goes here.",
    imageUri:
      "https://www.therobotreport.com/wp-content/uploads/2023/10/deeprobotics-sponsored-image1-october2023.jpg", // Using the provided image URL
    operatingHours: "24/7",
    numberMissionsCompleted: 50,
    projectId: 101,
    currentStatus: "Active",
    soc: 75,
  },
  {
    id: 2,
    name: "Robot B",
    description: "Robot B description goes here.",
    imageUri:
      "https://www.therobotreport.com/wp-content/uploads/2023/10/deeprobotics-sponsored-image1-october2023.jpg",
    operatingHours: "9 AM - 6 PM",
    numberMissionsCompleted: 30,
    projectId: 102,
    currentStatus: "Inactive",
    soc: 50,
  },
  {
    id: 3,
    name: "Robot C",
    description: "Robot C description goes here.",
    imageUri:
      "https://www.therobotreport.com/wp-content/uploads/2023/10/deeprobotics-sponsored-image1-october2023.jpg", // Using the provided image URL
    operatingHours: "10 AM - 8 PM",
    numberMissionsCompleted: 80,
    projectId: 103,
    currentStatus: "Idle",
    soc: 90,
  },
  {
    id: 4,
    name: "Robot D",
    description: "Robot D description goes here.",
    imageUri:
      "https://www.therobotreport.com/wp-content/uploads/2023/10/deeprobotics-sponsored-image1-october2023.jpg", // Using the provided image URL
    operatingHours: "12 PM - 5 PM",
    numberMissionsCompleted: 120,
    projectId: 104,
    currentStatus: "Active",
    soc: 65,
  },
];

export default async function RobotArea() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Robot Page"
            description="Manage robots and their status."
          />
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {/* Render RobotsCard with the dummy data */}
          <RobotsCard data={dummyData} />
        </div>
      </div>
    </PageContainer>
  );
}
