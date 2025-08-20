// tailwind.config.js
export default {
      content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
      darkMode: 'media', // or 'class'
      theme: {
            extend: {
                  colors: {
                        customGreen: '#3F7D58',
                  },
                  fontFamily: {
                        roboto: ['Roboto', 'sans-serif'],
                  },
            },
      },
};
