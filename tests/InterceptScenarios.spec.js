const { test, expect } = require("@playwright/test");
const axios = require("axios");
require("dotenv").config();
const apiKey = process.env.API_KEY;

test("Authentication and Authorization Testing", async ({ page }) => {
  const response = await axios.get("https://reqres.in/api/users");
  const lognToken = await response.data.token;
  console.log(response.data);
});

const gitBaseUrl = process.env.GIT_URL;
test("Authentication and Authorization Testing GitHub", async ({ page }) => {
  //Without Authentication
  await axios.get(`${gitBaseUrl}user/repos`).catch((err) => {
    console.log("Authication", err.response.status);
  });

  // with valid Token
  await axios
    .get(`${gitBaseUrl}user/repos`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    .then((response) => {
      console.log("Response", response.status);
    })
    .catch((err) => {
      console.log("Bad Token", err.response.status);
    });

  // with Invalid Token
  await axios
    .get(`${gitBaseUrl}user/repos`, {
      headers: {
        Authorization: `Bearer ${apiKey}1`,
      },
    })
    .then((response) => {
      console.log("Response", response.status);
    })
    .catch((err) => {
      console.log("Bad Token", err.response.status);
    });
});

test("Simulate Delayed Response", async ({ page }) => {
  // await page.route("https://reqres.in/api/users", (route) => {
  await page.route("https://jsonplaceholder.typicode.com/posts", (route) => {
    setTimeout(() => {
      route.continue();
    }, 10000);
  });

  await page.goto("https://jsonplaceholder.typicode.com/posts");
});

test("Mock Response Data", async ({ page }) => {
  await page.route("https://reqres.in/api/users/2", (route) => {
    const mockData = {
      first_name: "Janet",
    };

    route.fulfill({
      status: 200,
      contentType: "application/JSON",
      body: JSON.stringify(mockData),
    });
  });
});
