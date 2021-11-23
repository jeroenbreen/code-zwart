<script>
import VueApexCharts from "vue3-apexcharts";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "RGraph",
    components: { apexchart: VueApexCharts, },
    props: {},
    setup() {
        const store = useStore();

        console.log(store.state.r);

        const graph = computed(() => {
            return {
                options: {
                    chart: {
                        id: "r",
                        toolbar: {
                            show: false
                        }
                    },
                    grid: {
                        show: false,
                    },
                    xaxis: {
                        categories: store.state.r.map(r => r.date),
                    },
                    tooltip: {
                        enabled: false
                    },
                    yaxis: {
                        min: 0,
                        max: 1.5,
                    },
                    stroke: {
                        curve: 'smooth',
                    }
                },
                series: [
                    {
                        name: "Reproductie-getal",
                        data: store.state.r.map(r => r.r),
                    },
                ]
            }
        })
        return { graph }
    },
};
</script>

<template>
    <div class="Rgraph">
        <apexchart
            width="500"
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
