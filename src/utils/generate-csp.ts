type Directive =
  | "child-src"
  | "connect-src"
  | "default-src"
  | "font-src"
  | "frame-src"
  | "img-src"
  | "manifest-src"
  | "media-src"
  | "object-src"
  | "prefetch-src"
  | "script-src"
  | "script-src-elem"
  | "script-src-attr"
  | "style-src"
  | "style-src-elem"
  | "style-src-attr"
  | "worker-src"
  | "base-uri"
  | "plugin-types"
  | "sandbox"
  | "form-action"
  | "frame-ancestors"
  | "navigate-to"
  | "report-uri"
  | "report-to"
  | "block-all-mixed-content"
  | "referrer"
  | "require-sri-for"
  | "require-trusted-types-for"
  | "trusted-types"
  | "upgrade-insecure-requests";

type Value = string;
interface Options {
  devOnly?: boolean;
}
interface GenerateCSPProps {
  nonce?: string;
}

const generateCSP = ({ nonce }: GenerateCSPProps) => {
  const policy: Partial<Record<Directive, Value[]>> = {};

  // adder function for our policy object
  const add = (directive: Directive, value: Value, options: Options = {}) => {
    if (options.devOnly && process.env.NODE_ENV !== "development") return;
    const curr = policy[directive];
    policy[directive] = curr ? [...curr, value] : [value];
  };

  // default-src
  add("default-src", `'self'`);

  // script-src-elem
  add("script-src-elem", `'self'`);
  add("script-src-elem", `'nonce-${nonce}'`);
  //add("script-src-elem", `'unsafe-inline'`, { devOnly: true });

  // script-src
  add("script-src", `'self'`);
  add("script-src", `'nonce-${nonce}'`);
  add("script-src", `'unsafe-eval'`, { devOnly: true });

  // style-src
  add("style-src", `'self'`);
  add("style-src", "https:")
  // add("style-src", `'nonce-${nonce}'`);
  add("style-src", "https://fonts.googleapis.com");
  add("style-src", "https://fonts.gstatic.com");
  add("style-src", `'unsafe-inline'`);

  // style-src-elem
  add("style-src-elem", `'self'`);
  add("style-src-elem", "https:");
  // add("style-src-elem", `'nonce-${nonce}'`);
  add("style-src-elem", "https://fonts.googleapis.com");
  add("style-src-elem", "https://fonts.gstatic.com");
  add("style-src-elem", `'unsafe-inline'`);

  // style-src-attr
  add("style-src-attr", `'self'`);
  add("style-src-attr", "https:");
  // add("style-src-attr", `'nonce-${nonce}'`);
  add("style-src-attr", "https://fonts.googleapis.com");
  add("style-src-attr", "https://fonts.gstatic.com");
  add("style-src-attr", `'unsafe-inline'`);

  // connect-src
  add("connect-src", `'self'`);
  add("connect-src", `ws:`, { devOnly: true });
  add("connect-src", `https://strapi.caleblamcodes.dev`);

  // font-src
  add("font-src", "https://fonts.googleapis.com");
  add("font-src", "https://fonts.gstatic.com");
  add("font-src", "data:");

  // img-src
  add("img-src", `'self'`);
  add("img-src", "https://files.caleblamcodes.dev");

  // media-src
  add("media-src", `'self'`);
  add("media-src", "https://files.caleblamcodes.dev");

  // frame-ancestors
  add("frame-ancestors", `'none'`);

  // base-uri
  add("base-uri", `'none'`);

  // return the object in a formatted value (this won't work on IE11 without a polyfill!)
  return Object.entries(policy)
    .map(([key, value]) => `${key} ${value.join(" ")}`)
    .join("; ");
};

export default generateCSP;
