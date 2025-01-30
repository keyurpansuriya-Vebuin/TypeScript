import http from 'http';
import fs from 'fs';
import path from 'path';

const FILE_NAME = 'ahmedabad.txt';
const FILE_PATH = path.join(__dirname, FILE_NAME);

const generateHTML = (title: string, message: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px; }
            .container { background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }
            h1 { color: #d32f2f; }
            p { font-size: 18px; color: #333; }
            .footer { margin-top: 20px; font-size: 14px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>${title}</h1>
            <p>${message}</p>
            <div class="footer">Powered by Ahmedabad Guide 🚀</div>
            <br>
            <strong class="footer">Made with ❤️ by Keyur</strong>
        </div>
    </body>
    </html>
    `;
};

const server = http.createServer((req, res) => {
    if (!req.url) return;

    let responseHTML;
    let statusCode = 200;
    //if file is not found then it will return create file and write content
    if (req.url === '/write') {
        fs.writeFile(FILE_PATH, "Write Operation: Ahmedabad is India's first UNESCO World Heritage City!", (err) => {
            if (err) {
                statusCode = 500;
                responseHTML = generateHTML("Error", "❌ Failed to write to file.");
            } else {
                responseHTML = generateHTML("Success", `✅ File '${FILE_NAME}' has been created.`);
            }
            res.writeHead(statusCode, { 'Content-Type': 'text/html' });
            res.end(responseHTML);
        });
    }
    else if (req.url === '/read') {
        fs.readFile(FILE_PATH, 'utf8', (err, data) => {
            if (err) {
                statusCode = 404;
                responseHTML = generateHTML("Error", "❌ File not found. Try /write first.");
            } else {
                responseHTML = generateHTML("File Content by Read operation", `📜 ${data}`);
            }
            res.writeHead(statusCode, { 'Content-Type': 'text/html' });
            res.end(responseHTML);
        });
    }
    else if (req.url === '/append') {
        fs.appendFile(FILE_PATH, "\nAppend Operation: Ahmedabad is also famous for its delicious street food!", (err) => {
            if (err) {
                statusCode = 500;
                responseHTML = generateHTML("Error", "❌ Failed to append data.");
            } else {
                responseHTML = generateHTML("Success", "✅ New content appended to file.");
            }
            res.writeHead(statusCode, { 'Content-Type': 'text/html' });
            res.end(responseHTML);
        });
    }
    else if (req.url === '/delete') {
        fs.unlink(FILE_PATH, (err) => {
            if (err) {
                statusCode = 404;
                responseHTML = generateHTML("Error", "❌ File not found. Nothing to delete.");
            } else {
                responseHTML = generateHTML("Success", "✅ File deleted successfully.");
            }
            res.writeHead(statusCode, { 'Content-Type': 'text/html' });
            res.end(responseHTML);
        });
    }
    else if (req.url === '/list') {
        fs.readdir(__dirname, (err, files) => {
            if (err) {
                statusCode = 500;
                responseHTML = generateHTML("Error", "❌ Failed to list files.");
            } else {
                responseHTML = generateHTML("Files in Directory by List operation", `<ul>${files.map(file => `<li>${file}</li>`).join('')}</ul>`);
            }
            res.writeHead(statusCode, { 'Content-Type': 'text/html' });
            res.end(responseHTML);
        });
    }
    else {
        statusCode = 404;
        responseHTML = generateHTML("404 Not Found", "❌ Invalid endpoint! Try <a href='/write'>/write</a>, <a href='/read'>/read</a>, <a href='/append'>/append</a>, <a href='/delete'>/delete</a>, or <a href='/list'>/list</a>.");
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(responseHTML);
    }
});

const PORT: number = 3000;
server.listen(PORT, () => {
    console.log("\n🚀 Ahmedabad File System Server is running at http://localhost:3000\n");
    console.log("📜 Available Endpoints:");
    console.log("🔹 /write   → Create a file and write content");
    console.log("🔹 /read    → Read file content");
    console.log("🔹 /append  → Append content to file");
    console.log("🔹 /delete  → Delete the file");
    console.log("🔹 /list    → List all files in directory\n");
});
