const { test, expect } = require("@playwright/test");
const axios = require("axios");

const baseUrl = "https://reqres.in/api/";

test("Paginati1on", async () => {
  const response = await axios.get(`${baseUrl}users?page=1`);
  const totalPages = await response.data.total_pages;
  for (let page = 1; page <= totalPages; page++) {
    const eachData = await axios.get(`${baseUrl}users?page=${page}`);

    console.log(eachData.data.data);
    const userData = eachData.data.data;

    const id = await userData.map((us) => us.email);
    console.log(id);
  }
});

test("Token Scenario", async () => {
  const response = await axios.post(`${baseUrl}login`, {
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });

  console.log(response.data.token);
  const token = response.data.token;

  const data = await axios.get(`${baseUrl}users/3`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data.data.data);
});

test("testtest", async () => {
  const page1Data = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
    {
      params: {
        _page: 1,
        _limit: 5,
      },
    }
  );
  console.log(page1Data.data);

  const alter = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=2"
  );
  console.log(alter.data);
});
