const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')

const config = {
  dev: false,
  buildDir: '../.nuxt',
  build: {
    publicPath: '../public'
  }
}
const nuxt = new Nuxt(config)
const app = express()
app.use(nuxt.render)
exports.ssrapp = functions.https.onRequest(app)
