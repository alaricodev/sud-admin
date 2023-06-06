const express = require("express");
const cors = require("cors");
const dbRouter = require("./routes/database");
const externalRouter = require("./routes/external");
const captchaRouter = require("./routes/captcha");
const denuncias = require("./routes/denuncias");

const port = 5001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", dbRouter);
app.use("/", externalRouter);
app.use("/", captchaRouter);
app.use("/", denuncias);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
