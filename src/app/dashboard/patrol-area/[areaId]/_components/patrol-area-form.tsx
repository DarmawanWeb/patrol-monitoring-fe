"use client";
import React, { useState } from "react";
import { FileUploader } from "@/components/form/file-uploader";
import { Button } from "@/components/ui/button";
import { PatrolArea } from "@/types/patrol";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  name: z.string().min(2, {
    message: "Area name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  numberOfRobots: z.number().min(1, {
    message: "At least one robot must be assigned.",
  }),
  assignedMissions: z.number().min(0, {
    message: "Number of missions cannot be negative.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  mapCenterLat: z.number().min(-90).max(90, {
    message: "Latitude must be between -90 and 90.",
  }),
  mapCenterLong: z.number().min(-180).max(180, {
    message: "Longitude must be between -180 and 180.",
  }),
  chargingDockLat: z.number().min(-90).max(90, {
    message: "Charging Dock Latitude must be between -90 and 90.",
  }),
  chargingDockLong: z.number().min(-180).max(180, {
    message: "Charging Dock Longitude must be between -180 and 180.",
  }),
  chargingDockYaw: z.number().min(0).max(360, {
    message: "Yaw must be between 0 and 360.",
  }),
});

export default function PatrolAreaCreateModal({
  initialData,
  pageTitle,
  pageDescription,
}: {
  initialData: PatrolArea | null;
  pageTitle: string;
  pageDescription: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      numberOfRobots: initialData?.numberOfRobots || 0,
      assignedMissions: initialData?.assignedMissions || 0,
      address: initialData?.address || "",
      mapCenterLat: initialData?.mapCenterLat || 0,
      mapCenterLong: initialData?.mapCenterLong || 0,
      chargingDockLat: initialData?.chargingDockLat || 0,
      chargingDockLong: initialData?.chargingDockLong || 0,
      chargingDockYaw: initialData?.chargingDockYaw || 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted Values:", values);
    setIsOpen(false); // Close the modal on submit
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{pageTitle}</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{pageTitle}</DialogTitle>
            <DialogDescription>{pageDescription}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        maxSize={MAX_FILE_SIZE}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <section className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter patrol area name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mapCenterLong"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Map Center Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter longitude"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mapCenterLat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Map Center Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter latitude"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter patrol area description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area Location (Address)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter patrol area description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chargingDockLat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charging Dock Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter charging dock latitude"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chargingDockLong"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charging Dock Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter charging dock longitude"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chargingDockYaw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charging Dock Yaw</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter yaw" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-3 col-span-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Patrol Area</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
