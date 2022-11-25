<script setup lang="ts">
import { useOrderStore, orderTypes } from "@/stores/orders";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const store = useOrderStore();
const { updateOrdersToList, moveToNextStep, getNextStep, goToAdd } = store;
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
    <div class="p-2 sm:p-8">
        <div class="flex flex-row gap-5 items-center mb-8">
            <img src="@/assets/hamburger.png" class="w-3 h-3" />
            <span class="font-sfprodisplaybold text-xl">{{
                orderTypes[$route.params.orderType.toString()].header
            }}</span>
        </div>
        <div class="pb-8 border-b border-navbar mb-8 flex justify-end">
            <button class="bg-primary text-white p-2 rounded" @click="goToAdd">
                Add Order
            </button>
        </div>
        <div class="flex flex-col-reverse gap-5" v-if="ordersToList.length">
            <div
                class="border border-navbar rounded-xl p-5"
                v-for="order in ordersToList"
                :key="order.orderNumber"
            >
                <div
                    class="flex flex-col sm:flex-row gap-2 justify-between flex-wrap"
                >
                    <div
                        class="flex flex-col sm:w-1/6 text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                        <span class="text-darkGray">Order Number</span>
                        <span>{{ "#" + order.orderNumber }}</span>
                    </div>
                    <div
                        class="flex flex-col sm:w-1/6 text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                        <span class="text-darkGray">Date & Time</span>
                        <span>{{ order.date }}</span>
                    </div>
                    <div
                        class="flex flex-col sm:w-1/6 text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                        <span class="text-darkGray">Name</span>
                        <span>{{ order.name }}</span>
                    </div>
                    <div
                        class="flex flex-col sm:w-1/6 text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                        <span class="text-darkGray">Contact</span>
                        <span>{{ order.contact }}</span>
                    </div>
                    <div
                        class="flex flex-col sm:w-1/6 text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                        <span class="text-darkGray">Trans Type</span>
                        <span
                            class="first-letter:uppercase p-1 rounded text-center text-white w-fit sm:w-1/2"
                            :class="[
                                order.transferType === 'delivery'
                                    ? 'bg-primary'
                                    : 'bg-orange',
                            ]"
                            >{{ order.transferType }}</span
                        >
                    </div>
                    <div class="flex flex-col">
                        <span class="text-darkGray">Amount</span>
                        <span>{{ "$" + order.total }}</span>
                    </div>
                </div>
                <div class="flex flex-row gap-3 items-center mt-10 flex-wrap">
                    <span class="text-darkGray">Ordered Items</span>
                    <span
                        v-for="(orderedItem, index) in order.items"
                        :key="index"
                        class="bg-buttons p-2"
                    >
                        {{ orderedItem.name + " X" + orderedItem.count }}
                    </span>
                </div>
                <div
                    class="flex flex-col sm:flex-row justify-between items-end mt-10"
                >
                    <div class="flex flex-col gap-1">
                        <span class="text-darkGray"
                            >Additional Information from Customer</span
                        >
                        <p>{{ order.message }}</p>
                    </div>
                    <button
                        class="bg-primary text-white px-1 py-2 rounded mt-5 sm:mt-0"
                        @click="moveToNextStep(order.orderNumber)"
                    >
                        Move to
                        {{ getNextStep($route.params.orderType.toString()) }}
                    </button>
                </div>
            </div>
        </div>
        <span v-else>No Orders to List</span>
    </div>
</template>
