const React = require("react")

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="googleFontsMontserrat"
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />,
    <link
      key="googleFontsDancingScript"
      href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" 
      rel="stylesheet"
    />
  ])
}