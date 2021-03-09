const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const axios = require("axios");
const { json } = require("express");

const teste = axios
  .get("http://localhost:8080")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

const replaceTagToSchema = (html, schema) => {
  return html.replace('<div id="root"></div>', schema);
};

const render = async (req, res, next) => {
  const { data } = await axios.get("http://localhost:8080");

  res.send(data.replace(`<span class="vai"></span>`, "kkkkk"));
  next();
};

// viewed at http://localhost:8080
app.get("/", function (req, res) {
  let html = fs.readFileSync(path.resolve(`./index.html`), "utf8");

  res.send(html);
});

app.get("/teste", render);

const logger = (req, resp) => {
  //   console.log("req=>", req);
  //   console.log("resp>", resp);
};

app.use("*", logger);

app.listen(8080, (req, resp) => {
  //   console.log("req=>", req);
  //   console.log("resp>", resp);
});
