import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Google Tag Manager
// const gtmId = "GTM-MF2MHRNB";

// Add GTM script and noscript tags dynamically to the HTML
const addGTM = () => {
  // Create the GTM script tag for the head
  const script = document.createElement("script");
  script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MF2MHRNB');`;

  // Append the script tag to the head
  document.head.appendChild(script);

  // Create the noscript tag for the body
  const noscript = document.createElement("noscript");
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MF2MHRNB"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

  // Append the noscript tag to the body
  document.body.insertBefore(noscript, document.body.firstChild);
};

addGTM();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
