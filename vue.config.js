// vue.config.js
module.exports = {
    css: {
      loaderOptions: {
          // pass sass options
          sass: {

          },
          // pass scss options
         scss: {
             data: `@import "./src/scss/main.scss";`
         },
           // pass Less.js Options to less-loader  
      }
    }
  }