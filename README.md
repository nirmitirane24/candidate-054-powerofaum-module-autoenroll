# Module-Autoenroll

A simple Node.js module that simulates auto-enrollment.

## Description

This module provides a basic API for simulating user auto-enrollment to a "Pro" trial plan within the TalentKonnect platform. It includes endpoints for:

*   Enrolling users in a Pro trial
*   Checking for expired trials and downgrading users
*   Retrieving metrics on active and expiring trials

**Note:** This module uses an in-memory data store for demonstration purposes. A real-world implementation would likely use a database for persistent storage.

## Endpoints

*   `POST /api/auto-enroll-pro`: Enrolls a user in a Pro trial.
    *   Request Payload:

        ```json
        {
          "userId": "USER_001"
        }
        ```

    *   Response:

        ```json
        {
          "success": true,
          "trialInfo": {
            "userId": "USER_001",
            "plan": "pro_trial",
            "expiresAt": "2025-10-05T12:00:00Z"
          }
        }
        ```

*   `GET /api/cron-check-trials`: Checks for expired trials and downgrades users (simulated).  This endpoint is designed to be called by a cron job.
    *   Response:

        ```json
        {
          "success": true,
          "downgradedUsers": ["USER_001", "USER_005"]
        }
        ```

*   `GET /api/pro-trial-metrics`: Retrieves metrics on active Pro trials and trials expiring soon.
    *   Response:

        ```json
        {
          "activeProTrials": 150,
          "expiringSoon": 20
        }
        ```

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nirmitirane24/candidate-00X-powerofaum-module-autoenroll.git 
    cd Module-Autoenroll
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the server:**

    ```bash
    node index.js
    ```

    The server will start at `http://localhost:3000` (or the port defined in your environment).

## Usage

Used Postman tool to send requests to the API endpoints. Refer to the "Endpoints" section for details on the request payloads and expected responses.

## Deployment

This module is deployed on platforms Vercel.

## Technologies Used

*   Node.js
*   Express.js
*   Moment.js (for date manipulation)
*   CORS (for enabling Cross-Origin Resource Sharing)

## Future Enhancements

*   Implement a database for persistent data storage.
*   Add authentication and authorization to the API endpoints.
*   Implement a proper scheduling mechanism for the `cron-check-trials` endpoint.
*   Add unit tests.

## Postman Screenshots

![alt text](<Screenshot 2025-07-05 205854.png>)
![alt text](<Screenshot 2025-07-05 210121.png>)
![alt text](<Screenshot 2025-07-05 210544.png>)
## Author
Nirmiti Rane

