import { HeatMap } from "@nivo/heatmap";

const Heatmap = ({ data }) => {
  return (
    <HeatMap
      height={Math.max(200, 100 * data.length)}
      width={800}
      data={data}
      margin={{ top: 120, right: 0, bottom: 0, left: 180 }}
      valueFormat=">-.2s"
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
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
        colors: ["#daeddd", "#1b4a23"], // color range
        minValue: 0,
        maxValue: 10,
      }}
      emptyColor="#555555"
    />
  );
};

export default Heatmap;
