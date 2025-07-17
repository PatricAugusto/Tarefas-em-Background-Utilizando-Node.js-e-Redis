// taskProducer.js

const db = require('./database'); // Importa a instância do banco de dados

/**
 * Adiciona uma nova tarefa à fila no banco de dados.
 * @param {string} type - O tipo da tarefa (ex: 'sendEmail', 'processImage').
 * @param {object} payload - Um objeto contendo os dados específicos da tarefa.
 * @returns {Promise<number>} - Uma Promise que resolve com o ID da tarefa inserida.
 */
function addTask(type, payload) {
    return new Promise((resolve, reject) => {
        // Converte o payload (objeto) para uma string JSON
        const payloadString = JSON.stringify(payload);

        // SQL para inserir uma nova tarefa
        const sql = `INSERT INTO tasks (type, payload, status) VALUES (?, ?, 'pending')`;
        const params = [type, payloadString];

        db.run(sql, params, function(err) {
            if (err) {
                console.error('Erro ao adicionar tarefa:', err.message);
                return reject(err);
            }
            // this.lastID contém o ID da última linha inserida
            console.log(`Tarefa '${type}' com ID ${this.lastID} adicionada.`);
            resolve(this.lastID);
        });
    });
}

// Exporta a função para que possa ser usada em outros arquivos
module.exports = {
    addTask
};