import AddPageVue from "../../pages/AddPage.vue";

describe("AddPageVue", () => {
    it("Checks App", () => {
        cy.mount(AddPageVue);
        cy.get('[data-cy="addHeader"]').should("have.text", "Create Order");
    });
});
