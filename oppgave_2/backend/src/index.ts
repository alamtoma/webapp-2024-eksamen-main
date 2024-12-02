import express from "express";
import cors from "cors";
import events from "./API/events";
import participants from "./API/participants";

const app = express();
const port = 4004;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", events);
app.use("/api/participants", participants);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
