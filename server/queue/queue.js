let orderQueue = [];

// add job to queue
export const addToQueue = (job) => {
  orderQueue.push(job);
};

// get next job
export const getNextJob = () => {
  return orderQueue.shift();
};