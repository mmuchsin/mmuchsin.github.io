// ADR 0001: the site is fully static — every route is prerendered at build
// time, so adapter-static never needs a fallback page.
export const prerender = true;
