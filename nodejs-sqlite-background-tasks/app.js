// app.js

const { addTask } = require('./taskProducer'); // Importa a função addTask

async function main() {
    console.log('Iniciando a aplicação e adicionando tarefas...');

    try {
        // Adicionar uma tarefa de envio de e-mail
        const taskId1 = await addTask('sendEmail', {
            to: 'usuario1@example.com',
            subject: 'Bem-vindo ao nosso serviço!',
            body: 'Olá! Agradecemos por se cadastrar.'
        });
        console.log(`Email agendado com sucesso! ID: ${taskId1}`);

        // Adicionar uma tarefa de processamento de imagem
        const taskId2 = await addTask('processImage', {
            imageId: 'img_abc123',
            quality: 'high',
            format: 'webp'
        });
        console.log(`Processamento de imagem agendado com sucesso! ID: ${taskId2}`);

        // Adicionar uma tarefa de geração de relatório
        const taskId3 = await addTask('generateReport', {
            reportType: 'monthlySales',
            period: '2025-06'
        });
        console.log(`Geração de relatório agendada com sucesso! ID: ${taskId3}`);

    } catch (error) {
        console.error('Ocorreu um erro ao adicionar tarefas:', error);
    } finally {
        // Em uma aplicação real, você fecharia o DB aqui se não precisasse mais dele,
        // mas para este exemplo, manteremos aberto para o worker.
        // db.close(); // Comentei para evitar fechar a conexão prematuramente para o worker
    }
}

main(); // Chama a função principal para iniciar o processo