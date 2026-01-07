/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primario: "#FFD700",
        primaryDark: "#E6C200",
        fundo: "#000000",
        backgroundAlt: "#121212",
        superficie: "#1E1E1E",
        textoPrimario: "#FFFFFF",
        textoMuted: "#A1A1AA",
        sucesso: "#22C55E",
        perigo: "#EF4444",
        borda: "#27272A",
      },
      borderRadius: {
        cartao: 24,
      },
    },
  },
  plugins: [],
};

