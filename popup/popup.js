document.getElementById("create").addEventListener("click", function () {
  // Path to your HTML file
  var htmlFilePath = "../create.html";
  var scriptFilePath = "../create.js";
  var styleFilePath = "../create.css";

  // Fetch HTML content
  fetch(chrome.runtime.getURL(htmlFilePath))
    .then((response) => response.text())
    .then((htmlContent) => {
      // Fetch script content
      fetch(chrome.runtime.getURL(scriptFilePath))
        .then((response) => response.text())
        .then((scriptContent) => {
          // Fetch style content
          fetch(chrome.runtime.getURL(styleFilePath))
            .then((response) => response.text())
            .then((styleContent) => {
              // Combine HTML, script, and style content
              var customHtml = `
                <html>
                  <head>
                    <title>New Tab Content</title>
                    <style>${styleContent}</style>
                  </head>
                  <body>
                    ${htmlContent}
                    <script>${scriptContent}</script>
                  </body>
                </html>
              `;

              // Open a new tab with the combined content
              chrome.tabs.create({
                url:
                  "data:text/html;charset=UTF-8," +
                  encodeURIComponent(customHtml),
              });
            })
            .catch((error) => {
              console.error("Error reading style file:", error);
            });
        })
        .catch((error) => {
          console.error("Error reading script file:", error);
        });
    })
    .catch((error) => {
      console.error("Error reading HTML file:", error);
    });
});
