import { Line } from "react-chartjs-2"
import { GiniResult } from "./Core"

const NORMAL = ["#FF638400", "#36A2EB00"]
const HOVER = ["#FF63849F", "#36A2EB9F"]

export default function GiniChart(props: { gini: GiniResult }) {
    return (
        <Line
            datasetIdKey='gini-chart'
            plugins={[{
                id: "hover",
                afterDatasetDraw(chart, args, pluginOptions) {
                    const elements = chart.getActiveElements()

                    if (elements.length > 0) {
                        elements.forEach(e => chart.data.datasets[e.datasetIndex].backgroundColor = HOVER[e.datasetIndex])
                    }
                    else {
                        chart.data.datasets.forEach((e, i) => e.backgroundColor = NORMAL[i])
                    }

                    chart.update()
                },
            }]}
            options={{
                interaction: {
                    mode: "nearest",
                    intersect: false,
                },
                scales: {
                    x: {
                        position: "left",
                        axis: "x",
                        title: {
                            display: true,
                            align: "center",
                            text: "Anteil der statistischen Guppen (in %)",
                            font: {
                                size: 14
                            }
                        }
                    },
                    y: {
                        position: "left",
                        axis: "y",
                        title: {
                            display: true,
                            align: "center",
                            text: "Anteil des Einkommens",
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        font: {
                            size: 20
                        },
                        text: "Einkommensverteilung",
                    }
                }
            }}
            data={{
                labels: props.gini.groupDist.map(e => e * 100),
                datasets: [
                    {
                        label: 'ideale Gleichverteilung',
                        data: props.gini.groupDist,
                        borderColor: '#FF6384',
                        backgroundColor: '#FF63842F',
                        fill: 1,
                    },
                    {
                        label: 'Lorenzkurve',
                        data: props.gini.incomeDist,
                        borderColor: '#36A2EB',
                        backgroundColor: '#36A2EB2f',
                        fill: "origin"
                    },
                ],
            }}
        />
    )
}