<script>
import { ref, watch} from "vue";
import {useStore} from "vuex";

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
                store.commit("updateR", {index: props.i, value});
            }
        );

        return {
            value,
        };
    },
};
</script>

<template>
    <div class="RTool">
        <div class="RTool__label">
            {{r.date}}
        </div>
        <input @update="update" v-model="value" type="number" step="0.01"/>
    </div>
</template>

<style lang="scss">
.RTool {
    width: 130px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    &__label {
        margin-right: 4px;
        font-size: 10px;
        white-space: nowrap;
    }

    input {
        width: 50px;
        border-radius: 0;
    }
}
</style>
