'use client';

import { useState, ChangeEvent } from 'react';
import { useIntegration } from '@/hooks/useIntegration';
import { useConnectionTest } from '@/hooks/useConnectionTest';
import { Header } from '@/components/Header';
import { Container, Card, CardTitle, FormGrid, FormGroup, Label, Select, Button, MainGrid } from '@/styles/components';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { IntegrationStatus } from '@/components/IntegrationStatus';
import { TrelloIcon, LayoutGrid } from 'lucide-react';
import { TrelloBoard } from '@/types/trello';
import { AsanaWorkspace } from '@/types/asana';

export default function Home() {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const { 
    trelloStatus, 
    asanaStatus, 
    trelloData, 
    asanaData, 
    isLoading: isTestingConnection,
    retryTrello,
    retryAsana,
  } = useConnectionTest();

  const {
    selectedBoard,
    setSelectedBoard,
    selectedWorkspace,
    setSelectedWorkspace,
    trelloBoards,
    asanaWorkspaces,
    isLoadingTrello,
    isLoadingAsana,
    isSyncing,
    sync,
  } = useIntegration({
    onSuccess: () => {
      setSuccess(true);
      setError(undefined);
    },
    onError: (error) => {
      setError(error.message);
      setSuccess(false);
    },
  });

  if (isTestingConnection) {
    return <LoadingSpinner />;
  }

  const handleBoardChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBoard(e.target.value);
  };

  const handleWorkspaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkspace(e.target.value);
  };

  return (
    <>
      <Header
        trelloStatus={trelloStatus}
        asanaStatus={asanaStatus}
        trelloUser={trelloData?.success ? trelloData.userData : undefined}
        asanaUser={asanaData?.success ? asanaData.userData : undefined}
        onRetryTrello={() => retryTrello()}
        onRetryAsana={() => retryAsana()}
      />
      <Container>
        <MainGrid>
          <Card>
            <CardTitle>
              <TrelloIcon />
              Configuração da Integração
            </CardTitle>
            <FormGrid>
              <FormGroup>
                <Label>
                  <TrelloIcon />
                  Quadro do Trello
                </Label>
                <Select
                  value={selectedBoard}
                  onChange={handleBoardChange}
                  disabled={trelloStatus !== 'connected'}
                >
                  <option value="">Selecione um quadro</option>
                  {(trelloBoards as TrelloBoard[] | undefined)?.map((board) => (
                    <option key={board.id} value={board.id}>
                      {board.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>
                  <LayoutGrid />
                  Workspace do Asana
                </Label>
                <Select
                  value={selectedWorkspace}
                  onChange={handleWorkspaceChange}
                  disabled={asanaStatus !== 'connected'}
                >
                  <option value="">Selecione um workspace</option>
                  {(asanaWorkspaces as AsanaWorkspace[] | undefined)?.map((workspace) => (
                    <option key={workspace.gid} value={workspace.gid}>
                      {workspace.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </FormGrid>

            <Button
              onClick={() => sync()}
              disabled={
                !selectedBoard || 
                !selectedWorkspace || 
                isSyncing || 
                trelloStatus !== 'connected' || 
                asanaStatus !== 'connected'
              }
              $loading={isSyncing}
            >
              {isSyncing ? 'Sincronizando...' : 'Iniciar Integração'}
            </Button>

            {(error || success) && (
              <IntegrationStatus
                isLoading={isSyncing}
                error={error}
                success={success}
              />
            )}
          </Card>
        </MainGrid>
      </Container>
    </>
  );
} 