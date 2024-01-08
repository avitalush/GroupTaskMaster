import React, { useEffect, useRef } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const options = {
        animationEnabled: true,
        title: {
          text: 'Project progress graph',
        },
        axisY: {
          title: 'amount of tasks',
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            type: 'spline',
            name: 'Creates',
            showInLegend: true,
            dataPoints: data.map(({ date, creates }) => ({
              y: creates,
              label: date,
            })),
          },
          {
            type: 'spline',
            name: 'Progresses',
            showInLegend: true,
            dataPoints: data.map(({ date, progresses }) => ({
              y: progresses,
              label: date,
            })),
          },
          {
            type: 'spline',
            name: 'Errors',
            showInLegend: true,
            dataPoints: data.map(({ date, errors }) => ({
              y: errors,
              label: date,
            })),
          },
          {
            type: 'spline',
            name: 'Dones',
            showInLegend: true,
            dataPoints: data.map(({ date, dones }) => ({
              y: dones,
              label: date,
            })),
          },
        ],
      };

      chartRef.current.render(options);
    }
  }, [data]);

  return <CanvasJSChart options={{}} onRef={(ref) => (chartRef.current = ref)} />;
};

export default ChartComponent;
