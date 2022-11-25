<script setup lang="ts">
import { useOrderStore, orderTypes } from "@/stores/orders";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const store = useOrderStore();
const { updateOrdersToList } = store;
const { ordersToList } = storeToRefs(store);

watch(
    () => route.params.orderType,
    (newValue) => {
        updateOrdersToList(newValue.toString());
    }
);

onMounted(() => {
    updateOrdersToList(route.params.orderType.toString());
});
</script>

<template>
    <main>
        <span class="font-bold">{{
            orderTypes[$route.params.orderType.toString()].header
        }}</span>
        {{ ordersToList }}
    </main>
</template>
