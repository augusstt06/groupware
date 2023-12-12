import { type NextRequest, NextResponse } from 'next/server'

import { KEY_ACCESS_TOKEN, KEY_LOGIN, KEY_ORGANIZATION } from '@/app/constant/constant'

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(KEY_ACCESS_TOKEN)
  const orgToken = req.cookies.get(KEY_ORGANIZATION)
  const loginToken = req.cookies.get(KEY_LOGIN)
  switch (req.nextUrl.pathname) {
    case '/':
      if (accessToken !== undefined)
        return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_MAIN as string, req.url))
      break
    case process.env.NEXT_PUBLIC_SIGNUP:
      if (accessToken !== undefined)
        return NextResponse.redirect(
          new URL(process.env.NEXT_PUBLIC_ERR_ALREADY_LOGIN as string, req.url),
        )
      break
    case process.env.NEXT_PUBLIC_SIGNUP_COMPLETE:
      if (accessToken !== undefined && orgToken !== undefined && loginToken !== undefined) {
        return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_MAIN as string, req.url))
      }
      if (accessToken === undefined)
        return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_SIGNUP as string, req.url))
      if (orgToken === undefined)
        return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_SIGNUP_ORG as string, req.url))
      break
    case process.env.NEXT_PUBLIC_SIGNUP_ORG:
      if (accessToken === undefined)
        return NextResponse.redirect(
          new URL(process.env.NEXT_PUBLIC_ERR_NOT_FOUND_ACCCESS_TOKEN as string, req.url),
        )
      else {
        if (orgToken !== undefined)
          return NextResponse.redirect(
            new URL(process.env.NEXT_PUBLIC_ERR_NOT_FOUND_ORG_TOKEN as string, req.url),
          )
      }
      break
    case process.env.NEXT_PUBLIC_LOGIN:
      if (accessToken !== undefined) {
        if (orgToken === undefined) {
          return NextResponse.redirect(
            new URL(process.env.NEXT_PUBLIC_ERR_NOT_FOUND_ORG_TOKEN as string, req.url),
          )
        }
        return NextResponse.redirect(
          new URL(process.env.NEXT_PUBLIC_ERR_ALREADY_LOGIN as string, req.url),
        )
      }
      break
    case process.env.NEXT_PUBLIC_MAIN:
      if (accessToken === undefined)
        return NextResponse.redirect(
          new URL(process.env.NEXT_PUBLIC_ERR_NOT_FOUND_ACCCESS_TOKEN as string, req.url),
        )
      else if (accessToken !== undefined && orgToken === undefined)
        return NextResponse.redirect(
          new URL(process.env.NEXT_PUBLIC_ERR_NOT_FOUND_ORG_TOKEN as string, req.url),
        )
  }
}
