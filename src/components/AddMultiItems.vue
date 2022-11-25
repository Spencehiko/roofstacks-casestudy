<script setup lang="ts">
import { useOrderStore, orderItems } from "@/stores/orders";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useOrderStore();
const {
    addNewItem,
    removeItem,
    isNotAlreadyAdded,
    decreaseCount,
    increaseCount,
} = store;
const { addedItemIds, addedItems } = storeToRefs(store);

const isItemsMenuOpen = ref(false);
const toggleItemsMenu = () => {
    isItemsMenuOpen.value = !isItemsMenuOpen.value;
};
const toggleItem = (itemId: number) => {
    if (isNotAlreadyAdded(itemId)) {
        addNewItem(itemId);
    } else {
        removeItem(itemId);
    }
};
</script>

<template>
    <div>
        <button
            class="px-5 py-1 outline-none border-2 border-navbar rounded-md flex flex-row justify-between items-center cursor-pointer w-full"
            @click="toggleItemsMenu"
            data-cy="inputItems"
        >
            <span v-if="addedItemIds.length === 0"> Select Items </span>
            <span v-else>
                {{
                    addedItemIds.length +
                    " Meal" +
                    (addedItemIds.length > 1 ? "s" : "") +
                    " Selected"
                }}
            </span>
            <img
                src="@/assets/chevron-down.png"
                class="w-4 h-3"
                :class="{ ' rotate-180': isItemsMenuOpen }"
            />
        </button>
        <div
            v-if="isItemsMenuOpen"
            class="border border-navbar rounded-md px-5 py-1"
        >
            <div
                class="flex flex-row"
                v-for="orderItem in orderItems"
                :key="orderItem.id"
            >
                <input
                    type="checkbox"
                    v-model="addedItemIds"
                    :value="orderItem.id"
                    :id="orderItem.id.toString()"
                    @change="toggleItem(orderItem.id)"
                />
                <label :for="orderItem.id.toString()">{{
                    orderItem.name + " ($" + orderItem.price + ")"
                }}</label>
            </div>
        </div>
        <div v-if="addedItemIds.length !== 0 && !isItemsMenuOpen">
            <div
                class="flex flex-row justify-between mt-2"
                v-for="addedItem in addedItems"
                :key="addedItem.id"
            >
                <span
                    class="w-full max-w-33perc sm:max-w-200 text-ellipsis overflow-hidden whitespace-nowrap"
                    >{{ addedItem.name }}</span
                >
                <div class="flex flex-row gap-2 sm:gap-6">
                    <span>{{ "$" + addedItem.price * addedItem.count }}</span>
                    <div
                        class="flex flex-row gap-3 px-3 border border-blue-500 rounded-full w-20 justify-between"
                    >
                        <button
                            @click="decreaseCount(addedItem.id)"
                            data-cy="decreaseButton"
                        >
                            -
                        </button>
                        <span>{{ addedItem.count }}</span>
                        <button
                            :disabled="addedItem.count === 9"
                            @click="increaseCount(addedItem.id)"
                            class="disabled:cursor-not-allowed"
                            data-cy="increaseButton"
                        >
                            +
                        </button>
                    </div>
                    <button
                        class="text-lightGray"
                        @click="removeItem(addedItem.id)"
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
