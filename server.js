const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the base directory for static files
const publicDir = path.join(__dirname, 'public');

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Resolve the file path
    let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);

    // Get the file extension
    const ext = path.extname(filePath);

    // Set the Content-Type based on the file extension
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.js': 'application/javascript'
    }[ext] || 'application/octet-stream';

    // Check if the file exists
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, serve a 404 error page
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Serve the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
