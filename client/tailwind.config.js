/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EB5757",
        secondary: "#F2C94C",
        tertiary: "#EB7357",
        quaternary: "#F2994A",
        quinary: "#F2C94C",
        lightBg: "#F2F2F2",
        lightBlack: "#333333",
        midBlack: "#404145",
        lightBg2: "#f7f7f7",
        lightBg3: "#E0E0E0",
        darkBlack: "#222325",
        border: "#C5C6C9",
        bg: "#f8f8f8",
        lightGray: "#74767e",
        borderLight: "#dadbdd",
        
        customGray: "#808080"
      }
    }
  },
  plugins: []
};
