<script>
import VueApexCharts from "vue3-apexcharts";
import {computed} from "vue";
import {useStore} from "vuex";
import {dateToLabel} from "../../utils/date";

export default {
    name: "Occupation",
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
                        id: "ic-bezetting",
                        animations: {
                            enabled: false,
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    xaxis: {
                        categories: store.getters.timeline.map((o) => dateToLabel(o.date)),
                        tickAmount: 5,
                    },
                    yaxis: {
                        labels: {
                            offsetX: -10,
                        },
                    },
                    annotations: {
                        yaxis: [
                            {
                                y: 650,
                                y2: 2500,
                                borderColor: '#000',
                                fillColor: '#000'
                            }
                        ],
                        xaxis: [
                            {
                                x: "20/07",
                                x2: "17/08",
                                borderColor: "#000",
                                label: {
                                    style: {
                                        color: '#008ffb',
                                    },
                                    text: '2. Overschatting model Dansen met Janssen',
                                }
                            },
                            {
                                x: "22/08",
                                x2: "27/09",
                                borderColor: "#000",
                                label: {
                                    style: {
                                        color: '#ff6178',
                                    },
                                    text: '3. Verlaat effect Dansen met Janssen',
                                    // orientation: 'horizontal',
                                }
                            },
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
                        name: "IC bezetting [model]",
                        data: store.getters.timeline.map((o) => o.occupation),
                    },
                    {
                        name: "IC instroom [model]",
                        data: store.getters.timeline.map((o) => o.icIn),
                    },
                    {
                        name: "IC uitstroom [model]",
                        data: store.getters.timeline.map((o) => o.icOut),
                    },
                    {
                        name: "IC bezetting [werkelijk]",
                        data: store.state.realOccupation.map((o) => o.occupation),
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
        <h3>IC-bezetting</h3>
        <apexchart
            width="1000"
            height="400"
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
