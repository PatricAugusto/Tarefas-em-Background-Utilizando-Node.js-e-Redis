// taskWorker.js

const db = require('./database'); // Importa a instância do banco de dados

// Função para simular o processamento de uma tarefa
async function processTask(task) {
    console.log(`[Worker] Processando tarefa ID: ${task.id}, Tipo: ${task.type}`);

    // Parse do payload de volta para um objeto JavaScript
    const payload = JSON.parse(task.payload);

    try {
        // Lógica de processamento baseada no tipo da tarefa
        switch (task.type) {
            case 'sendEmail':
                console.log(`[Worker] Enviando e-mail para: ${payload.to}`);
                // Simula um atraso para o envio do e-mail
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log(`[Worker] E-mail para ${payload.to} enviado.`);
                break;
            case 'processImage':
                console.log(`[Worker] Processando imagem: ${payload.imageId}`);
                // Simula um atraso para o processamento da imagem
                await new Promise(resolve => setTimeout(resolve, 3000));
                console.log(`[Worker] Imagem ${payload.imageId} processada.`);
                break;
            case 'generateReport':
                console.log(`[Worker] Gerando relatório: ${payload.reportType} para ${payload.period}`);
                // Simula um atraso para a geração do relatório
                await new Promise(resolve => setTimeout(resolve, 4000));
                console.log(`[Worker] Relatório ${payload.reportType} gerado.`);
                break;
            default:
                console.warn(`[Worker] Tipo de tarefa desconhecido: ${task.type}`);
                throw new Error('Tipo de tarefa desconhecido');
        }

        // Se o processamento for bem-sucedido, atualiza o status para 'completed'
        await updateTaskStatus(task.id, 'completed');
        console.log(`[Worker] Tarefa ID ${task.id} concluída com sucesso.`);

    } catch (error) {
        // Se houver um erro, atualiza o status para 'failed'
        console.error(`[Worker] Erro ao processar tarefa ID ${task.id}: ${error.message}`);
        await updateTaskStatus(task.id, 'failed', error.message); // Opcional: armazenar a mensagem de erro
    }
}

// Função para buscar e processar tarefas pendentes
async function fetchAndProcessTasks() {
    return new Promise((resolve, reject) => {
        // Seleciona uma tarefa pendente
        const selectSql = `SELECT * FROM tasks WHERE status = 'pending' ORDER BY createdAt ASC LIMIT 1`;

        db.get(selectSql, [], async (err, task) => {
            if (err) {
                console.error('[Worker] Erro ao buscar tarefa:', err.message);
                return reject(err);
            }

            if (task) {
                // Marca a tarefa como 'processing' antes de começar
                await updateTaskStatus(task.id, 'processing');
                console.log(`[Worker] Tarefa ID ${task.id} marcada como 'processing'.`);
                await processTask(task); // Processa a tarefa
                resolve(true); // Indica que uma tarefa foi processada
            } else {
                // console.log('[Worker] Nenhuma tarefa pendente encontrada.');
                resolve(false); // Indica que nenhuma tarefa foi encontrada
            }
        });
    });
}

// Função para atualizar o status de uma tarefa no banco de dados
function updateTaskStatus(taskId, status, errorMessage = null) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE tasks SET status = ?, processedAt = CURRENT_TIMESTAMP WHERE id = ?`;
        const params = [status, taskId];

        db.run(sql, params, function(err) {
            if (err) {
                console.error(`[Worker] Erro ao atualizar status da tarefa ${taskId}:`, err.message);
                return reject(err);
            }
            resolve(this.changes); // Número de linhas afetadas
        });
    });
}

// Loop principal do worker
async function startWorker() {
    console.log('--- Worker iniciado ---');
    // Definir um intervalo para verificar novas tarefas (ex: a cada 5 segundos)
    const interval = 5000; // 5 segundos

    // Loop contínuo
    setInterval(async () => {
        try {
            const taskProcessed = await fetchAndProcessTasks();
            if (taskProcessed) {
                // Se uma tarefa foi processada, o próximo ciclo pode ser mais rápido
                // ou apenas continuar o intervalo normal.
                // Para este exemplo, manteremos o intervalo fixo.
            }
        } catch (error) {
            console.error('[Worker] Erro no ciclo do worker:', error.message);
        }
    }, interval);
}

// Inicia o worker
startWorker();