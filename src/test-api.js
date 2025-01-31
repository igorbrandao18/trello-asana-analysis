import fetch from 'node-fetch';

const TRELLO_KEY = '4267f89076c3cb6a0f2fcff634da78db';
const TRELLO_TOKEN = 'ATTAff9c5af13e210fe3c8c2094b9e92849e64a793589c128a272f80c6ad27f74e71053A7D1F';

async function testTrelloAPI() {
  try {
    const response = await fetch(
      `https://api.trello.com/1/members/me/boards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`
    );
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testTrelloAPI(); 