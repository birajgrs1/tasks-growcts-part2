const express = require('express');
const router = express.Router();
const { simulateNetworkDelay, simulatePartition, jobStatusUpdate } = require('../utils/simulation');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/simulate-delay', (req, res) => {
  simulateNetworkDelay().then(() => {
    res.render('simulate_delay', { message: 'Simulated network delay in replica set!' });
  });
});

router.get('/simulate-partition', (req, res) => {
  const result = simulatePartition();
  res.render('simulate_partition', { result });
});

router.get('/job-update', async (req, res) => {
  const status = await jobStatusUpdate();
  res.render('simulate_delay', { message: `Job status eventually updated: ${status}` });
});

router.get('/feature-cap', (req, res) => {
  res.render('feature_cap_alignment', {
    feature: 'Payroll Update',
    capFocus: 'Consistency > Availability (Banking Systems)'
  });
});

module.exports = router;
