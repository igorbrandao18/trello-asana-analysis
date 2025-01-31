import fetch from 'node-fetch';

const TRELLO_KEY = '4267f89076c3cb6a0f2fcff634da78db';
const TRELLO_TOKEN = 'ATTAff9c5af13e210fe3c8c2094b9e92849e64a793589c128a272f80c6ad27f74e71053A7D1F';
const ASANA_TOKEN = '2/1209276646303170/1209276648243936:2bcc06e3e5027219f44c97801f598312';

// Função para migrar do Trello para o Asana
async function migrateFromTrelloToAsana() {
  try {
    // 1. Obter o board do Trello
    const trelloBoard = await fetch(
      `https://api.trello.com/1/boards/679c4cfda368cfce8389f650?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&lists=open`
    ).then(res => res.json());

    console.log('Trello Board:', trelloBoard.name);

    // 2. Obter as listas do board
    const trelloLists = await fetch(
      `https://api.trello.com/1/boards/${trelloBoard.id}/lists?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`
    ).then(res => res.json());

    console.log('Trello Lists:', trelloLists.map(list => list.name));

    // 3. Criar um projeto no Asana
    const asanaProject = await fetch(
      'https://app.asana.com/api/1.0/projects',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ASANA_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            name: `${trelloBoard.name} (from Trello)`,
            workspace: '1209276646303182'
          }
        })
      }
    ).then(res => res.json());

    console.log('Asana Project Created:', asanaProject.data.name);

    // 4. Para cada lista do Trello, criar uma seção no Asana
    for (const list of trelloLists) {
      // Criar seção
      const section = await fetch(
        'https://app.asana.com/api/1.0/sections',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ASANA_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              name: list.name,
              project: asanaProject.data.gid
            }
          })
        }
      ).then(res => res.json());

      console.log('Created section:', section.data.name);

      // 5. Obter cards da lista do Trello
      const cards = await fetch(
        `https://api.trello.com/1/lists/${list.id}/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`
      ).then(res => res.json());

      // 6. Para cada card, criar uma task no Asana
      for (const card of cards) {
        const task = await fetch(
          'https://app.asana.com/api/1.0/tasks',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${ASANA_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              data: {
                name: card.name,
                notes: card.desc,
                projects: [asanaProject.data.gid],
                section: section.data.gid
              }
            })
          }
        ).then(res => res.json());

        console.log('Created task:', task.data.name);
      }
    }

    console.log('Migration from Trello to Asana completed!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Função para migrar do Asana para o Trello
async function migrateFromAsanaToTrello() {
  try {
    // 1. Obter o projeto do Asana
    const asanaProjects = await fetch(
      'https://app.asana.com/api/1.0/projects?workspace=1209276646303182',
      {
        headers: {
          'Authorization': `Bearer ${ASANA_TOKEN}`
        }
      }
    ).then(res => res.json());

    const project = asanaProjects.data[0];
    console.log('Asana Project:', project.name);

    // 2. Criar um board no Trello
    const trelloBoard = await fetch(
      `https://api.trello.com/1/boards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${project.name} (from Asana)`,
          defaultLists: false
        })
      }
    ).then(res => res.json());

    console.log('Trello Board Created:', trelloBoard.name);

    // 3. Obter seções do projeto Asana
    const sections = await fetch(
      `https://app.asana.com/api/1.0/projects/${project.gid}/sections`,
      {
        headers: {
          'Authorization': `Bearer ${ASANA_TOKEN}`
        }
      }
    ).then(res => res.json());

    // 4. Para cada seção, criar uma lista no Trello
    for (const section of sections.data) {
      const list = await fetch(
        `https://api.trello.com/1/lists?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: section.name,
            idBoard: trelloBoard.id
          })
        }
      ).then(res => res.json());

      console.log('Created list:', list.name);

      // 5. Obter tasks da seção
      const tasks = await fetch(
        `https://app.asana.com/api/1.0/sections/${section.gid}/tasks`,
        {
          headers: {
            'Authorization': `Bearer ${ASANA_TOKEN}`
          }
        }
      ).then(res => res.json());

      // 6. Para cada task, criar um card no Trello
      for (const task of tasks.data) {
        const taskDetails = await fetch(
          `https://app.asana.com/api/1.0/tasks/${task.gid}`,
          {
            headers: {
              'Authorization': `Bearer ${ASANA_TOKEN}`
            }
          }
        ).then(res => res.json());

        const card = await fetch(
          `https://api.trello.com/1/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: taskDetails.data.name,
              desc: taskDetails.data.notes,
              idList: list.id
            })
          }
        ).then(res => res.json());

        console.log('Created card:', card.name);
      }
    }

    console.log('Migration from Asana to Trello completed!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Executar as migrações
console.log('Starting Trello to Asana migration...');
await migrateFromTrelloToAsana();

console.log('\nStarting Asana to Trello migration...');
await migrateFromAsanaToTrello(); 