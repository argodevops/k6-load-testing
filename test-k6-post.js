import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  iterations: 20,
  thresholds: {
    http_req_duration: ['p(95)<=500', 'avg<=500']
  }
};

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  let response = http.post(url, 'Hello world!');

  check(response, {
    'Application says hello world!': (r) => r.body.includes('Hello world!')
  });
  sleep(1)
}
