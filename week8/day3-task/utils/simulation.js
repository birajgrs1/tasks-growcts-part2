const simulateNetworkDelay = () => {
  return new Promise((resolve) => {
    console.log('Simulating network delay...');
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

const simulatePartition = () => {
  return {
    read: 'Stale data may be read',
    write: 'Write may fail or go to secondary',
    partitioned: true
  };
};

const jobStatusUpdate = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('COMPLETED');
    }, 5000);
  });
};

module.exports = {
  simulateNetworkDelay,
  simulatePartition,
  jobStatusUpdate
};
