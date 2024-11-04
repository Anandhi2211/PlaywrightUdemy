const { test, expect } = require("@playwright/test");
const axios = require("axios");

const userData = {
  name: "morpheus",
  job: "leader",
};

const putData = {
  name: "John Doe",
  job: "QA Senior Engineer",
};

test("Create a User using POST", async ({ page }) => {
  const responseCreateUser = await axios.post(
    "https://reqres.in/api/users",
    userData
  );
  console.log(await responseCreateUser.data);
  const userId = await responseCreateUser.data.id;
  console.log(userId);
});

test("Get userData", async () => {
  const getUrl = "https://reqres.in/api/users/" + 12;
  console.log(getUrl);
  const userProfileResponse = await axios.get(getUrl);
  //   const responseUserProfile = await axios.get(
  //     `https://reqres.in/api/users/${userId}`
  //   );
  console.log(await userProfileResponse.data.data);
});

test("Put-Update", async ({ page }) => {
  const responsePut = await axios.put("https://reqres.in/api/users/2", putData);
  console.log(await responsePut.data);
  //Code for testing WebPage

  await page.goto("http://localhost:3000/tests/APITestingFiles/input.html");
  const name = await page.locator(".profile-name").textContent();
  const job = await page.locator(".profile-job").textContent();
  expect(name).toBe(putData.name);
  expect(job).toBe(putData.job);
});

test("Delete Test", async ({ page }) => {
  const responseDelete = await axios.delete("https://reqres.in/api/users/2");
  console.log(await responseDelete.status);
});

test("404 Error", async ({ page }) => {
  await axios
    .get("https://reqres.in/api/users/112")
    .then((result) => {
      console.log(result.status);
    })
    .catch((err) => {
      console.log(err.response.status);
    });
});
