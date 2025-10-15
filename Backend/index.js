const express = require('express');
const app =  express();
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/admin");
const cors = require('cors');
const port = process.env.PORT || 4000;

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json());
// connect to database
const connectDB = require('./config/db');
connectDB();

// Routes 
app.use('/api', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api", dashboardRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


