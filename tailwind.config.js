/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "composables/**/*.{js,ts}",
    //"./nuxt.config.{js,ts}",
    "plugins/**/*.{js,ts}",
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009688",
        "primary-2": "#80CBC4",
        "primary-3": "#009688",
        "primary-4": "#B3E0DB",
        "primary-5": "#E6F5F3",
        "primary-lite": "#6ec8c0",
        secondary: "#444f60",
        "secondary-2": "#556987",
        "secondary-3": "#C1C1C1",
        "secondary-4": "#C7CACF",
        "secondary-5": "#444444",
        "secondary-6": "#697280",
        "secondary-7": "#ECECEC",
        "secondary-8": "#ffffff",
        "secondary-lite": "#f1f1f1",
        "secondary-lite-2": "#f5f5f5",
        "secondary-dark": "#313131",
        "hahu-gray": "#444F60",
        "hahu-red": "#991B1B",
        "hahu-blue": "#2563EB",

        // dark theme colors

        'primary-dark': "#02201D",
        'primary-dark-2': "#ECEDEF",
        'secondary-dark-2': "#1B2637"
        
      },
    },
  },
  plugins: [],
}
