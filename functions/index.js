const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const { Nuxt, Builder } = require("nuxt");
const express = require("express");
const app = express();



// const config = {
//   dev: true,
//   debug: true,
//   buildDir: "nuxt",
//   build: {
//     publicPath: "/assets/"
//   }
// };
// const nuxt = new Nuxt(config);
const isProd = (process.env.NODE_ENV === 'production')
// const port = process.env.PORT || 3000
const port = process.env.PORT || 5000
console.log(`---------------------${isProd}--------------------`)
const nuxtConfig = require('./nuxt.config.js');
nuxtConfig.dev = !isProd
// https://www.npmjs.com/package/nuxt
nuxtConfig.dev=false
const nuxt = new Nuxt(nuxtConfig);

async function handleRequest(req, res) {
  // res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  await nuxt.ready()
  nuxt
    .renderRoute('/')
    .then((result) => {
      console.log('-------------------balallalalala------------')
      res.send(result.html)
    })
    .catch((e) => {
      console.log('-----------------------------erororororor---------------')
      res.send(e)
    })
}
app.get('*', handleRequest)
exports.nuxtssr = functions.https.onRequest(app);
