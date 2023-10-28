import app from "./app.js";
import config from "./config/index.js";

const PORT = config.api.env.PORT

app.listen(PORT, () => console.log("server is running on port", PORT));