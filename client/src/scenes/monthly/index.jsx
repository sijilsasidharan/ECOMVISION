import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@emotion/react';
import { useGetSalesQuery } from 'states/api';
import Header from 'components/Header';
import "react-datepicker/dist/react-datepicker.css";
import { Box } from '@mui/material';

const Monthly = () => {
    const theme = useTheme();
    const { data } = useGetSalesQuery();
     const [formattedData] = useMemo(() => {
        if (!data) return [];

        const { monthlyData } = data;
        const totalSalesLine = {
            id: 'totalSales',
            color: theme.palette.secondary.main,
            data: []
        };
        const totalUnitsLine = {
            id: 'totalUnits',
            color: theme.palette.secondary[700],
            data: []
        };
        monthlyData.forEach(({ month, totalSales, totalUnits }) => {
            totalSalesLine.data = [
                ...totalSalesLine.data,
                { x: month, y: totalSales }
            ];
            totalUnitsLine.data = [
                ...totalUnitsLine.data,
                { x: month, y: totalUnits }
            ];
        });

        const formattedData = [ totalSalesLine, totalUnitsLine ];
        return [formattedData];
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [data]);
  return (
    <Box m=" 1.5rem 2.5rem">
        <Header title="Daily" subtitle="Chart of daily sales" />
        <Box height="75vh">
            {data ? 
                <ResponsiveLine
                    data={formattedData }
                    
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: theme.palette.secondary[200]
                                }
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.secondary[200]
                                }
                            },
                            ticks: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: theme.palette.secondary[200]
                                }
                            },
                        },
                        legends: {
                            text: {
                                fill: theme.palette.secondary[200]
                            }
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.primary.main
                            }
                        }
                    }}
                    colors={{ datum: "color"}}
                    margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false
                    }}
                    yFormat=" >-.2f"
                    curve='catmullRom'
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        format: (v) => v.slice(0, 3),
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 90,
                        legend: 'Month',
                        legendOffset: 60,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: `Total`,
                        legendOffset: -50,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'top-right',
                            direction: 'column',
                            justify: false,
                            translateX: 50,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: theme.palette.secondary[900],
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ] }
                />: <>Loading...</>}
        </Box>
    </Box>
  )
}

export default Monthly