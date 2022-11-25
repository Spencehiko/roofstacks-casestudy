<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useOrderStore, orderTypes } from "@/stores/orders";

const store = useOrderStore();
const { getOrderCountByStatus } = store;
</script>

<template>
    <div
        class="flex flex-row min-h-screen font-sfprodisplay bg-app overflow-x-hidden"
    >
        <div class="hidden md:flex flex-col gap-5 w-20 items-center bg-logos">
            <div class="p-2 w-full">
                <img src="@/assets/logo.png" alt="Logo" />
            </div>
            <div class="p-2 bg-navbar w-full sm:p-5">
                <img src="@/assets/order.png" alt="Order" />
            </div>
            <div class="p-2 w-full sm:p-5">
                <img src="@/assets/folder.png" alt="Folder" />
            </div>
            <div class="p-2 w-full sm:p-5">
                <img src="@/assets/gear.png" alt="Gear" />
            </div>
        </div>
        <nav
            class="p-1 sm:p-5 flex flex-col gap-5 w-44 bg-navbar border border-navbar overflow-hidden"
        >
            <span class="mb-2 text-2xl font-bold">Orders</span>
            <RouterLink to="/" active-class="text-active">New Order</RouterLink>
            <div
                v-for="(order, orderLink, index) in orderTypes"
                :key="index"
                class="flex flex-row justify-between w-full"
            >
                <RouterLink
                    :to="'/orders/' + orderLink"
                    active-class="text-active"
                    class="text-ellipsis overflow-hidden whitespace-nowrap"
                    >{{ order.header }}</RouterLink
                >
                <span class="text-lightGray">{{
                    getOrderCountByStatus(orderLink.toString())
                }}</span>
            </div>
        </nav>
        <RouterView class="w-full" />
    </div>
</template>
