<script>
import VueApexCharts from "vue3-apexcharts";
import { computed } from "vue";
import { useStore } from "vuex";


export default {
    name: "Occupation",
    components: { apexchart: VueApexCharts, },
    props: {},
    setup() {
        const store = useStore();

        const graph = computed(() => {
            return {
                options: {
                    chart: {
                        id: "ic-bezetting",
                        toolbar: {
                            show: false
                        }
                    },
                    xaxis: {
                        categories: store.getters.occupation.map(o => o.date),
                    },
                },
                series: [
                    {
                        name: "IC bezetting",
                        data: store.getters.occupation.map(o => o.occupation),
                    },
                ]
            }
        })
        return { graph }
    },
};
</script>

<template>
    <div class="Occupation">
        <apexchart
            width="500"
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
