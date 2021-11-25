<script>
import {computed, ref, watch} from "vue";
import { useStore } from "vuex";

export default {
  name: "RTool",
  components: {},
  props: {
    r: {
      type: Object,
      required: true,
    },
    i: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const value = ref(props.r.r);

    watch(
      () => value.value,
      (value) => {
        store.commit("updateR", { index: props.i, value });
      }
    );

    return {
      value,
        width: computed(() => "calc(100% / " + store.state.weeksModeled + ")")
    };
  },
};
</script>

<template>
  <div
      :style="{'width': width}"
      class="RTool">
    <input @update="update" v-model="value" type="number" step="0.01" />
  </div>
</template>

<style lang="scss">
.RTool {
  margin-left: -1px;
  input {
    width: 100%;
    border-radius: 0;
  }
}
</style>
