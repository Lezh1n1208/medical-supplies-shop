/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://anhduongphat.vercel.app",
  generateRobotsTxt: true,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
  },
};