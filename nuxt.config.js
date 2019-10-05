require('dotenv').config();

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Coda:800|Cormorant+Garamond:700|Frank+Ruhl+Libre:900|PT+Serif&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    [
      'nuxt-fire',
      {
        // Required:
        config: {
          development: {
            apiKey: process.env.API,
            authDomain: "veryjeopardy.firebaseapp.com",
            databaseURL: "https://veryjeopardy.firebaseio.com",
            projectId: "veryjeopardy",
            storageBucket: "",
            messagingSenderId: process.env.MESSAGE_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASURE_ID
          },
          production: {
            apiKey: process.env.API,
            authDomain: "veryjeopardy.firebaseapp.com",
            databaseURL: "https://veryjeopardy.firebaseio.com",
            projectId: "veryjeopardy",
            storageBucket: "",
            messagingSenderId: process.env.MESSAGE_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASURE_ID
          }
        },
        // The following options are optional:
        useOnly: ['realtimeDb'],
        customEnv: false,
        functionsLocation: 'us-central1',
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
