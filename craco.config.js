const CracoLessPlugin = require('craco-less')
const TailwindCSSPlugin = require('tailwindcss')
const AutoPrefixerPlugin = require('autoprefixer')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#E3350F',
              '@font-size-base': '12px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [TailwindCSSPlugin, AutoPrefixerPlugin],
    },
  },
}
