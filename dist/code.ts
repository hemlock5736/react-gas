export function doGet() {
  return HtmlService.createHtmlOutputFromFile("src/index.html")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setTitle("React + GAS");
}
