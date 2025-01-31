'use client';

import styled from 'styled-components';
import { 
  IconBrandTrello, 
  IconBrandAsana, 
  IconArrowRight,
  IconCards,
  IconList,
  IconLayoutBoard,
  IconChecklist,
  IconUsers,
  IconTags,
  IconCalendarTime,
  IconMessageCircle,
  IconPaperclip
} from '@tabler/icons-react';

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  background: #1e2a3b;
  overflow-y: auto;
  padding: 2rem;
  color: #fff;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.75rem;
  margin-bottom: 2rem;
  color: #fff;

  .icons {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      width: 32px;
      height: 32px;

      &:first-child {
        color: #0079bf;
      }

      &:last-child {
        color: #f06a6a;
      }
    }
  }
`;

const FlowSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FlowTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    width: 24px;
    height: 24px;
    opacity: 0.9;
  }
`;

const FlowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const SystemBox = styled.div<{ system: 'trello' | 'asana' }>`
  background: ${props => props.system === 'trello' ? 'rgba(0, 121, 191, 0.1)' : 'rgba(240, 106, 106, 0.1)'};
  border: 1px solid ${props => props.system === 'trello' ? 'rgba(0, 121, 191, 0.2)' : 'rgba(240, 106, 106, 0.2)'};
  border-radius: 8px;
  padding: 1.5rem;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      width: 20px;
      height: 20px;
      color: ${props => props.system === 'trello' ? '#0079bf' : '#f06a6a'};
    }
  }
`;

const MappingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MappingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;

  svg {
    width: 18px;
    height: 18px;
    opacity: 0.7;
  }
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: rgba(255, 255, 255, 0.4);
  }
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Step = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.25rem;

  h4 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    color: #fff;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }
`;

export default function FlowPage() {
  return (
    <PageWrapper>
      <Title>
        <span className="icons">
          <IconBrandTrello />
          <IconArrowRight />
          <IconBrandAsana />
        </span>
        Fluxo de Integração
      </Title>

      <FlowSection>
        <FlowTitle>
          <IconLayoutBoard />
          Mapeamento de Recursos
        </FlowTitle>

        <FlowGrid>
          <SystemBox system="trello">
            <h3>
              <IconBrandTrello />
              Trello
            </h3>
            <MappingList>
              <MappingItem>
                <IconLayoutBoard />
                Board
              </MappingItem>
              <MappingItem>
                <IconList />
                Lista
              </MappingItem>
              <MappingItem>
                <IconCards />
                Card
              </MappingItem>
              <MappingItem>
                <IconChecklist />
                Checklist
              </MappingItem>
              <MappingItem>
                <IconUsers />
                Membros
              </MappingItem>
              <MappingItem>
                <IconTags />
                Labels
              </MappingItem>
              <MappingItem>
                <IconCalendarTime />
                Due Date
              </MappingItem>
              <MappingItem>
                <IconMessageCircle />
                Comentários
              </MappingItem>
              <MappingItem>
                <IconPaperclip />
                Anexos
              </MappingItem>
            </MappingList>
          </SystemBox>

          <Arrow>
            <IconArrowRight />
          </Arrow>

          <SystemBox system="asana">
            <h3>
              <IconBrandAsana />
              Asana
            </h3>
            <MappingList>
              <MappingItem>
                <IconLayoutBoard />
                Projeto
              </MappingItem>
              <MappingItem>
                <IconList />
                Seção
              </MappingItem>
              <MappingItem>
                <IconCards />
                Task
              </MappingItem>
              <MappingItem>
                <IconChecklist />
                Subtasks
              </MappingItem>
              <MappingItem>
                <IconUsers />
                Followers
              </MappingItem>
              <MappingItem>
                <IconTags />
                Tags
              </MappingItem>
              <MappingItem>
                <IconCalendarTime />
                Due Date
              </MappingItem>
              <MappingItem>
                <IconMessageCircle />
                Comentários
              </MappingItem>
              <MappingItem>
                <IconPaperclip />
                Attachments
              </MappingItem>
            </MappingList>
          </SystemBox>
        </FlowGrid>

        <ProcessSteps>
          <Step>
            <h4>1. Autenticação</h4>
            <p>O processo inicia com a autenticação nas duas plataformas. Para o Trello, é necessário um API Key e Token, enquanto o Asana requer um Personal Access Token.</p>
          </Step>

          <Step>
            <h4>2. Seleção do Board</h4>
            <p>O usuário seleciona o Board do Trello que deseja migrar. O sistema lista todos os boards disponíveis através da API do Trello.</p>
          </Step>

          <Step>
            <h4>3. Criação do Projeto</h4>
            <p>Um novo projeto é criado no Asana com base nas informações do Board do Trello, mantendo o nome e descrição originais.</p>
          </Step>

          <Step>
            <h4>4. Migração de Listas</h4>
            <p>As listas do Trello são convertidas em seções no Asana, mantendo a ordem original e o status (ativas/arquivadas).</p>
          </Step>

          <Step>
            <h4>5. Migração de Cards</h4>
            <p>Cada card do Trello é convertido em uma task no Asana, preservando título, descrição, anexos, comentários e atribuições.</p>
          </Step>

          <Step>
            <h4>6. Validação</h4>
            <p>O sistema verifica se todos os elementos foram migrados corretamente e gera um relatório de status da migração.</p>
          </Step>
        </ProcessSteps>
      </FlowSection>
    </PageWrapper>
  );
} 