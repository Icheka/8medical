module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0px 3px 8px  #d4dc36'
      },
      fontSize: {
        md: '16px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
