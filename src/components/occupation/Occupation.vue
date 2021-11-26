<script>
import VueApexCharts from "vue3-apexcharts";
import {computed} from "vue";
import {useStore} from "vuex";

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
                        categories: store.getters.timeline.map((o) => {
                            const date = o.date.split("-");
                            return date[2] + "/" + date[1];
                        }),
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
                                borderColor: '#000',
                            }
                        ]
                    }
                },
                series: [
                    {
                        name: "IC bezetting",
                        data: store.getters.timeline.map((o) => o.occupation),
                    },
                    {
                        name: "IC instroom",
                        data: store.getters.timeline.map((o) => o.icIn),
                    },
                    {
                        name: "IC uitstroom",
                        data: store.getters.timeline.map((o) => o.icOut),
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
