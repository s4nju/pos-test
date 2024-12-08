import { HeatMap } from "@nivo/heatmap";

const Heatmap = ({ data }) => {
  return (
    <HeatMap
      height={data.length === 1 ? 160 : 120 + 40 * data.length}
      enableGridX
      enableGridY
      width={920}
      data={data}
      margin={{ top: 120, right: 80, bottom: 0, left: 120 }}
      valueFormat=">-.2s"
      xInnerPadding={0.1}
      yInnerPadding={0.1}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -30,
        legend: "",
        legendOffset: 46,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -72,
        truncateTickAt: 0,
      }}
      colors={{
        type: "sequential",
        colors: ["#fff", "#134d22"], // color range
        minValue: 0,
        maxValue: 10,
      }}
      emptyColor="#555555"
    />
  );
};

export default Heatmap;
