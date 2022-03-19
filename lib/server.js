import http from 'http';

const server = {};

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method.toLowerCase();
    const parsedPathName = parsedURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');
    const header = req.headers;
    console.log('Bandom atidaryti: ', trimmedPath);

    req.on('data', () => {
        console.log('Klientas atsiunte duomenu..');
    })

    req.on('end', () => {
        console.log('Uzklausa gauta - ziurim ko nori klientas..');
    })

});

server.init = () => {
    console.log('bandom paleisti serveri');
    const port = 3000;
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    });
}

export { server };