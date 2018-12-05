// https://github.com/davidroyer/nuxt-ssr-firebase-auth.v2/blob/master/helpers/index.js

import jwtDecode from 'jwt-decode'
var cookieparser = require('cookieparser')

export function getUserFromCookie(req) {
  if (!req.headers.cookie) return

  if (req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token
    if (!accessTokenCookie) return

    const decodedToken = jwtDecode(accessTokenCookie)
    if (!decodedToken) return

    return decodedToken
  }
}

export function getUserFromSession(req) {
  return req.session ? req.session.userId : null
}
