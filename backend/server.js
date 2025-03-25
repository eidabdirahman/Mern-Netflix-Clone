import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
const app = express();
import AuthRoutes from './routes/AuthRoute.js';
import MovieRoutes from './routes/MovieRoute.js';
import tvRoutes from './routes/TvRoute.js';
import SearchRoutes from './routes/SerchRoute.js';
import { envVars } from './Config/envVars.js';
import { connectDB } from './Config/db.js';
import { ProtectRoute } from './middlewares/ProtectRoute.js';

const __dirname = path.resolve();

const port = envVars.PORT;
connectDB();

// Middleware to parse JSON bodies
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Server is running");
});

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/movie", ProtectRoute, MovieRoutes);
app.use("/api/v1/tv", ProtectRoute, tvRoutes);
app.use("/api/v1/search", ProtectRoute, SearchRoutes);




app.listen(port, () => {
    console.log('Server is running on port ' + port);
});