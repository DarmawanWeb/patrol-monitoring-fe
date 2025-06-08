import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AreaDetailCard() {
  return (
    <Card className="h-full py-0">
      <CardHeader className="flex flex-col space-y-2 bg-secondary text-center mb-0">
        <h2 className="py-1 font-semibold mx-auto">Area Details</h2>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-5 text-sm px-2 items-start justify-start my-0 -mt-4">
        <div className="">
          <h4 className="font-bold">Area Details Location</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            dolorem ducimus ea sequi qui
          </p>
        </div>
        <div className="">
          <div className="mb-2">
            <h4 className="font-bold">Center Position </h4>
            <div className="text-sm">
              <p>Lat : 12.34561368109</p>
              <p>Lon : 78.901136191312</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Carging Dock Position</h4>
            <div className="text-sm">
              <p>Lat : 12.345183610916</p>
              <p>Lon : 78.901361903112</p>
              <p>Yaw : 30.642°</p>
            </div>
          </div>
        </div>

        <div className=""></div>
      </CardContent>
    </Card>
  );
}
