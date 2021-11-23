<script>
import VueApexCharts from "vue3-apexcharts";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Infections",
  components: { apexchart: VueApexCharts },
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
            categories: store.getters.timeline.map((o) => {
              const date = o.date.split("-");
              return date[2] + "/" + date[1];
            }),
            tickAmount: 5,
          },
          yaxis: {
            min: 15000,
            max: 30000,
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
            name: "Infecties",
            data: store.getters.timeline.map((o) => o.infections),
          },
        ],
      };
    });
    return { graph };
  },
};
</script>

<template>
  <div class="Occupation">
    <h3>Infecties</h3>
    <apexchart
      width="600"
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
