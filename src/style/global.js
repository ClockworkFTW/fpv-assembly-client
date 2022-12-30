import { createGlobalStyle, css } from "styled-components";

// Style dependencies
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-tooltip/dist/react-tooltip.css";
import "rc-slider/assets/index.css";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(far, fas, fab);

/*
  Author: Josh Comeau    
  Source: https://www.joshwcomeau.com/css/custom-css-reset/
*/

const reset = css`
  /*
    1. Use a more-intuitive box-sizing model.
    */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /*
    2. Remove default margin
    */
  * {
    margin: 0;
  }

  /*
    3. Allow percentage-based heights in the application
    */
  html,
  body {
    height: 100%;
  }

  /*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
    */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /*
    6. Improve media defaults
    */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  /*
    7. Remove built-in form typography styles
    */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /*
    8. Avoid text overflows
    */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  /*
    9. Create a root stacking context
    */
  #root,
  #__next {
    isolation: isolate;
  }
`;

const main = css`
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
      segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto,
      arial, sans-serif;
  }
  ul,
  ol {
    padding: 0;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${reset}
    ${main}
`;

export default GlobalStyle;
