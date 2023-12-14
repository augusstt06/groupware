import { type NextRequest, NextResponse } from 'next/server'

import {
  ROUTE_ERR_ALREADY_LOGIN,
  ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN,
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
  ROUTE_FIND_PWD,
  ROUTE_LOGIN,
  ROUTE_MAIN,
  ROUTE_SIGNUP,
  ROUTE_SIGNUP_COMPLETE,
  ROUTE_SIGNUP_ORG,
} from './app/constant/route-constant'

import { KEY_ACCESS_TOKEN, KEY_LOGIN, KEY_ORGANIZATION } from '@/app/constant/constant'

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(KEY_ACCESS_TOKEN)
  const orgToken = req.cookies.get(KEY_ORGANIZATION)
  const loginToken = req.cookies.get(KEY_LOGIN)

  switch (req.nextUrl.pathname) {
    case ROUTE_FIND_PWD:
      if (accessToken !== undefined)
        return NextResponse.redirect(new URL(ROUTE_ERR_ALREADY_LOGIN, req.url))
      break
    case ROUTE_SIGNUP:
      if (accessToken !== undefined)
        return NextResponse.redirect(new URL(ROUTE_ERR_ALREADY_LOGIN, req.url))
      break
    case ROUTE_SIGNUP_COMPLETE:
      if (accessToken !== undefined && orgToken !== undefined && loginToken !== undefined) {
        return NextResponse.redirect(new URL(ROUTE_MAIN, req.url))
      }
      if (accessToken === undefined) return NextResponse.redirect(new URL(ROUTE_SIGNUP, req.url))
      if (orgToken === undefined) return NextResponse.redirect(new URL(ROUTE_SIGNUP_ORG, req.url))
      break
    case ROUTE_SIGNUP_ORG:
      if (accessToken === undefined)
        return NextResponse.redirect(new URL(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN, req.url))
      else {
        if (orgToken !== undefined)
          return NextResponse.redirect(new URL(ROUTE_ERR_NOT_FOUND_ORG_TOKEN, req.url))
      }
      break
    case ROUTE_LOGIN:
      if (accessToken !== undefined) {
        if (orgToken === undefined) {
          return NextResponse.redirect(new URL(ROUTE_ERR_NOT_FOUND_ORG_TOKEN, req.url))
        }
        return NextResponse.redirect(new URL(ROUTE_ERR_ALREADY_LOGIN, req.url))
      }
      break
    case ROUTE_MAIN:
      if (accessToken === undefined)
        return NextResponse.redirect(new URL(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN, req.url))
      else if (accessToken !== undefined && orgToken === undefined)
        return NextResponse.redirect(new URL(ROUTE_ERR_NOT_FOUND_ORG_TOKEN, req.url))
  }
}
