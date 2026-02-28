/** @type {import('tailwindcss').Config} */
export default {
content: [
  "./index.html",
  "./src/**/*.{js,jsx}",
],
theme: {
    extend: {
      colors: {
        primary: "#1a1a32",   // azul marino
        accent: "#f0c02f",    // amarillo
        institucional: {
          amarillo: "#f0c02f",
          azul: "#1a1a32",
        },
      },    
  plugins: [],
};
