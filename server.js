const http = require('http');

const hostname = '127.0.0.1'; // O 'localhost'
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200; // Código de estado 200 significa "OK"
    res.setHeader('Content-Type', 'text/plain');
    res.end('¡Hola, mundo!\n'); // Mensaje que se enviará al cliente
});

server.listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
