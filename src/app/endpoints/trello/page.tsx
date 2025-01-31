'use client';

import styled from 'styled-components';
import { IconBrandTrello, IconCode, IconBrackets, IconLock, IconKey, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  display: grid;
  grid-template-columns: 300px 1fr;
  background: #1e2a3b;
  overflow: hidden;
`;

const Sidebar = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  overflow-y: auto;
`;

const Content = styled.div`
  padding: 2rem;
  overflow-y: auto;
`;

const Logo = styled.div`
  padding: 0 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;

  svg {
    width: 24px;
    height: 24px;
    color: #0079bf;
  }
`;

const ApiInfo = styled.div`
  padding: 0 2rem;
  margin-bottom: 2rem;

  .base-url {
    font-family: monospace;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.75rem;
    border-radius: 6px;
    color: #fff;
    font-size: 0.875rem;
  }

  .auth-info {
    margin-top: 1rem;
    padding: 0.75rem;
    background: rgba(0, 100, 255, 0.1);
    border: 1px solid rgba(0, 100, 255, 0.2);
    border-radius: 6px;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);

    h4 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.5rem;
      font-size: 0.875rem;
      color: #fff;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    p {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.7);
      
      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`;

const EndpointList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const EndpointItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 2rem;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  border-left: 2px solid ${props => props.active ? '#0079bf' : 'transparent'};
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }

  .method {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    background: #0079bf;
    color: #fff;
  }

  .path {
    font-family: monospace;
    font-size: 0.875rem;
  }
`;

const EndpointDetails = styled.div`
  h2 {
    color: #fff;
    font-size: 1.5rem;
    margin: 0 0 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    .method {
      font-size: 0.875rem;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      background: #0079bf;
    }

    .path {
      font-family: monospace;
      opacity: 0.9;
    }
  }

  .description {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;

  h3 {
    color: #fff;
    font-size: 1rem;
    margin: 0 0 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      width: 18px;
      height: 18px;
      opacity: 0.9;
    }
  }
`;

const ParamTable = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  .header {
    display: grid;
    grid-template-columns: 150px 100px 1fr;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .param {
    display: grid;
    grid-template-columns: 150px 100px 1fr;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.875rem;

    &:last-child {
      border-bottom: none;
    }

    .name {
      color: #60a5fa;
      font-family: monospace;
    }

    .type {
      color: #34d399;
    }

    .desc {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const CodeBlock = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  overflow-x: auto;

  &.example {
    background: rgba(0, 100, 255, 0.1);
    border: 1px solid rgba(0, 100, 255, 0.2);
  }

  .string { color: #7ee787; }
  .number { color: #79c0ff; }
  .boolean { color: #ff7b72; }
  .null { color: #ff7b72; }
  .key { 
    color: #d2a8ff; 
    font-weight: 500;
  }
`;

function formatJSON(json: string): string {
  return json.replace(
    /(".*?":|{|}|\[|\]|null|true|false|\d+(\.\d+)?)/g,
    (match) => {
      if (match.endsWith(':')) return '<span class="key">' + match + '</span>';
      if (match.startsWith('"')) return '<span class="string">' + match + '</span>';
      if (match === 'null') return '<span class="null">' + match + '</span>';
      if (match === 'true' || match === 'false') return '<span class="boolean">' + match + '</span>';
      if (!isNaN(Number(match))) return '<span class="number">' + match + '</span>';
      return match;
    }
  );
}

