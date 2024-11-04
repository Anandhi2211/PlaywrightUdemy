const ExcelJs = require("exceljs");
const { test, expect } = require("@playwright/test");

async function writeOperation(searchText, replaceText, change, location) {
  //   const searchText = "XXX";
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(location);
  const worksheet = workbook.getWorksheet("Sheet1");
  const result = await readOpertion(worksheet, searchText);
  const temp = worksheet.getCell(
    result.row + change.rowChange,
    result.col + change.colChange
  );
  temp.value = replaceText;
  await workbook.xlsx.writeFile(location);
}

async function readOpertion(worksheet, searchText) {
  let result = { row: -1, col: -1 };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell(async (cell, colNumber) => {
      if (cell.value === searchText) {
        result.row = rowNumber;
        result.col = colNumber;
        console.log(result.row, result.col);
      }
    });
  });

  return result;
}

test(" @Basics upload-download", async ({ page }) => {
  const textSearch = "Banana";
  const updateValue = "123";

  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  const promiss = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download = await promiss.catch((err) => {
    console.log("Error in downloading file:", err);
  });
  // await promiss;

  if (download) {
    const filepath = await download.path();
    writeOperation(
      textSearch,
      updateValue,
      { rowChange: 0, colChange: 2 },
      filepath
      // "C:/Users/anand/Downloads/download.xlsx"
    );

    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filepath);
  } else {
    console.log("Error in downloading");
  }
  const searchTextLocator = await page.getByText(textSearch);
  console.log(searchTextLocator);
  const resultRow = await page
    .getByRole("row")
    .filter({ has: searchTextLocator });
  console.log(resultRow);

  await expect(resultRow.locator("#cell-4-undefined")).toContainText(
    updateValue
  );
});
