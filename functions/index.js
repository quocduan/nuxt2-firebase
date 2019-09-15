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
const nuxtConfig = require('./nuxt.config.js');
const nuxt = new Nuxt(nuxtConfig);

function handleRequest(req, res) {
  console.log("IN New Nuxt Trial: ");
  const isProduction = process.env.NODE_ENV === "development" ? false : true;
  if (isProduction)
    res.set("Cache-Control", "public, max-age=150, s-maxage=150");

  try {
    nuxt.render(req, res);
  } catch (err) {
    console.error(err);
  }
}

app.use(handleRequest);
exports.nuxtssr = functions.https.onRequest(app);
