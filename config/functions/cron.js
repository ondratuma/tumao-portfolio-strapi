'use strict';
const axios = require('axios');

axios.interceptors.request.use((config) => {
  config.metadata = { startTime: process.hrtime() };
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  response.config.metadata.endTime = process.hrtime();
  response.duration = process.hrtime(response.config.metadata.startTime);
  return response;
}, (error) => {
  error.config.metadata.endTime = process.hrtime();
  error.duration = process.hrtime(error.config.metadata.startTime);
  return Promise.reject(error);
});


/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

const runCronJob = async () => {
  const cronJobs = await strapi.query('cron-jobs').find({_limit: -1});

  const urls = cronJobs.reduce((total, newVal) => {
    return [...total, ...(newVal.urls.map(url => url.value))];
  }, []);

  const responses = await axios.all(urls.map(async (url) => {
    try {
      const resp = await axios.get(url);
      return resp;
    } catch (e){
      return {...e, ...e.response};
    }

  }));

  let responseWithTimes = {};
  responses.forEach((item, index) => {
    responseWithTimes[item.config.url] = {
      status: item.status,
      duration: parseFloat(`${item.duration[0]}.${item.duration[1]}`),
      url: item.config.url
    };

  })

  const final = cronJobs.map((group) => {
      return {
        name: group.name,
        links: group.urls.map((link) => responseWithTimes[link.value]),
      };
  });

  // final print
  final.forEach(job => {
    console.log(`JOB ${job.name} -------------------------------`);
    job.links.forEach(link => {
      console.log(`   STATUS: ${link.status} DURATION: ${link.duration} URL: ${link.url}`);
    })
  })
}

module.exports = {
  '0 * * * *': async () => runCronJob(),
  '15 * * * *': async () => runCronJob(),
  '30 * * * *': async () => runCronJob(),
  '45 * * * *': async () => runCronJob(),
};
