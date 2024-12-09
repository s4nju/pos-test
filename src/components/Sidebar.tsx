import Avatar from "boring-avatars";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useCandidateStore } from "@/app/store";

const Sidebar = () => {
  const { candidateList, candidateListId, addCandidate, removeCandidate } =
    useCandidateStore();

  if (!candidateList) {
    return "Loading Candidates!";
  }

  return (
    <div className="border-black">
      <div>
        <div className="text-lg p-2 border-b border-black">
          Most recommended
        </div>
        <div className="bg-muted px-4">
          {candidateList.map((candidate) => (
            <div
              key={candidate.id}
              className="flex justify-between items-center border-b border-border py-2"
            >
              <Avatar name={candidate.name} size={24} variant="bauhaus" />
              <div className="text-muted-foreground text-xs font-bold">
                {candidate.name}
              </div>
              {(() => {
                const exist = candidateListId.includes(candidate.id);

                if (exist) {
                  return (
                    <MinusCircle
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeCandidate(candidate.id)}
                    />
                  );
                }

                return (
                  <PlusCircle
                    className="text-purple-400 cursor-pointer"
                    onClick={() => addCandidate(candidate.id)}
                  />
                );
              })()}
            </div>
          ))}
          <div className="text-xs text-muted-foreground py-2">
            Recommendations are based on your skill requirements and
            candidate&apos;s performance
          </div>
        </div>
      </div>
      <div className="h-8 border-t border-black" />
    </div>
  );
};

export default Sidebar;
