<script>
import RGraph from "./RGraph";
import RTools from "./RTools";

export default {
  name: "R",
  components: { RTools, RGraph },
  props: {},
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="R">
    <h3>Reproductiegetal</h3>
    <RGraph />
    <RTools />
  </div>
</template>

<style lang="scss">
.R {
}
</style>
