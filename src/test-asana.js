import fetch from 'node-fetch';

const ASANA_TOKEN = '2/1209276646303170/1209276648243936:2bcc06e3e5027219f44c97801f598312';

async function testAsanaAPI() {
  try {
    const response = await fetch(
      'https://app.asana.com/api/1.0/workspaces',
      {
        headers: {
          'Authorization': `Bearer ${ASANA_TOKEN}`
        }
      }
    );
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testAsanaAPI(); 