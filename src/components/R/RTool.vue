<script>
import {ref, watch} from "vue";
import {useStore} from "vuex";

export default {
    name: "RTool",
    components: {},
    props: {
        r: {
            type: Object,
            required: true
        },
        i: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const store = useStore();
        const value = ref(props.r.r);

        watch(() => value.value, (value) => {
            store.commit("updateR", { index: props.i, value})
        });
        return {
            value,
        }
    }
};
</script>

<template>
    <div class="RTool">
        <input
            @update="update"
            v-model="value" type="number" step="0.01" />
    </div>
</template>

<style lang="scss">
.RTool {

    input {
        width: 36px;
        font-size: 11px;
        padding: 0;
    }
}
</style>
