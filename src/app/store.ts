import { create } from "zustand";

const parseCandidateSkill = (candidateData: any) => {
  const skillset = candidateData.data.data.skillset;

  return skillset.map((skill) => ({
    x: skill.name,
    y: skill.skills.reduce(
      (total, sk) => total + sk.pos.reduce((t, p) => t + p.consensus_score, 0),
      0
    ),
  }));
};

const parseDataForHeatMap = (candidateData: any) => {
  const response = parseCandidateSkill(candidateData);

  return {
    id: candidateData.name,
    data: response,
  };
};

export const useCandidateStore = create((set, get) => ({
  isLoading: true,
  candidateList: [],
  graphCandidateList: [],
  candidateHeatmapData: [],
  initializeCandidateList: async () => {
    const response = await fetch(
      "https://forinterview.onrender.com/people"
    ).then((r) => r.json());

    set({ isLoading: false, candidateList: response });
  },
  addCandidate: async (candidateId: string) => {
    const graphCandidateList = get().graphCandidateList;

    const found = graphCandidateList.find((item) => item.id === candidateId);

    if (found) return;

    const response = await fetch(
      `https://forinterview.onrender.com/people/${candidateId}`
    ).then((r) => r.json());

    const parsedData = parseDataForHeatMap(response);

    set((state: any) => ({
      ...state,
      graphCandidateList: [...state.graphCandidateList, response],
      candidateHeatmapData: [...state.candidateHeatmapData, parsedData],
    }));
  },
  removeCandidate: (candidateId: string) => {
    const graphCandidateList = get().graphCandidateList;
    console.log(candidateId, graphCandidateList);

    const otherCandidates = graphCandidateList.filter(
      (c) => c.id !== candidateId
    );

    set((state) => ({
      ...state,
      graphCandidateList: otherCandidates,
      candidateHeatmapData: otherCandidates.map((item) =>
        parseDataForHeatMap(item)
      ),
    }));
  },
}));
