<script>
import VueApexCharts from "vue3-apexcharts";
import {computed} from "vue";
import {useStore} from "vuex";
import {dateToLabel} from "../../utils/date";
// import { getWeek } from "date-fns";

export default {
    name: "RGraph",
    components: {apexchart: VueApexCharts},
    props: {},
    setup() {
        const store = useStore();

        const graph = computed(() => {
            return {
                options: {
                    chart: {
                        id: "r",
                        animations: {
                            enabled: false,
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    grid: {
                        show: false,
                        padding: {
                            left: 0,
                            right: 0,
                        },
                    },
                    xaxis: {
                        categories: store.getters.timeline.map((o) => {
                            return dateToLabel(o.date);
                        }),
                        tickAmount: 5,
                    },
                    tooltip: {
                        // enabled: false,
                    },
                    yaxis: {
                        min: 0.6,
                        max: 2,
                        labels: {
                            offsetX: -10,
                        },
                    },
                    annotations: {
                        yaxis: [
                            {
                                y: 1,
                                borderColor: '#000',
                            }
                        ],
                        xaxis: [
                            {
                                x: store.state.todayLabel,
                                borderColor: '#000',
                                label: {
                                    style: {
                                        color: '#000',
                                    },
                                    text: 'Heden'
                                }
                            }
                        ]
                    }
                },
                series: [
                    {
                        name: "Reproductie-getal",
                        data: store.getters.timeline.map((o) => {
                            return o.r;
                        }),
                        color: "#000"
                    },
                ],
            };
        });
        return {graph};
    },
};
</script>

<template>
    <div class="Rgraph">
        <apexchart
            width="1000"
            height="250"
            type="line"
            :options="graph.options"
            :series="graph.series"
        ></apexchart>
    </div>
</template>

<style lang="scss">
.Rgraph {
}
</style>
