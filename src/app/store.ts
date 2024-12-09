import { create } from "zustand";

const parseCandidateSkill = (candidateList: any[], candidateData: any) => {
  const skillset = candidateData.data.data.skillset;
  const candidateName = candidateData.name;

  const candidateNameAndScore = skillset.map((skill) => ({
    name: skill.name, // skill name
    score: skill.skills.reduce(
      (total, sk) => total + sk.pos.reduce((t, p) => t + p.consensus_score, 0),
      0
    ),
  }));

  for (const skill of candidateNameAndScore) {
    const skillIndex = candidateList.findIndex(
      (item) => item.id === skill.name
    );

    if (skillIndex !== -1) {
      candidateList[skillIndex].data.push({
        x: candidateName,
        y: skill.score,
      });
    } else {
      candidateList.push({
        id: skill.name,
        data: [
          {
            x: candidateName,
            y: skill.score,
          },
        ],
      });
    }
  }

  return candidateList;
};

export const useCandidateStore = create((set, get) => ({
  isLoading: true,
  candidateList: [],
  candidateListId: [],
  graphCandidateList: [],
  candidateHeatmapData: [],
  initializeCandidateList: async () => {
    const response = await fetch(
      "https://forinterview.onrender.com/people"
    ).then((r) => r.json());

    set({ isLoading: false, candidateList: response });
  },
  addCandidate: async (candidateId: string) => {
    const stateData = get();
    const graphCandidateList = stateData.graphCandidateList;
    const candidateHeatmapData = stateData.candidateHeatmapData;

    const found = graphCandidateList.find((item) => item.id === candidateId);

    if (found) return;

    const response = await fetch(
      `https://forinterview.onrender.com/people/${candidateId}`
    ).then((r) => r.json());

    const parsedData = parseCandidateSkill(candidateHeatmapData, response);

    set((state: any) => ({
      ...state,
      candidateListId: [...state.candidateListId, candidateId],
      graphCandidateList: [...state.graphCandidateList, response],
      candidateHeatmapData: [...parsedData],
    }));
  },
  removeCandidate: (candidateId: string) => {
    const stateData = get();
    const graphCandidateList = stateData.graphCandidateList;

    const otherCandidates = graphCandidateList.filter(
      (c) => c.id !== candidateId
    );

    set((state) => ({
      ...state,
      graphCandidateList: otherCandidates,
      candidateListId: state.candidateListId.filter((id) => id !== candidateId),
      candidateHeatmapData: otherCandidates.reduce((acc, item) => {
        return [...parseCandidateSkill(acc, item)];
      }, []),
    }));
  },
}));
