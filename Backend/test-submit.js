import fetch from 'node-fetch';
import FormData from 'form-data';

async function testSubmit() {
  const form = new FormData();
  form.append('providerId', '65f1a3b9e4b0000000000001'); // fake ObjectId
  form.append('title', 'Test Title');
  form.append('description', 'Test Description');
  form.append('category', 'Electrician');
  form.append('price', '150');

  try {
    const res = await fetch('http://localhost:5000/api/services', {
      method: 'POST',
      body: form
    });
    
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Fetch err:', err);
  }
}

testSubmit();
