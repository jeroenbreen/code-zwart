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
            return store.state.rTimeline.filter((w) => !w.measured);
        });

        return {
            rNotMeasured,
        };
    },
};
</script>

<template>
    <div class="RTools">
        <RTool v-for="(r, index) in rNotMeasured" :key="index" :i="index" :r="r"/>
    </div>
</template>

<style lang="scss">
.RTools {
    padding-left: 36px;
    display: flex;
    flex-wrap: wrap;
}
</style>
