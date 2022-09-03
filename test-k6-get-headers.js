import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  thresholds: {
    http_req_duration: ['p(95)<=200', 'avg<=200']
  }
};

export function setup() {
  console.log('setup');
}

export default function () {
  const params = {
    cookies: { my_cookie: 'HSJSHJKSHyhJK900093233DSJSJljkl' },
    headers: { 'X-MyHeader': 'k6test' },
    redirects: 5,
    tags: { k6test: 'yes' },
  };

  const res = http.get('https://httpbin.org/headers', params);
  
  console.log(res.json()['headers']);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'X-Myheader is k6test': (r) => r.json()['headers']['X-Myheader'] == 'k6test'
  })
}

export function teardown() {
  console.log('teardown');
}