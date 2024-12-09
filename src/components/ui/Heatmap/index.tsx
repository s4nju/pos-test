import { HeatMap } from "@nivo/heatmap";

const HeatmapComponent = ({ data }) => {
  return (
    <HeatMap
      enableLabels={false}
      height={data.length === 1 ? 160 : 120 + 40 * data.length}
      enableGridX
      enableGridY
      width={data[0].data.length === 1 ? 280 : 230 + 50 * data[0].data.length}
      data={data}
      margin={{ top: 80, right: 80, bottom: 0, left: 160 }}
      valueFormat=">-.2s"
      xInnerPadding={0.15}
      yInnerPadding={0.15}
      axisTop={{ tickRotation: -30, legendOffset: 46, }}
      colors={{
        type: "quantize",
        domain: [0, 10],
        colors: ["#f2f2f2", "#F9F7AC", "#A5D46E", "#1A9739", "#003E0B"], // color range 
      }}
      emptyColor="#555555"
    />
  );
};

export default HeatmapComponent;
