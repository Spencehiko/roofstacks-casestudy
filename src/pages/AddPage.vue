<script setup lang="ts">
import { useOrderStore } from "@/stores/orders";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import AddMultiItems from "../components/AddMultiItems.vue";

const store = useOrderStore();
const { lastOrderNumber, currentDateAndTime, addOrder } = store;
const {
    inputFields,
    addedItems,
    addedItemIds,
    totalPrice,
    isAddButtonDisabled,
} = storeToRefs(store);

onMounted(() => {
    /* RESET THE INPUTS */
    inputFields.value.date = currentDateAndTime;
    inputFields.value.orderNumber = lastOrderNumber;
    inputFields.value.name = "";
    inputFields.value.contact = "";
    inputFields.value.transferType = "delivery";
    inputFields.value.message = "";
    addedItems.value = [];
    addedItemIds.value = [];
});
</script>

<template>
    <div class="p-5">
        <div class="flex flex-row gap-5 items-center mb-8">
            <img src="@/assets/hamburger.png" class="w-3 h-3" />
            <span class="font-sfprodisplaybold text-xl">CREATE ORDER</span>
        </div>
        <div class="flex flex-row">
            <div class="flex flex-col gap-5 flex-1 border-r border-navbar pr-8">
                <div class="flex flex-row">
                    <span class="w-40 font-bold">Order Number:</span>
                    <span class="text-darkGray">{{
                        "#" + inputFields.orderNumber
                    }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="w-40 font-bold">Date & Time:</span>
                    <span class="text-darkGray">{{ inputFields.date }}</span>
                </div>
                <div class="flex flex-col gap-3">
                    <span class="font-bold"
                        >Name<span class="text-red-500">*</span></span
                    >
                    <input
                        type="text"
                        v-model="inputFields.name"
                        class="px-5 py-1 outline-none border-2 border-navbar rounded-md"
                    />
                </div>
                <div class="flex flex-col gap-3">
                    <span class="font-bold"
                        >Contact<span class="text-red-500">*</span></span
                    >
                    <input
                        type="text"
                        v-model="inputFields.contact"
                        class="px-5 py-1 outline-none border-2 border-navbar rounded-md"
                    />
                </div>
                <div class="flex flex-col gap-3">
                    <span class="font-bold">Trans Type</span>
                    <div class="flex flex-row gap-10">
                        <div class="flex flex-row gap-2">
                            <input
                                type="radio"
                                v-model="inputFields.transferType"
                                value="delivery"
                                id="delivery"
                            />
                            <label for="delivery"> Delivery </label>
                        </div>
                        <div class="flex flex-row gap-2">
                            <input
                                type="radio"
                                v-model="inputFields.transferType"
                                value="takeaway"
                                id="takeaway"
                            />
                            <label for="takeaway"> Takeaway </label>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-3">
                    <span class="font-bold">Message to client</span>
                    <textarea
                        v-model="inputFields.message"
                        class="px-5 py-1 outline-none border-2 border-navbar rounded-md"
                        rows="5"
                    ></textarea>
                </div>
                <div class="flex flex-col gap-3">
                    <span class="font-bold"
                        >Order Items<span class="text-red-500">*</span></span
                    >
                    <AddMultiItems />
                </div>
            </div>
            <div class="pl-8 flex-1">
                <div class="bg-navbar p-5 rounded-lg">
                    <span class="font-bold">Delivery Details</span>
                    <table class="w-full mt-3">
                        <tr>
                            <th class="text-left font-normal text-darkGray">
                                Order Item
                            </th>
                            <th class="font-normal text-darkGray">Count</th>
                            <th class="text-right font-normal text-darkGray">
                                Cost($)
                            </th>
                        </tr>
                        <tr v-for="addedItem in addedItems" :key="addedItem.id">
                            <td>{{ addedItem.name }}</td>
                            <td class="text-center">{{ addedItem.count }}</td>
                            <td class="text-right">
                                {{ addedItem.count * addedItem.price }}
                            </td>
                        </tr>
                    </table>
                </div>
                <div
                    class="flex flex-row justify-between bg-navbar p-5 rounded-lg mt-5 text-xl"
                >
                    <span class="font-bold">Total Amount:</span>
                    <span>{{ "$" + totalPrice }}</span>
                </div>
                <div class="flex flex-row justify-end mt-5">
                    <button
                        class="bg-addGreen text-white rounded w-1/2 py-2 text-xl transition-all duration-300 hover:bg-green-700 disabled:cursor-not-allowed"
                        :disabled="isAddButtonDisabled"
                        @click="addOrder"
                    >
                        Add Order
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
