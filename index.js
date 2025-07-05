const express = require('express');
const moment = require('moment');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS (for development)

// Mock Data (In-Memory Store)
let proTrials = [
    {
      "userId": "USER_001", 
      "plan": "pro_trial",
      "expiresAt": "2023-01-01T00:00:00Z"  // Expired a long time ago!
    },
     {
      "userId": "USER_005",
      "plan": "pro_trial",
      "expiresAt": "2024-01-01T00:00:00Z"  // Expired a long time ago!
    }
];

// --- API Endpoints ---

// 1. POST /api/auto-enroll-pro
app.post('/api/auto-enroll-pro', (req, res) => {   
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, error: 'userId is required' });
    }

    const expiresAt = moment().add(30, 'days').format('YYYY-MM-DDTHH:mm:ssZ'); // Expires in 30 days
    const trialInfo = {
        userId: userId,
        plan: "pro_trial",
        expiresAt: expiresAt
    };

    proTrials.push(trialInfo);

    res.json({
        success: true,
        trialInfo: trialInfo
    });
});

// 2. GET /api/cron-check-trials
app.get('/api/cron-check-trials', (req, res) => { 
    const now = moment();
    const downgradedUsers = [];

    proTrials = proTrials.filter(trial => {
        const expiryDate = moment(trial.expiresAt);
        if (expiryDate.isBefore(now)) {
            // Downgrade (in this mock, we're just removing from the array)
            downgradedUsers.push(trial.userId);
            return false; // Remove from array
        }
        return true; // Keep in array
    });

    res.json({
        success: true,
        downgradedUsers: downgradedUsers
    });
});

// 3. GET /api/pro-trial-metrics
app.get('/api/pro-trial-metrics', (req, res) => {
  //const now = moment();
  const activeProTrials = 150;  // Mocked value
  const expiringSoon = 20;       // Mocked value
    //const expiringSoonThreshold = moment().add(7, 'days');  // Example: expiring in the next 7 days

   //const expiringSoon = proTrials.filter(trial => {
     //const expiryDate = moment(trial.expiresAt);
     //return expiryDate.isBetween(now, expiringSoonThreshold);
   //}).length;
  res.json({
    activeProTrials: activeProTrials,
    expiringSoon: expiringSoon
  });
});

//Start the Server 
app.listen(port, () => {
    console.log(`Server listening at http://localhost:3000`);
});