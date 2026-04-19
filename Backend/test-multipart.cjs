const http = require('http');
const boundary = 'MyAppBoundary';
const req = http.request('http://localhost:5000/api/services', {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary
  }
}, (res) => {
  let chunks = '';
  res.on('data', d => chunks += d);
  res.on('end', () => console.log('RESPONSE:', res.statusCode, chunks));
});

req.write('--' + boundary + '\r\nContent-Disposition: form-data; name="providerId"\r\n\r\n60c72b2f9b1d8b001c8e4d1a\r\n');
req.write('--' + boundary + '\r\nContent-Disposition: form-data; name="title"\r\n\r\nFix\r\n');
req.write('--' + boundary + '\r\nContent-Disposition: form-data; name="description"\r\n\r\nTest\r\n');
req.write('--' + boundary + '\r\nContent-Disposition: form-data; name="price"\r\n\r\n200\r\n');
req.write('--' + boundary + '\r\nContent-Disposition: form-data; name="category"\r\n\r\nCustom\r\n');
req.write('--' + boundary + '--\r\n');
req.end();
