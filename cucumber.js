const dotenv = require('dotenv');
const path = require('path');

// Carregar as variáveis de ambiente do arquivo .env.test
dotenv.config({ path: path.resolve(__dirname, '.env.test') });

let common = [
    'src/tests/bdd/features/**/*.feature',
    '--require-module ts-node/register', //typescript cucumber
    '--require src/tests/bdd/features/steps_definition/**/*.ts',
    '--format progress-bar',    
    `--format-options '{"snippetInterface": "synchronous"}'`,
    '--require src/tests/bdd/support/**/*.ts', // Arquivos de suporte    
  ].join(' ');

module.exports = {
    default: common,
    timeout: 60000
}