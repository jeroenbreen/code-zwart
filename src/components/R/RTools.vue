<script>
import RTool from "./RTool";
import {computed} from "vue";
import {useStore} from "vuex";

export default {
    name: "RTools",
    components: {RTool},
    props: {},
    setup() {
        const store = useStore();
        const rNotMeasured = computed(() => {
            return store.state.r.filter(r => !r.measured);
        })

        const rMeasured = computed(() => {
            return store.state.r.filter(r => r.measured);
        })
        return {
            rNotMeasured,
            rMeasured
        }
    }
};
</script>

<template>
    <div class="RTools">
        <div
            :style="{'width': (rMeasured.length * 40) + 'px'}"
            class="spacer" />
        <RTool
            v-for="(r, index) in rNotMeasured"
            :key="index"
            :i="index"
            :r="r"/>
    </div>
</template>

<style lang="scss">
.RTools {
    padding-left: 45px;
    display: flex;
}
</style>
