"use client";

import Heatmap from "./ui/Heatmap";
import { useCandidateStore } from "@/app/store";

const Main = () => {
  const { candidateHeatmapData } = useCandidateStore();

  return (
    <>
      {candidateHeatmapData.length ? (
        <Heatmap data={candidateHeatmapData} />
      ) : (
        <div className="text-base text-center mt-20 text-gray-400">
          Please click on the candidate to add
        </div>
      )}
    </>
  );
};

export default Main;
