"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const notes_routes_1 = __importDefault(require("./routes/notes.routes"));
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./middleware/logger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
app.use(express_1.default.json());
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
app.use(errorHandler_1.errorHandler);
app.use(logger_1.logger);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/notes", notes_routes_1.default);
app.use("/api/categories", categories_routes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to the Note-Taking API");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
