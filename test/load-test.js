import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 20,             // 20 virtual users
  duration: '30s',     // selama 60 detik
};

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3NzNiNDViMC1hMDMxLTRlNzctOTM1Ny1lOTE5MjEyNGMzOWIiLCJlbWFpbCI6ImtvbWFsYWdyZWZmZW45NTlAZ21haWwuY29tIiwiaWF0IjoxNzUwMDM5MjA4LCJleHAiOjE3NTAwNDI4MDh9._DNMLQB7x6tkH8iMrL1LMWQm1yH3HGQV7tUwtq4w8YM';

export default function () {
  // Endpoint pertama
  const url1 = 'http://192.168.49.2:30080/auth/api/auth/login';
  const payload1 = JSON.stringify({
    email: "komalagreffen959@gmail.com",
    password: "singalaut"
  });

  const params1 = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response1 = http.post(url1, payload1, params1);
  console.log(`Response from auth login: ${response1.status}`);

  // Endpoint kedua
  const url2 = 'http://192.168.49.2:30080/ai/speech2text';
  const payload2 = JSON.stringify({
    text: "i went to the store and bought some milk. um, it was like really expensive you know. its price was high!"
  });

  const params2 = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  };

  const response2 = http.post(url2, payload2, params2);
  console.log(`Response from speech2text: ${response2.status}`);

  // Endpoint ketiga
  const url3 = 'http://192.168.49.2:30080/progress/api/progress/recommendation/123';

  const params3 = {
    headers: {
      'Authorization': token,
    },
  };

  const response3 = http.get(url3, params3);
  console.log(`Response from progress recommendation: ${response3.status}`);

  // Endpoint keempat
  const url4 = 'http://192.168.49.2:30080/health';

  const response4 = http.get(url4);
  console.log(`Response from health: ${response4.status}`);

  sleep(2); // 1 request per user per 2 detik
}