import { defineStore } from "pinia";

interface orderType {
    header: String;
}

interface Order {
    orderNumber: number;
    date: String;
    name: String;
    contact: String;
    transferType: "delivery" | "takeaway";
    message: any; // because of textarea
    items?: OrderItem[];
    total?: number;
    status?: "accepted" | "cooking" | "parcelReady" | "delivered" | "completed";
}

interface OrderItem {
    id: number;
    name: string;
    price: number;
    count: number;
}

export const orderTypes = {
    accepted: {
        header: "Accepted",
    },
    cooking: {
        header: "Cooking",
    },
    parcelReady: {
        header: "Parcel Ready",
    },
    delivered: {
        header: "Delivered",
    },
    completed: {
        header: "Completed",
    },
} as {
    [key: string]: orderType;
};

export const orderItems = [
    {
        id: 1,
        name: "Beef Stroganoff",
        price: 29,
    },
    {
        id: 2,
        name: "Reuben",
        price: 22,
    },
    {
        id: 3,
        name: "Sandwich",
        price: 8,
    },
    {
        id: 4,
        name: "Walford Salad",
        price: 30,
    },
    {
        id: 5,
        name: "French Fries",
        price: 5,
    },
    {
        id: 6,
        name: "Caesar Salad",
        price: 26,
    },
    {
        id: 7,
        name: "Chicken a la King",
        price: 20,
    },
    {
        id: 8,
        name: "Lobster Newburg",
        price: 40,
    },
    {
        id: 9,
        name: "Salisbury Steak",
        price: 32,
    },
    {
        id: 10,
        name: "Turkish Doner",
        price: 30,
    },
    {
        id: 11,
        name: "Spagetti & Meatballs",
        price: 18,
    },
    {
        id: 12,
        name: "Papad",
        price: 25,
    },
    {
        id: 13,
        name: "Sushi Rolls (x6)",
        price: 24,
    },
    {
        id: 14,
        name: "Sushi Rolls (x10)",
        price: 36,
    },
    {
        id: 15,
        name: "Margherita Pizza",
        price: 20,
    },
] as OrderItem[];

export const useOrderStore = defineStore({
    id: "orders",
    state: () => ({
        orders: [] as Order[],
        inputFields: {
            orderNumber: -1,
            date: "",
            name: "",
            contact: "",
            transferType: "delivery",
            message: "",
        } as Order,
        addedItemIds: [] as number[],
        addedItems: [] as {
            id: number;
            name: string;
            count: number;
            price: number;
        }[],
        ordersToList: [] as Order[],
        orderByPage: 10 as number,
    }),
    actions: {
        /* Routing */
        goToAdd() {
            // @ts-ignore
            this.router.push({ path: "/" });
        },
        /* Add */
        addNewItem(itemId: number): void {
            const { name, price } = this.getItemNameAndPrice(itemId);
            this.addedItems.push({
                id: itemId,
                name,
                count: 1,
                price,
            });
        },
        addOrder() {
            const newOrder: Order = JSON.parse(
                JSON.stringify(this.inputFields)
            );
            newOrder.items = JSON.parse(JSON.stringify(this.addedItems));
            newOrder.total = this.totalPrice;
            newOrder.status = "accepted";
            this.orders.push(newOrder);
            console.log(this.orders);
            // @ts-ignore
            this.router.push({ path: "/orders/accepted" });
        },
        /* Remove */
        removeItem(itemId: number): void {
            const index = this.addedItems.findIndex((addedItem: any) => {
                return addedItem.id === itemId;
            });
            this.addedItems.splice(index, 1);
            if (this.addedItemIds.includes(itemId)) {
                this.addedItemIds.splice(this.addedItemIds.indexOf(itemId), 1);
            }
        },
        /* Get */
        getItemNameAndPrice(itemId: number): { name: string; price: number } {
            const index = orderItems.findIndex((item) => item.id === itemId);

            return {
                name: orderItems[index].name,
                price: orderItems[index].price,
            };
        },
        getOrderCountByStatus(status: string): number {
            return this.orders.filter((order: Order) => order.status === status)
                .length;
        },
        getNextStep(currentStatus: string) {
            let stringToReturn: string = "";
            switch (currentStatus) {
                case "accepted":
                    stringToReturn = "Cooking";
                    break;
                case "cooking":
                    stringToReturn = "Parcel Ready";
                    break;
                case "parcelReady":
                    stringToReturn = "Delivered";
                    break;
                case "delivered":
                    stringToReturn = "Completed";
                    break;
            }
            return stringToReturn;
        },
        isNotAlreadyAdded(itemId: number): boolean {
            return this.addedItemIds.includes(itemId);
        },
        /* Update */
        updateOrdersToList(status: string) {
            this.ordersToList = this.orders.filter(
                (order: Order) => order.status === status
            );
            if (this.orderByPage < this.ordersToList.length) {
                this.ordersToList = this.ordersToList.slice(
                    this.ordersToList.length - this.orderByPage
                );
            }
        },
        changeOrderByPage(count: number, status: string) {
            this.orderByPage = count;
            this.updateOrdersToList(status);
        },
        /* Item Count */
        decreaseCount(itemId: number) {
            const index = this.addedItems.findIndex((addedItem: any) => {
                return addedItem.id === itemId;
            });
            if (this.addedItems[index].count === 1) {
                this.removeItem(itemId);
            } else {
                this.addedItems[index].count--;
            }
        },
        increaseCount(itemId: number) {
            const index = this.addedItems.findIndex((addedItem: any) => {
                return addedItem.id === itemId;
            });
            this.addedItems[index].count++;
        },
        /* Move to Next Step */
        moveToNextStep(orderNumber: number) {
            const index = this.orders.findIndex(
                (order: Order) => order.orderNumber === orderNumber
            );
            const currentStatus = this.orders[index].status;
            switch (currentStatus) {
                case "accepted":
                    this.orders[index].status = "cooking";
                    break;
                case "cooking":
                    this.orders[index].status = "parcelReady";
                    break;
                case "parcelReady":
                    this.orders[index].status = "delivered";
                    break;
                case "delivered":
                    this.orders[index].status = "completed";
                    break;
            }
            this.updateOrdersToList(currentStatus || "accepted");
        },
    },
    getters: {
        lastOrderNumber(): number {
            if (!this.orders.length) return 12345;
            return this.orders[this.orders.length - 1].orderNumber + 1;
        },
        currentDateAndTime(): string {
            const date = new Date();
            const year = date.getFullYear();
            const month =
                date.getMonth() + 1 >= 10
                    ? date.getMonth() + 1
                    : "0" + date.getMonth() + 1;
            const day =
                date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
            const hours =
                date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
            const minutes =
                date.getMinutes() >= 10
                    ? date.getMinutes()
                    : "0" + date.getMinutes();
            const ampm = hours >= 12 ? " PM" : " AM";

            return (
                day +
                "/" +
                month +
                "/" +
                year +
                " at " +
                hours +
                ":" +
                minutes +
                ampm
            );
        },
        totalPrice(): number {
            let price = 0;
            this.addedItems.forEach((addedItem: any) => {
                price += addedItem.price * addedItem.count;
            });
            return price;
        },
        isAddButtonDisabled(): boolean {
            if (
                this.addedItemIds.length === 0 ||
                this.inputFields.name.trim() === "" ||
                this.inputFields.contact.trim() === ""
            )
                return true;
            return false;
        },
    },
    persist: true,
});
