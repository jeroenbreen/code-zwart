<script>
import VueApexCharts from "vue3-apexcharts";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "RGraph",
  components: { apexchart: VueApexCharts },
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
            categories: store.state.r.map((r) => {
              return r.label;
            }),
          },
          tooltip: {
            enabled: false,
          },
          yaxis: {
            min: 0.5,
            max: 1.3,
            labels: {
              offsetX: -10,
            },
          },
          stroke: {
            curve: "smooth",
          },
        },
        series: [
          {
            name: "Reproductie-getal",
            data: store.state.r.map((r) => r.r),
          },
        ],
      };
    });
    return { graph };
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
