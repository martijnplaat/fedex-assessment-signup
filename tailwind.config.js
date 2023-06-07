/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss,ts}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        "fedex-blue": {
          50: "#EDE0FB",
          100: "#DAC1F6",
          200: "#B887EE",
          300: "#9448E5",
          400: "#701DC9",
          500: "#4D148C",
          600: "#3E1070",
          700: "#2F0C55",
          800: "#20083A",
          900: "#0F041B",
          950: "#07020D"
        },
        "fedex-red": {
          50: "#FFF0E5",
          100: "#FFE0CC",
          200: "#FFC299",
          300: "#FFA366",
          400: "#FF8533",
          500: "#FF6600",
          600: "#CC5200",
          700: "#993D00",
          800: "#662900",
          900: "#331400",
          950: "#190A00"
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}