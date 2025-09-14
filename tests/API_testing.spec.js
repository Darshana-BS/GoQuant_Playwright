// tests/api.register.spec.js
const { test, expect } = require('@playwright/test');


//-----------API_01_Register User---------------------------------------------------

test('1_API: register user (POST /users)', async ({ request }) => {
  const url = 'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users';

  const payload = {
    username: "API_User01",
    firstName: "API_User",
    lastName: "API_User",
    password: "APIUser1234!",
    confirmPassword: "APIUser1234!"
  };

  const headers = {
    'content-type': 'application/json',
    'origin': 'https://buggy.justtestit.org'
  };

  const response = await request.post(url, { data: payload, headers });

  // Basic assertions
  console.log('Status:', response.status());
  const bodyText = await response.text();
  console.log('Body:', bodyText);

  // Accept either success (201/200) or validation error (400)
  if (response.status() === 200 || response.status() === 201) {
    const json = await response.json();
    expect(json).toBeTruthy(); // success path
  } else {
    expect(bodyText).toMatch(/UsernameExistsException|InvalidParameter|User already exists/);
  }
});
//----------------------------------------------------------------------------------------------


//-----------API_02_Generate Token / Login---------------------------------------------------
test('2_API: get / generate OAuth token', async ({ request }) => {
  const url = 'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/oauth/token';

  const formData = new URLSearchParams({
    grant_type: 'password',
    username: 'API_User01',
    password: 'APIUser1234!'   // note the exclamation mark
  });

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    origin: 'https://buggy.justtestit.org'
  };

  const response = await request.post(url, {
    headers,
    data: formData.toString()
  });

  console.log('Status:', response.status());
  const bodyText = await response.text();
  console.log('Body:', bodyText);

  expect(response.status()).toBe(200);
  const json = await response.json();
  expect(json).toHaveProperty('access_token');
});
//----------------------------------------------------------------------------------------------

//-----------API_03_Update user profile ---------------------------------------------------------
test('API: update user profile', async ({ request }) => {
const loginResponse = await request.post('https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/oauth/token', {
    headers: {
      'accept': '*/*',
      'content-type': 'application/x-www-form-urlencoded'
    }
  });
expect(loginResponse.ok()).toBeTruthy();
const loginData = await loginResponse.json();
const token = loginData.access_token; // check the key name in response JSON

const url = 'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users/profile';

  const body = {
    username: "API_User01",
    firstName: "API_User1",
    lastName: "API_User",
    gender: "",
    age: "",
    address: "",
    phone: "",
    hobby: "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: ""
  };

  const response = await request.put(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'origin': 'https://buggy.justtestit.org'
    },
    data: body
  });

  console.log('Status:', response.status());
  const json = await response.json();
  console.log('Response:', json);

  expect(response.status()).toBe(200); // ✅ check success
});

//----------------------------------------------------------------------------------------------





