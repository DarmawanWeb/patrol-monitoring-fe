import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/layout/page-container";

export default function RobotArea() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Robot Page"
            description="Manage robots and their status."
          />
          {/* <PatrolAreaCreateModal
            initialData={null}
            pageTitle="Create Patrol Area"
            pageDescription="Create a new patrol area by filling out the details below. You can
              edit or delete areas later."
          /> */}
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {/* <PatrolAreaCard area={areaData} /> */}
        </div>
      </div>
    </PageContainer>
  );
}
