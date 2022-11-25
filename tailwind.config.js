/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: "400px",
            },
            backgroundColor: {
                logos: "#EDEDED",
                navbar: "#F6F6F6",
                app: "#FFF",
                buttons: "#EBEBEB",
                addGreen: "#0DC74E",
                primary: "#2A71FA",
                orange: "#FC7501",
            },
            textColor: {
                primary: "#2A71FA",
                lightGray: "#B4B4B5",
                darkGray: "#737376",
            },
            borderColor: {
                navbar: "#CCCCCC",
            },
            fontFamily: {
                sfprodisplay: "SFPRODISPLAY",
                sfprodisplaybold: "SFPRODISPLAYBOLD",
                sfprodisplaymedium: "SFPRODISPLAYMEDIUM",
            },
            maxWidth: {
                50: "50px",
                "33perc": "33%",
                200: "200px",
            },
        },
    },
    plugins: [],
};