export default function TrelloEndpointsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);

  const endpoints = [
    {
      method: 'GET',
      path: '/1/members/me/boards',
      description: 'Obtém todos os quadros do usuário',
      details: 'Retorna uma lista de todos os quadros aos quais o usuário tem acesso. Inclui quadros pessoais e de organizações.',
      auth: true,
      params: [
        {
          name: 'filter',
          type: 'string',
          description: 'all | open | closed | organization | public | starred'
        },
        {
          name: 'fields',
          type: 'string',
          description: 'Campos a serem retornados (id, name, desc, etc)'
        }
      ],
      example: 'GET /1/members/me/boards?fields=id,name,desc&filter=open',
      response: `[
  {
    "id": "60d1f5f5f5f5f5f5f5f5f5f5",
    "name": "Projeto Website",
    "desc": "Desenvolvimento do novo website corporativo",
    "closed": false,
    "idOrganization": "60d1f5f5f5f5f5f5f5f5f5f5",
    "url": "https://trello.com/b/abc123/projeto-website",
    "shortUrl": "https://trello.com/b/abc123",
    "dateLastActivity": "2023-01-01T12:00:00.000Z",
    "idMemberCreator": "60d1f5f5f5f5f5f5f5f5f5f5",
    "subscribed": false,
    "starred": true,
    "memberships": [
      {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "idMember": "60d1f5f5f5f5f5f5f5f5f5f5",
        "memberType": "admin",
        "unconfirmed": false,
        "deactivated": false
      }
    ],
    "prefs": {
      "permissionLevel": "private",
      "hideVotes": false,
      "voting": "disabled",
      "comments": "members",
      "background": "blue",
      "cardCovers": true
    }
  }
]`
    },
    {
      method: 'GET',
      path: '/1/boards/{id}/lists',
      description: 'Obtém todas as listas de um quadro',
      details: 'Retorna todas as listas de um quadro específico, incluindo listas arquivadas se solicitado.',
      auth: true,
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'ID do quadro'
        },
        {
          name: 'cards',
          type: 'string',
          description: 'none | open | closed | all'
        },
        {
          name: 'filter',
          type: 'string',
          description: 'all | open | closed'
        }
      ],
      example: 'GET /1/boards/60d1f5f5/lists?cards=open&filter=open',
      response: `[
  {
    "id": "60d1f5f5f5f5f5f5f5f5f5f5",
    "name": "Em Desenvolvimento",
    "closed": false,
    "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
    "pos": 65535.0,
    "subscribed": false,
    "softLimit": null,
    "status": "active",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z",
    "cards": [
      {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "name": "Implementar Login Social",
        "pos": 65535.0
      }
    ]
  },
  {
    "id": "60d1f5f5f5f5f5f5f5f5f5f6",
    "name": "Em Teste",
    "closed": false,
    "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
    "pos": 131070.0,
    "subscribed": false,
    "softLimit": null,
    "status": "active",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z",
    "cards": []
  }
]`
    },
    {
      method: 'GET',
      path: '/1/lists/{id}/cards',
      description: 'Obtém todos os cards de uma lista',
      details: 'Retorna todos os cards de uma lista específica, com opções para filtrar por status e incluir campos adicionais.',
      auth: true,
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'ID da lista'
        },
        {
          name: 'fields',
          type: 'string',
          description: 'Campos a serem incluídos na resposta'
        },
        {
          name: 'attachments',
          type: 'boolean',
          description: 'Incluir anexos'
        }
      ],
      example: 'GET /1/lists/60d1f5f5/cards?fields=name,desc,due&attachments=true',
      response: `[
  {
    "id": "60d1f5f5f5f5f5f5f5f5f5f5",
    "name": "Implementar Login Social",
    "desc": "Adicionar opções de login com Google e GitHub",
    "closed": false,
    "idList": "60d1f5f5f5f5f5f5f5f5f5f5",
    "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
    "pos": 65535.0,
    "due": "2023-01-01T12:00:00.000Z",
    "dueComplete": false,
    "dateLastActivity": "2023-01-01T12:00:00.000Z",
    "labels": [
      {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
        "name": "Prioridade Alta",
        "color": "red"
      }
    ],
    "members": [
      {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "fullName": "João Silva",
        "username": "joaosilva",
        "avatarUrl": "https://trello.com/avatars/user.jpg"
      }
    ],
    "attachments": [
      {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "name": "especificacao.pdf",
        "url": "https://trello.com/attachments/60d1f5f5/download/especificacao.pdf",
        "bytes": 1024000,
        "date": "2023-01-01T12:00:00.000Z",
        "mimeType": "application/pdf"
      }
    ]
  }
]`
    },
    {
      method: 'GET',
      path: '/1/cards/{id}',
      description: 'Obtém detalhes de um card específico',
      details: 'Retorna informações detalhadas de um card, incluindo anexos, checklists, comentários e atividades.',
      auth: true,
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'ID do card'
        },
        {
          name: 'attachments',
          type: 'boolean',
          description: 'Incluir anexos'
        },
        {
          name: 'checklists',
          type: 'string',
          description: 'all | none'
        }
      ],
      example: 'GET /1/cards/60d1f5f5?attachments=true&checklists=all',
      response: `{
  "id": "60d1f5f5f5f5f5f5f5f5f5f5",
  "name": "Implementar Login Social",
  "desc": "Adicionar opções de login com Google e GitHub",
  "closed": false,
  "idList": "60d1f5f5f5f5f5f5f5f5f5f5",
  "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
  "pos": 65535.0,
  "due": "2023-01-01T12:00:00.000Z",
  "dueComplete": false,
  "dateLastActivity": "2023-01-01T12:00:00.000Z",
  "labels": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
      "name": "Prioridade Alta",
      "color": "red"
    }
  ],
  "members": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "fullName": "João Silva",
      "username": "joaosilva",
      "avatarUrl": "https://trello.com/avatars/user.jpg"
    }
  ],
  "attachments": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "name": "especificacao.pdf",
      "url": "https://trello.com/attachments/60d1f5f5/download/especificacao.pdf",
      "bytes": 1024000,
      "date": "2023-01-01T12:00:00.000Z",
      "mimeType": "application/pdf"
    }
  ],
  "checklists": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "name": "Requisitos",
      "checkItems": [
        {
          "id": "60d1f5f5f5f5f5f5f5f5f5f5",
          "name": "Configurar OAuth Google",
          "state": "complete",
          "due": "2023-01-01T12:00:00.000Z"
        },
        {
          "id": "60d1f5f5f5f5f5f5f5f5f5f5",
          "name": "Implementar callback GitHub",
          "state": "incomplete",
          "due": "2023-01-02T12:00:00.000Z"
        }
      ]
    }
  ],
  "comments": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "text": "API keys configuradas no ambiente de desenvolvimento",
      "creator": {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "fullName": "João Silva",
        "username": "joaosilva"
      },
      "date": "2023-01-01T12:00:00.000Z"
    }
  ],
  "customFields": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "value": {
        "text": "Alta"
      },
      "idCustomField": "60d1f5f5f5f5f5f5f5f5f5f5",
      "idModel": "60d1f5f5f5f5f5f5f5f5f5f5",
      "modelType": "card"
    }
  ],
  "subscribed": true,
  "url": "https://trello.com/c/abc123/implementar-login-social",
  "shortUrl": "https://trello.com/c/abc123"
}`
    }
  ];

  const endpoint = endpoints[selectedEndpoint];

  return (
    <PageWrapper>
      <Sidebar>
        <Logo>
          <IconBrandTrello />
          Endpoints do Trello
        </Logo>

        <ApiInfo>
          <div className="base-url">
            https://api.trello.com
          </div>
          <div className="auth-info">
            <h4>
              <IconKey />
              Autenticação
            </h4>
            <p>
              <IconLock />
              API Key + Token necessários
            </p>
          </div>
        </ApiInfo>

        <EndpointList>
          {endpoints.map((ep, index) => (
            <EndpointItem
              key={index}
              active={index === selectedEndpoint}
              onClick={() => setSelectedEndpoint(index)}
            >
              <span className="method">{ep.method}</span>
              <span className="path">{ep.path}</span>
            </EndpointItem>
          ))}
        </EndpointList>
      </Sidebar>

      <Content>
        <EndpointDetails>
          <h2>
            <span className="method">{endpoint.method}</span>
            <span className="path">{endpoint.path}</span>
          </h2>
          <p className="description">{endpoint.details}</p>

          <Section>
            <h3>
              <IconBrackets />
              Parâmetros
            </h3>
            <ParamTable>
              <div className="header">
                <div>Nome</div>
                <div>Tipo</div>
                <div>Descrição</div>
              </div>
              {endpoint.params.map((param, idx) => (
                <div key={idx} className="param">
                  <div className="name">{param.name}</div>
                  <div className="type">{param.type}</div>
                  <div className="desc">{param.description}</div>
                </div>
              ))}
            </ParamTable>
          </Section>

          <Section>
            <h3>
              <IconCode />
              Exemplo de Requisição
            </h3>
            <CodeBlock className="example">
              {endpoint.example}
            </CodeBlock>
          </Section>

          <Section>
            <h3>
              <IconBrackets />
              Resposta
            </h3>
            <CodeBlock 
              dangerouslySetInnerHTML={{ 
                __html: formatJSON(endpoint.response)
              }} 
            />
          </Section>
        </EndpointDetails>
      </Content>
    </PageWrapper>
  );
} 