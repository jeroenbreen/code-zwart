<script>
import {useStore} from "vuex";
import {ref, watch} from "vue";

export default {
    name: "Tools",
    components: {},
    props: {},
    setup() {
        const store = useStore();

        const daysBeforeHospitalization = ref(
            store.state.daysBeforeHospitalization
        );
        const lengthOfStay = ref(store.state.lengthOfStay);
        const icPercentage = ref(store.state.icPercentage);
        const weeksModeled = ref(store.state.weeksModeled);

        watch(
            () => daysBeforeHospitalization.value,
            (value) => {
                store.commit("setProperty", {
                    key: "daysBeforeHospitalization",
                    value,
                });
            }
        );

        watch(
            () => lengthOfStay.value,
            (value) => {
                store.commit("setProperty", {key: "lengthOfStay", value});
            }
        );

        watch(
            () => icPercentage.value,
            (value) => {
                store.commit("setProperty", {key: "icPercentage", value});
            }
        );

        watch(
            () => weeksModeled.value,
            (value) => {
                store.commit("setProperty", {key: "weeksModeled", value});
            }
        );

        return {
            weeksModeled,
            daysBeforeHospitalization,
            lengthOfStay,
            icPercentage,
        };
    },
};
</script>

<template>
    <div class="Tools">
        <div class="Tools__set">
            <div class="Tools__label">Dagen tot IC opname</div>
<!--            <input v-model="daysBeforeHospitalization" type="number" min="0"/>-->
            {{daysBeforeHospitalization}}
        </div>
        <div class="Tools__set">
            <div class="Tools__label">Ligduur</div>
<!--            <input v-model="lengthOfStay" type="number" min="0"/>-->
            {{lengthOfStay}}
        </div>
        <div class="Tools__set">
            <div class="Tools__label">Percentage besmettingen naar IC</div>
<!--            <input v-model="icPercentage" type="number" step="0.01" min="0"/>-->
            {{icPercentage}}
        </div>
    </div>
</template>

<style lang="scss">
.Tools {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;

    &__set {
        display: flex;
        align-items: center;
        padding: 12px 0;
    }

    &__label {
        width: 200px;
    }

    input {
        padding: 8px;
        background: #ddd;
        border: 0;
    }
}
</style>
