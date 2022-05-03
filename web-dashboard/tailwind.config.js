module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0px 3px 8px  #d4dc36'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
