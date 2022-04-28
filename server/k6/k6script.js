import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

// A simple counter for http requests

export const requests = new Counter('http_reqs');

// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for

export const options = {
  stages: [
    { target: 1000, duration: '1m' },
    { target: 1000, duration: '1m' },
  ],
  thresholds: {
    requests: ['count < 100'],
  },
};

export default function () {
  // our HTTP request, note that we are saving the response to res, which can be accessed later
    const id = Math.floor(Math.random() * 1000011)
      let res = http.get(`http://54.241.187.175:8528/products/${id}`);
        sleep(1);
        const checkRes = check(res, {
          'status is 200': (r) => r.status === 200,
          'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
        });

        const id2 = Math.floor(Math.random() * 1000011)
      let res2 = http.get(`http://54.241.187.175:8528/products/${id2}/styles`);
        sleep(1);
        const checkRes2 = check(res2, {
          'status is 200': (r) => r.status === 200,
          'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
        });

        const id3 = Math.floor(Math.random() * 1000011)
      let res3 = http.get(`http://54.241.187.175:8528/products`);
        sleep(1);
        const checkRes3 = check(res3, {
          'status is 200': (r) => r.status === 200,
          'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
        });

        const id4 = Math.floor(Math.random() * 1000011)
      let res4 = http.get(`http://54.241.187.175:8528/products/${id4}/related`);
        sleep(1);
        const checkRes4 = check(res4, {
          'status is 200': (r) => r.status === 200,
          'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
        });
}
