'use client';

import styled from 'styled-components';
import { IconBrandTrello, IconBrandAsana, IconArrowRight } from '@tabler/icons-react';

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  background: #1e2a3b;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MappingTable = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  div {
    color: #fff;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      width: 20px;
      height: 20px;
      opacity: 0.8;
    }
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
  }

  .rules {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    font-style: italic;
  }
`;

export default function MapeamentoPage() {
  const mappings = [
    {
      trello: 'Board',
      asana: 'Project',
      rules: 'Conversão direta'
    },
    {
      trello: 'List',
      asana: 'Section',
      rules: 'Conversão direta'
    },
    {
      trello: 'Card',
      asana: 'Task',
      rules: 'Conversão direta'
    },
    {
      trello: 'Card Name',
      asana: 'Task Name',
      rules: 'Conversão direta'
    },
    {
      trello: 'Card Description',
      asana: 'Task Description',
      rules: 'Preservar formatação markdown'
    },
    {
      trello: 'Due Date',
      asana: 'Due Date',
      rules: 'Converter timezone se necessário'
    },
    {
      trello: 'Labels',
      asana: 'Tags',
      rules: 'Criar tags correspondentes no Asana'
    },
    {
      trello: 'Members',
      asana: 'Assignees',
      rules: 'Mapear usuários correspondentes'
    },
    {
      trello: 'Checklists',
      asana: 'Subtasks',
      rules: 'Converter cada item do checklist em subtask'
    },
    {
      trello: 'Attachments',
      asana: 'Attachments',
      rules: 'Fazer upload dos arquivos para o Asana'
    },
    {
      trello: 'Comments',
      asana: 'Comments',
      rules: 'Preservar autor e data original'
    },
    {
      trello: 'Card Position',
      asana: 'Task Order',
      rules: 'Manter ordem relativa dos cards'
    }
  ];

  return (
    <PageWrapper>
      <Title>Mapeamento De-Para: Trello → Asana</Title>
      
      <MappingTable>
        <TableHeader>
          <div>
            <IconBrandTrello />
            Campo Trello (Origem)
          </div>
          <div></div>
          <div>
            <IconBrandAsana />
            Campo Asana (Destino)
          </div>
          <div>Regras de Conversão</div>
        </TableHeader>
        
        {mappings.map((mapping, index) => (
          <TableRow key={index}>
            <div>{mapping.trello}</div>
            <div className="arrow">
              <IconArrowRight />
            </div>
            <div>{mapping.asana}</div>
            <div className="rules">{mapping.rules}</div>
          </TableRow>
        ))}
      </MappingTable>
    </PageWrapper>
  );
} 