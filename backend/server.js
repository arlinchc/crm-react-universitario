//

const express = require("express");
const cors = require("cors");

const leadsRoutes = require("./routes/leadsRoutes");
const configurationRoutes = require("./routes/configurationRoutes");
const leadStatusRoutes = require("./routes/leadStatusRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/leads", leadsRoutes);
app.use("/api/configuration", configurationRoutes);
app.use("/api/lead-statuses", leadStatusRoutes);

app.listen(3000, () => {
  console.log("CRM University API running on port 3000");
});