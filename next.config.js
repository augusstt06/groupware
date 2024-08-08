// remove comments later

/** @type {import('next').NextConfig} */
const { register } = require('ts-node')
const { resolve } = require('path')

register({
  compilerOptions: {
    module: 'commonjs',
  },
  transpileOnly: true,
})

// const rewritePaths = require(resolve('./rewrites')).default
const nextConfig = {
  images: {
    // domains: [process.env.NEXT_PUBLIC_IMG_DOMAIN],
  },
  reactStrictMode: false,
  async redirects() {
    return []
  },
  // async rewrites() {
  //   return rewritePaths
  // },
}

module.exports = nextConfig
