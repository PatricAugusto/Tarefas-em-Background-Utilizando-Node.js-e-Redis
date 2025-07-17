# 🗂️ Sistema de Tarefas em Background com Node.js e SQLite

Este projeto demonstra a criação de um sistema simples de tarefas em background (background jobs) utilizando **Node.js** como ambiente de execução e **SQLite** para persistência das tarefas.  
O sistema é composto por um **produtor** de tarefas que as enfileira em um banco de dados e um **worker** que as processa de forma assíncrona.

---

## 🚀 Funcionalidades

- **Enfileiramento de Tarefas**: Adiciona tarefas a um banco SQLite com status `pending`.
- **Processamento Assíncrono**: Um worker dedicado processa tarefas em segundo plano.
- **Atualização de Status**: Os status das tarefas são atualizados (`pending`, `processing`, `completed`, `failed`).
- **Flexibilidade**: Suporte a múltiplos tipos de tarefas com dados personalizados (payloads).

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **SQLite**: Banco de dados relacional leve e embutido.
- **sqlite3**: Biblioteca Node.js para interação com o SQLite.

---

## 📦 Estrutura do Projeto

```
nodejs-sqlite-background-tasks/
├── app.js # Aplicação principal (produtor de tarefas)
├── database.js # Configuração e inicialização do banco SQLite
├── package.json # Definições do projeto e dependências
├── package-lock.json # Gerado automaticamente pelo npm
├── README.md # Documentação do projeto
├── tasks.db # Arquivo do banco de dados (gerado automaticamente)
├── taskProducer.js # Módulo para adicionar tarefas
└── taskWorker.js # Worker que processa tarefas em background
```


---

## ⚙️ Como Configurar e Rodar

### Pré-requisitos

- Node.js instalado (versão LTS recomendada)
- npm (vem junto com o Node.js)

### Instalação

1. Clone o repositório (ou crie os arquivos e pastas conforme acima).
2. Navegue até o diretório:

```bash
cd nodejs-sqlite-background-tasks
```

3. Instale as dependências:

```bash
npm install
```

### Inicializar o Banco de Dados
Execute o script para criar o arquivo tasks.db e a tabela tasks:

```bash
node database.js
```
Você verá mensagens indicando a criação do banco ou a existência da tabela.

## ▶️ Rodando o Projeto

Abra dois terminais separados para executar as duas partes do sistema:

1. Iniciar o Worker:

```bash
node TaskWorker.js
```
Este terminal ficará escutando por novas tarefas e processará

2. Iniciar a Aplicação Principal (Produtor de Tarefas)

```bash
node app.js
```
Este script irá adicionar tarefas ao banco de dados. Você verá longe tanto de envio quanto de processamento

## 📖 Como Funciona

- **database.js**
Conecta ao SQLite e cria a tabela tasks com colunas como:
id, type, payload, status, createdAt, processedAt.
- **taskProducer.js**
Contém a função addTask(type, payload) que insere tarefas com status pending.

- **app.js**
Exemplo de uso que enfileira tarefas fictícias (e-mail, relatório, imagem, etc).

- **taskWorker.js**
    - Usa setInterval para buscar tarefas pendentes.
    - Marca como processing, processa, e depois atualiza para completed ou failed.
    - Desserializa o payload e simula ações com switch/case.

## 🔎 Verificando o Banco de Dados

Para inspecionar o conteúdo de tasks.db, utilize ferramentas como:

- DB Browser for SQLite

Você poderá ver a tabela tasks, com os registros e seus respectivos status.

## 🤝 Contribuição
1. Contribuições são bem-vindas!

2. Faça um fork do projeto

3. Crie sua branch: git checkout -b minha-feature

4. Commit: git commit -m 'feat: adiciona nova feature'

5. Push: git push origin minha-feature

6. Abra um Pull Request
