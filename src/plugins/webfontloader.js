import { load } from "webfontloader";
/**
 * Plugins/webfontloader.js
 *
 * Webfontloader documentation: https://github.com/typekit/webfontloader
 */
export async function loadFonts() {
  /** dns-prefetch */
  const prefetch = document.createElement("link");
  prefetch.rel = "dns-prefetch";
  prefetch.href = "//fonts.googleapis.com";
  document.head.appendChild(prefetch);

  /** Preconnect */
  const preconnect = document.createElement("link");
  preconnect.rel = "preconnect";
  preconnect.href = "https://fonts.gstatic.com";
  document.head.appendChild(preconnect);

  /** Webfont Config */
  const WebFontConfig = {
    google: {
      families: ["IBM+Plex+Sans+Thai:400,500,600,700&display=swap"],
    },
    active: () => {
      sessionStorage.fonts = true;
    },
  };
  load(WebFontConfig);
}
