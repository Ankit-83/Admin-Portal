import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Google Tag Manager
// const gtmId = "GTM-MF2MHRNB";

// Assuming `actions` contains the button actions like 'download' and 'upload'
document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', function(event) {
    // If the button text or action includes 'Download'
    if (event.target.textContent.includes('Download')) {
      // Push data to the dataLayer for GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'module_interaction',
        module_name: 'Analytics',  // You can replace this with the actual module name
        interaction_type: 'Download Button',
        action: 'download',
        label: event.target.textContent // Label can be the button text or other identifiers
      });
    }

    // If the button text includes 'Upload'
    if (event.target.textContent.includes('Upload')) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'module_interaction',
        module_name: 'Analytics',  // Replace with actual module name
        interaction_type: 'Upload Button',
        action: 'upload',
        label: event.target.textContent // Button text as label
      });
    }
  });
});


// Add GTM script and noscript tags dynamically to the HTML
const addGTM = () => {

//   // Create the GTM script tag for the head
//   const script = document.createElement("script");
//   script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-MF2MHRNB');

// `;

//   // Append the script tag to the head
//   document.head.appendChild(script);

// Create the GTM script tag
const scriptGTM = document.createElement("script");
scriptGTM.innerHTML = `(function(w,d,s,l,i){
  w[l] = w[l] || [];
  w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
  var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-MF2MHRNB');`;

// Append the GTM script to the head
document.head.appendChild(scriptGTM);

// Create the gtag.js script tag (Google Analytics)
const scriptGtag = document.createElement("script");
scriptGtag.async = true;
scriptGtag.src = "https://www.googletagmanager.com/gtag/js?id=G-6KGEN1XNJX";

// Append the gtag.js script to the head
document.head.appendChild(scriptGtag);

// Create the inline script to configure gtag.js
const scriptConfig = document.createElement("script");
scriptConfig.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-6KGEN1XNJX');
`;

// Append the gtag.js configuration script to the head
document.head.appendChild(scriptConfig);


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
