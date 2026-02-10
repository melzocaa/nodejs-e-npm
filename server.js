const http = require('http'); //importa o módulo nativo "http"
const colors = require('colors'); //importa o módulo colors
const fs = require('fs'); //importa o módulo File System para ler arquivos
const path = require('path'); //importa módulo path para "caminhos" e (rotas se for express)

//simular dados de um banco de dados
const dados = [
    {id: 1, nomedados: "Troca de Óleo", preco: 150.00},
    {id: 2, nomedados: "Alinhamento e Balanceamento", preco: 120.00},
    {id: 3, nomedados: "Revisão de Freios", preco: 200.00}
];

//criar o servidor
//função callback que recebe a requisição (req) e a resposta (res)
//req (Request): informações sobre pedido do usuário
//res (Response): objeto para enviar a resposta de volta ao usuário
const server = http.createServer((req, res) =>{

    //log para ver qual URL está sendo acessada no terminal
    console.log(`Requisição recebida: ${req.url}` .magenta); 

    //roteamento simples (caminho da URL)
    if (req.url === '/'){
        //le o arquivo 'index.html' que esta na pasta public
        const filePath = path.join(__dirname, 'public', 'index.html');

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro do servidor');
            }else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            }
        });
    }
     
    //rota da API retorna a tabela em formato JSON
    // localhost:3000/api/dados  que pode ser consumida no front-end
    else if (req.url === '/api/dados'){
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(dados));
    }

    //rota 404 caso a URL não exista
    //le o arquivo 404 da pasta public
   else{
    const filePath = path.join(__dirname, 'public', '404.html');

    // Tenta ler o arquivo 404.html
    fs.readFile(filePath, (err, content) => {

        // Se der erro ao ler o arquivo
        if (err) {
            // Diz ao navegador que a página não existe (erro 404)
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            // Mostra uma mensagem simples
            res.end('Página não encontrada (404)');
        } else {
            // Se o arquivo existir e abrir normalmente
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            // Mostra a página 404.html no navegador
            res.end(content);
        }
    });
}
});

//configurara a porta do servidor
const PORT = 3000;

//iniciar o servidor usar o listem para ouvir a porta
server.listen(PORT, () =>{
    console.log(`Servidor rodando http://localhost:${PORT}` .magenta.bold);
});
