"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Heatmap from "./ui/Heatmap";
import { useCandidateStore } from "@/app/store";
import { Button } from "./ui/button";
import { Filter, MoveLeft, MoveRight } from "lucide-react";

const Main = () => {
  const { candidateHeatmapData } = useCandidateStore();

  return (
    <Tabs defaultValue="compare" className="w-fit">
      <TabsList className="flex justify-between">
        <span>
          <TabsTrigger value="compare">Compare View</TabsTrigger>
          <TabsTrigger value="indi">Individual View</TabsTrigger>
          <TabsTrigger value="shortlist">Shortlisted candidates</TabsTrigger>
        </span>
        <span className="mr-4">
          <Button
            variant="outline"
            className="border-black rounded-none drop-shadow-sm mr-2"
          >
            <MoveLeft />
          </Button>
          <Button
            variant="outline"
            className="border-black rounded-none drop-shadow-sm"
          >
            <MoveRight />
          </Button>
        </span>
      </TabsList>
      <TabsContent value="compare">
        <Button
          variant="outline"
          className="w-32 justify-between text-base border-black rounded-none bg-muted"
        >
          Filter
          <Filter />
        </Button>
        {candidateHeatmapData.length ? (
          <Heatmap data={candidateHeatmapData} />
        ) : (
          <div className="text-base text-center mt-20 text-gray-400">
            Please click on the candidate to add
          </div>
        )}
      </TabsContent>
      <TabsContent value="indi">Coming Soon!</TabsContent>
      <TabsContent value="shortlist">Coming Soon!</TabsContent>
    </Tabs>
  );

  return <></>;
};

export default Main;
