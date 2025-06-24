import cron from "node-cron";
import {
  notifyHRUnverifiedUsers,
  logStaleUsers,
  generatePayrollReport
} from "../services/cronService.js";

cron.schedule("0 0 * * *", async () => {
  await notifyHRUnverifiedUsers();
  await logStaleUsers();
});

cron.schedule("0 1 1 * *", async () => {
  await generatePayrollReport();
});


/*
CRON schedule expressions:

* * * * * * (every minute)
* * * * * (every hour)
* * * * (every day)
* * * (every week)
* * (every month)
* (every year)

0 * * * * (every minute)
0 0 * * * (every hour)  --- > at 00:00
0 0 1 * * (every day)
0 0 1 * * (every week)
0 0 1 * * (every month)
0 0 1 1 * (every year)

0 0 * * FRI (every Friday)

0 0 1 1 * (every month on the 1st)

References: https://crontab.guru/
*/