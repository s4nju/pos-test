"use client";
import useSWR from "swr";
import { ArrowLeft } from "lucide-react";

import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useCandidateStore } from "./store";
import { useEffect } from "react";

export interface CandidateDataType {
  name: string;
  adress: string;
  email: string;
  id: string;
  phone: string;
}

// const fetchPeople = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  // const { data: candidateData, isLoading } = useSWR<CandidateDataType[]>(
  //   "https://forinterview.onrender.com/people",
  //   fetchPeople
  // );

  const { isLoading, candidateList, initializeCandidateList } =
    useCandidateStore((state) => state);

  useEffect(() => {
    initializeCandidateList();
  }, []);

  if (isLoading) {
    return "Loading People...";
  }

  return (
    <div className="w-full max-w-[1200px]">
      <div>
        <div>
          <Button variant="ghost">
            <ArrowLeft />
            Back to My Jobs
          </Button>
        </div>
        <div className="flex justify-between">
          <div className="text-xl font-bold text-muted-foreground">
            Posk_UXdesigner_sr001
          </div>
          <div className="font-bold text-muted-foreground">
            {candidateList.length} Candidates
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="max-w-64 border-black border-2 text-center mt-4">
          <Sidebar candidateData={candidateList} />
        </div>
        <div className="w-full">
          <Main candidateData={candidateList} />
        </div>
      </div>
    </div>
  );
}
