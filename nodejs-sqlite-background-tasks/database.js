// database.js

const sqlite3 = require('sqlite3').verbose();
const DB_SOURCE = "tasks.db"; // Nome do arquivo do banco de dados

// Abre (ou cria) o banco de dados
let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        // Não foi possível abrir o banco de dados
        console.error(err.message);
        throw err;
    } else {
        console.log('Conectado ao banco de dados SQLite.');

        // Cria a tabela de tarefas se ela não existir
        db.run(`CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            payload TEXT,
            status TEXT DEFAULT 'pending',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            processedAt DATETIME
        )`, (err) => {
            if (err) {
                // Tabela já existe ou outro erro
                console.log('Tabela tasks já existe ou erro ao criar:', err.message);
            } else {
                console.log('Tabela tasks criada com sucesso.');
            }
        });
    }
});

module.exports = db;