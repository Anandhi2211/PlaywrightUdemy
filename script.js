// const axios = require("axios");

axios
  .get("https://reqres.in/api/users?page=2")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));
