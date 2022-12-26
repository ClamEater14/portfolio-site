import {
  chainMatch,
  isPageRequest,
  csp,
  strictDynamic,
  strictInlineStyles,
  reporting,
} from "@next-safe/middleware";

const securityMiddleware = [
  // csp({
  //   directives: {
  //     "style-src": ["self", "http:", "https:"],
  //     "style-src-attr": ["self", "http:", "https:"],
  //     "style-src-elem": ["self", "http:", "https:"],
  //     "script-src": ["self"],
  //     "script-src-attr": ["self"],
  //     "script-src-elem": ["self"],
  //     "font-src": ["self", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
  //     "img-src": ["self", "https://files.caleblamcodes.dev"]
  //   }
  // }),
  csp(),
  strictDynamic(),
  reporting()
];

export default chainMatch(isPageRequest)(...securityMiddleware);