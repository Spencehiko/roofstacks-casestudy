// https://docs.cypress.io/api/introduction/api.html

beforeEach(() => {
    cy.visit("/");
});
describe("Elements are rendered", () => {
    it("visits the app root url", () => {
        cy.get("span").contains("Orders");
        cy.get('[href="/"]').click();
        cy.get('[data-cy="addHeader"]').should("have.text", "Create Order");
        cy.get('[data-cy="firstOrderNumber"]').should("have.text", "#12345");
        cy.get('[data-cy="addButton"]').should("be.disabled");
    });
});

describe("Dropdown", () => {
    it("opens on click", () => {
        cy.get('[data-cy="inputItems"]').click();
        cy.get(".border > :nth-child(1) > label").should(
            "have.text",
            "Beef Stroganoff ($29)"
        );
        cy.get(":nth-child(15) > label").should(
            "have.text",
            "Margherita Pizza ($20)"
        );
    });
    it("adds meal, updates dropdown and total", () => {
        cy.get('[data-cy="inputItems"]').click();
        cy.get(".border > :nth-child(1) > label").click();
        cy.get('[data-cy="inputItems"]').click();
        cy.get(
            ":nth-child(7) > :nth-child(2) > :nth-child(2) > :nth-child(1) > .w-full"
        ).should("have.text", "Beef Stroganoff");
        cy.get('[data-cy="inputItems"] > span').should(
            "have.text",
            "1 Meal Selected"
        );
        cy.get("[data-cy=totalPrice]").should("have.text", "$29");
        cy.get('[data-cy="inputItems"]').click();
        cy.get(":nth-child(15) > label").click();
        cy.get('[data-cy="inputItems"]').click();
        cy.get(
            ":nth-child(2) > :nth-child(2) > :nth-child(2) > .w-full"
        ).should("have.text", "Margherita Pizza");
        cy.get('[data-cy="inputItems"] > span').should(
            "have.text",
            "2 Meals Selected"
        );
        cy.get("[data-cy=totalPrice]").should("have.text", "$49");
    });
});

describe("Button enable", () => {
    it("becomes enabled when required inputs are filled", () => {
        cy.get("[data-cy=inputName]").type("Automation Bro");
        cy.get("[data-cy=inputContact]").type("+90 500 000 00 00");
        cy.get('[data-cy="inputItems"]').click();
        cy.get(".border > :nth-child(1) > label").click();
        cy.get(":nth-child(15) > label").click();
        cy.get('[data-cy="inputItems"]').click();
        cy.get('[data-cy="addButton"]').should("not.be.disabled");
    });
});

describe("Increase and decrease item count", () => {
    it("can increase/decrease item counts", () => {
        cy.get('[data-cy="inputItems"]').click();
        cy.get(".border > :nth-child(1) > label").click();
        cy.get(".border > :nth-child(2) > label").click();
        cy.get(":nth-child(15) > label").click();
        cy.get('[data-cy="inputItems"]').click();
        cy.get(
            ':nth-child(1) > .gap-2 > .flex > [data-cy="increaseButton"]'
        ).click();
        cy.get(
            ':nth-child(1) > .gap-2 > .flex > [data-cy="increaseButton"]'
        ).click();
        cy.get(":nth-child(1) > .gap-2 > .flex > span").should(
            "have.text",
            "3"
        );
        cy.get(":nth-child(2) > .text-center").should("have.text", "3");
        cy.get("[data-cy=totalPrice]").should("have.text", "$129");
        cy.get(
            ':nth-child(1) > .gap-2 > .flex > [data-cy="decreaseButton"]'
        ).click();
        cy.get(":nth-child(1) > .gap-2 > .flex > span").should(
            "have.text",
            "2"
        );
        cy.get(":nth-child(2) > .text-center").should("have.text", "2");
        cy.get("[data-cy=totalPrice]").should("have.text", "$100");
    });
});
describe("Adds order successfuly", () => {
    beforeEach(() => {
        cy.get("[data-cy=inputName]").type("Automation Bro");
        cy.get("[data-cy=inputContact]").type("+90 500 000 00 00");
        cy.get('[data-cy="inputItems"]').click();
        cy.get(".border > :nth-child(1) > label").click();
        cy.get(":nth-child(15) > label").click();
        cy.get('[data-cy="inputItems"]').click();
        cy.get(
            ':nth-child(1) > .gap-2 > .flex > [data-cy="increaseButton"]'
        ).click();
        cy.get('[data-cy="addButton"]').click();
    });
    it("adds order and redirects to accepted page", () => {
        cy.on("url:changed", (newUrl) => {
            expect(newUrl).to.contain("/orders/accepted");
        });
    });
    it("can go back to add again", () => {
        cy.get("[data-cy=goBackButton]").click();
        cy.on("url:changed", (newUrl) => {
            expect(newUrl).to.contain("/");
        });
    });
    it("has the order in accepted orders page", () => {
        cy.get('[data-cy="orderNumber"]').should("have.text", "#12345");
        cy.get('[data-cy="orderName"]').should("have.text", "Automation Bro");
        cy.get('[data-cy="orderContact"]').should(
            "have.text",
            "+90 500 000 00 00"
        );
        cy.get('[data-cy="orderAmount"]').should("have.text", "$78");
        cy.get(
            ".flex-col-reverse > .border > .flex-row > :nth-child(2)"
        ).should("have.text", "Beef Stroganoff X2");
        cy.get(".border > .flex-row > :nth-child(3)").should(
            "have.text",
            "Margherita Pizza X1"
        );
        cy.get(":nth-child(3) > .text-lightGray").should("have.text", "1");
    });
    it("moves between steps successfully", () => {
        cy.get('[data-cy="moveToButton"]').click();
        cy.on("url:changed", (newUrl) => {
            expect(newUrl).to.contain("/orders/cooking");
        });
        cy.get(":nth-child(3) > .text-lightGray").should("have.text", "0");
        cy.get(":nth-child(4) > .text-lightGray").should("have.text", "1");
        cy.get(":nth-child(4) > .text-ellipsis").click();
        cy.get('[data-cy="orderNumber"]').should("have.text", "#12345");
        cy.get('[data-cy="orderName"]').should("have.text", "Automation Bro");
        cy.get('[data-cy="orderContact"]').should(
            "have.text",
            "+90 500 000 00 00"
        );
        cy.get('[data-cy="orderAmount"]').should("have.text", "$78");
        cy.get(
            ".flex-col-reverse > .border > .flex-row > :nth-child(2)"
        ).should("have.text", "Beef Stroganoff X2");
        cy.get(".border > .flex-row > :nth-child(3)").should(
            "have.text",
            "Margherita Pizza X1"
        );
    });
});
