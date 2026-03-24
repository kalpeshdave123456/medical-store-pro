const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/inventory", require("./routes/inventory"));
app.use("/sales", require("./routes/sales"));
app.use("/reports", require("./routes/reports"));
app.use("/alerts", require("./routes/alerts"));

app.listen(5000, () => console.log("Server running on 5000"));
