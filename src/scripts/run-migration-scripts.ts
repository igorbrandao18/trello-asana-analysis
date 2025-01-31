#!/usr/bin/env node
import { migrationScripts } from './migration-data';

async function main() {
  const command = process.argv[2];

  if (!command) {
    console.log(`
Por favor, especifique um comando:
  cleanup  - Limpa todos os dados existentes
  populate - Cria dados de exemplo
  reset    - Limpa e recria os dados (cleanup + populate)
    `);
    process.exit(1);
  }

  try {
    switch (command) {
      case 'cleanup':
        await migrationScripts.cleanup();
        break;
      case 'populate':
        await migrationScripts.populate();
        break;
      case 'reset':
        console.log('🧹 Limpando dados existentes...');
        await migrationScripts.cleanup();
        console.log('🌱 Criando novos dados...');
        await migrationScripts.populate();
        console.log('✨ Reset completo!');
        break;
      default:
        console.log('Comando inválido. Use: cleanup, populate ou reset');
        process.exit(1);
    }
  } catch (error) {
    console.error('Erro ao executar script:', error);
    process.exit(1);
  }
}

main(); 