const config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts,svx}', require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts,svx}')],

  theme: {
    extend: {},
  },

  plugins: [require('@tailwindcss/typography'), ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()],
};

module.exports = config;
