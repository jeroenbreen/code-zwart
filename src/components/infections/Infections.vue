<script>
import VueApexCharts from "vue3-apexcharts";
import {computed} from "vue";
import {useStore} from "vuex";
import {dateToLabel} from "../../utils/date";

export default {
    name: "Infections",
    components: {apexchart: VueApexCharts},
    props: {},
    setup() {
        const store = useStore();

        const graph = computed(() => {
            return {
                options: {
                    grid: {
                        padding: {
                            left: 0,
                            right: 0,
                        },
                    },
                    chart: {
                        id: "infections",
                        animations: {
                            enabled: false,
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    xaxis: {
                        categories: store.getters.timeline.map((i) => dateToLabel(i.date)),
                        tickAmount: 5,
                    },
                    yaxis: {
                        min: 0,
                        max: 30000,
                        labels: {
                            offsetX: -10,
                        },
                    },
                    stroke: {
                        curve: "smooth",
                    },
                    annotations: {
                        xaxis: [
                            {
                                x: "16/07",
                                borderColor: '#000',
                                label: {
                                    style: {
                                        color: '#ff6178',
                                    },
                                    text: '1. Dansen met Janssen'
                                }
                            }, {
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
                        name: "Infecties [werkelijk]",
                        data: store.getters.timeline.map((i) => {
                            return !i.modeled ? i.infections : null
                        }),
                        color: "#ff6178"
                    },
                    {
                        name: "Infecties [model]",
                        data: store.getters.timeline.map((i) => {
                            return i.modeled ? i.infections : null
                        }),
                        color: "#008ffb"
                    },
                ],
            };
        });
        return {graph};
    },
};
</script>

<template>
    <div class="Occupation">
        <h3>Infecties</h3>
        <apexchart
            width="1000"
            height="300"
            type="line"
            :options="graph.options"
            :series="graph.series"
        ></apexchart>
    </div>
</template>

<style lang="scss">
.Occupation {
}
</style>
