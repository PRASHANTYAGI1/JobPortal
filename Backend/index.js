const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/admin");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require('cors');

// Allow all origins for now – works for Railway
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());

// Database
const connectDB = require('./config/db');
connectDB();

// Routes 
app.use('/api', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", dashboardRoutes);

// PORT — IMPORTANT for Railway
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
