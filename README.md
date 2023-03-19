# Backend Assessment

Build an uptime monitoring RESTful API server that allows authenticated users to monitor URLs, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

## Technologies Used

-   `node.js`
-   `express.js`
-   `typescript`
-   `mongodb`
-   `mongoose`
-   `express-validator`
-   `cron`
-   `bull`
-   `redis`
-   `nodemailer`
-   `jsonwebtoken`

## Room for Improvement

As the number of URL checks increases, it can impose heavy tasks on the server, causing performance to slow down and blocking the main thread. 
A recommended approach to mitigate this issue is to separate URL checks into its own process. The `bull` job queue offers a sandbox feature that provides this capability out of the box. 

Additionally, utilizing a `message queue` and `worker processes` offers several benefits, such as the ability to process a large number of URL checks in parallel, thereby improving performance significantly. This decouples the URL check operation from the main server, enabling the server to focus on other tasks.

## API Documentation

You can check the Postman documentation [here](https://documenter.getpostman.com/view/7069192/2s93JzMfzg)
