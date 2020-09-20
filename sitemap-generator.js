require("babel-register")({
  presets: ["es2015", "react"]
});
 
const router = require("./src/siteRoutes").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
    return (
      new Sitemap(router)
          .build("https://www.wedlite.in")
          .save("./public/sitemap.xml")
    );
}

generateSitemap();