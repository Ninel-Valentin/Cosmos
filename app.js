const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile('./pages/index.html', function (error, data) {
        if (error) {
            res.writeHead(404, { "Content-Type": "text/html" })

            // Insert 404 page if found, otherwise show error message
            fs.readFile('./pages/404.html', function (error, data_404) {
                if (error) {
                    data = '404 Error code: Page not found';
                } else {
                    data = data_404;
                }
            });

        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, function (error) {
    if (error) {
        console.log(`Something went wrong: ${error}`);
    } else {
        console.log(`Server is listening on port: http://localhost:${port}`);
    }
});
