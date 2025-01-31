'use client';

import styled from 'styled-components';
import { IconBrandAsana, IconCode, IconBrackets, IconLock, IconKey } from '@tabler/icons-react';
import { useState } from 'react';

// Reutilizando os mesmos estilos do Trello
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
    color: #f06a6a;
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
    background: rgba(240, 106, 106, 0.1);
    border: 1px solid rgba(240, 106, 106, 0.2);
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
  border-left: 2px solid ${props => props.active ? '#f06a6a' : 'transparent'};
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
    background: #f06a6a;
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
      background: #f06a6a;
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
    background: rgba(240, 106, 106, 0.1);
    border: 1px solid rgba(240, 106, 106, 0.2);
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

export default function AsanaEndpointsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);

  const endpoints = [
    {
      method: 'GET',
      path: '/api/1.0/workspaces',
      description: 'Obtém todos os workspaces',
      details: 'Retorna uma lista de todos os workspaces aos quais o usuário tem acesso.',
      auth: true,
      params: [
        {
          name: 'limit',
          type: 'number',
          description: 'Número máximo de resultados a retornar'
        },
        {
          name: 'offset',
          type: 'string',
          description: 'Token de paginação para a próxima página'
        }
      ],
      example: 'GET /api/1.0/workspaces?limit=50',
      response: `{
  "data": [
    {
      "gid": "12345",
      "name": "Minha Empresa",
      "resource_type": "workspace",
      "email_domains": ["minhaempresa.com"],
      "is_organization": true,
      "created_at": "2023-01-01T12:00:00.000Z",
      "permalink_url": "https://app.asana.com/0/12345",
      "is_free_for_guests": false
    }
  ]
}`
    },
    {
      method: 'GET',
      path: '/api/1.0/projects',
      description: 'Obtém todos os projetos',
      details: 'Retorna uma lista de projetos em um workspace específico.',
      auth: true,
      params: [
        {
          name: 'workspace',
          type: 'string',
          description: 'GID do workspace'
        },
        {
          name: 'archived',
          type: 'boolean',
          description: 'Incluir projetos arquivados'
        },
        {
          name: 'opt_fields',
          type: 'string',
          description: 'Lista de campos a incluir na resposta'
        }
      ],
      example: 'GET /api/1.0/projects?workspace=12345&archived=false',
      response: `{
  "data": [
    {
      "gid": "67890",
      "name": "Website Redesign",
      "resource_type": "project",
      "archived": false,
      "color": "light-green",
      "created_at": "2023-01-01T12:00:00.000Z",
      "current_status": {
        "text": "Em andamento",
        "color": "blue",
        "type": "on_track"
      },
      "due_date": "2023-12-31",
      "members": [
        {
          "gid": "12345",
          "name": "João Silva",
          "email": "joao@empresa.com"
        }
      ],
      "owner": {
        "gid": "12345",
        "name": "João Silva",
        "email": "joao@empresa.com"
      },
      "permalink_url": "https://app.asana.com/0/67890",
      "public": false,
      "workspace": {
        "gid": "12345",
        "name": "Minha Empresa",
        "resource_type": "workspace"
      }
    }
  ]
}`
    },
    {
      method: 'POST',
      path: '/api/1.0/projects',
      description: 'Cria um novo projeto',
      details: 'Cria um novo projeto em um workspace específico.',
      auth: true,
      params: [
        {
          name: 'name',
          type: 'string',
          description: 'Nome do projeto'
        },
        {
          name: 'workspace',
          type: 'string',
          description: 'GID do workspace'
        },
        {
          name: 'team',
          type: 'string',
          description: 'GID do time (opcional)'
        },
        {
          name: 'due_date',
          type: 'string',
          description: 'Data de vencimento (YYYY-MM-DD)'
        }
      ],
      example: `POST /api/1.0/projects
{
  "data": {
    "name": "Novo Projeto",
    "workspace": "12345",
    "due_date": "2023-12-31"
  }
}`,
      response: `{
  "data": {
    "gid": "67890",
    "name": "Novo Projeto",
    "resource_type": "project",
    "archived": false,
    "color": "light-green",
    "created_at": "2023-01-01T12:00:00.000Z",
    "due_date": "2023-12-31",
    "permalink_url": "https://app.asana.com/0/67890",
    "public": false,
    "workspace": {
      "gid": "12345",
      "name": "Minha Empresa",
      "resource_type": "workspace"
    }
  }
}`
    },
    {
      method: 'POST',
      path: '/api/1.0/sections',
      description: 'Cria uma nova seção',
      details: 'Cria uma nova seção em um projeto específico.',
      auth: true,
      params: [
        {
          name: 'name',
          type: 'string',
          description: 'Nome da seção'
        },
        {
          name: 'project',
          type: 'string',
          description: 'GID do projeto'
        },
        {
          name: 'insert_before',
          type: 'string',
          description: 'GID da seção antes da qual inserir (opcional)'
        },
        {
          name: 'insert_after',
          type: 'string',
          description: 'GID da seção após a qual inserir (opcional)'
        }
      ],
      example: `POST /api/1.0/sections
{
  "data": {
    "name": "Nova Seção",
    "project": "67890"
  }
}`,
      response: `{
  "data": {
    "gid": "13579",
    "name": "Nova Seção",
    "resource_type": "section",
    "created_at": "2023-01-01T12:00:00.000Z",
    "project": {
      "gid": "67890",
      "name": "Website Redesign",
      "resource_type": "project"
    }
  }
}`
    },
    {
      method: 'POST',
      path: '/api/1.0/tasks',
      description: 'Cria uma nova task',
      details: 'Cria uma nova task em um projeto ou seção específica.',
      auth: true,
      params: [
        {
          name: 'name',
          type: 'string',
          description: 'Nome da task'
        },
        {
          name: 'projects',
          type: 'array',
          description: 'Lista de GIDs dos projetos'
        },
        {
          name: 'section',
          type: 'string',
          description: 'GID da seção'
        },
        {
          name: 'notes',
          type: 'string',
          description: 'Descrição da task'
        },
        {
          name: 'due_on',
          type: 'string',
          description: 'Data de vencimento (YYYY-MM-DD)'
        },
        {
          name: 'assignee',
          type: 'string',
          description: 'GID do usuário responsável'
        }
      ],
      example: `POST /api/1.0/tasks
{
  "data": {
    "name": "Implementar Login Social",
    "projects": ["67890"],
    "section": "13579",
    "notes": "Adicionar opções de login com Google e GitHub",
    "due_on": "2023-12-31",
    "assignee": "12345"
  }
}`,
      response: `{
  "data": {
    "gid": "24680",
    "name": "Implementar Login Social",
    "resource_type": "task",
    "created_at": "2023-01-01T12:00:00.000Z",
    "completed": false,
    "due_on": "2023-12-31",
    "notes": "Adicionar opções de login com Google e GitHub",
    "assignee": {
      "gid": "12345",
      "name": "João Silva",
      "email": "joao@empresa.com"
    },
    "projects": [
      {
        "gid": "67890",
        "name": "Website Redesign",
        "resource_type": "project"
      }
    ],
    "permalink_url": "https://app.asana.com/0/67890/24680",
    "tags": [],
    "workspace": {
      "gid": "12345",
      "name": "Minha Empresa",
      "resource_type": "workspace"
    }
  }
}`
    }
  ];

  const endpoint = endpoints[selectedEndpoint];

  return (
    <PageWrapper>
      <Sidebar>
        <Logo>
          <IconBrandAsana />
          Endpoints do Asana
        </Logo>

        <ApiInfo>
          <div className="base-url">
            https://app.asana.com
          </div>
          <div className="auth-info">
            <h4>
              <IconKey />
              Autenticação
            </h4>
            <p>
              <IconLock />
              Personal Access Token necessário
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