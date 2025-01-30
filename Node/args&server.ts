import http from 'http';

// Define Ahmedabad facts and food data
const ahmedabadFacts: string[] = [
    "🏰 Ahmedabad was founded by Sultan Ahmed Shah in 1411.",
    "🏆 It is India's first UNESCO World Heritage City!",
    "🛕 The city is home to the iconic Akshardham Temple.",
    "🍽️ Ahmedabad is famous for its street food like khaman, fafda, and jalebi!",
    "🏏 Sardar Patel Stadium (Narendra Modi Stadium) is the world's largest cricket stadium!"
];

const foodSuggestions: Record<string, string[]> = {
    breakfast: ["Khaman Dhokla", "Fafda-Jalebi", "Thepla with Chai"],
    lunch: ["Gujarati Thali", "Undhiyu with Puri", "Dal Dhokli"],
    evening: ["Sev Khamani", "Kachori", "Dabeli"],
    dinner: ["Handvo", "Rotlo with Baingan Bharta", "Khichdi-Kadhi"]
};

// Function to get food recommendation based on time
const getTimeBasedFood = (): string[] => {
    const time: number = new Date().getHours();
    if (time >= 6 && time < 11) return foodSuggestions.breakfast;
    if (time >= 11 && time < 16) return foodSuggestions.lunch;
    if (time >= 16 && time < 20) return foodSuggestions.evening;
    return foodSuggestions.dinner;
};

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
            .container { background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); max-width: 500px; margin: auto; }
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

// Create HTTP Server
const server = http.createServer((req, res) => {
    if (!req.url) return;

    let responseHTML = ""; // Store response HTML content
    let statusCode = 200; // Default HTTP status code
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });

    if (req.url === '/fact') {
        const randomFact: string = ahmedabadFacts[Math.floor(Math.random() * ahmedabadFacts.length)];
        responseHTML = generateHTML("Ahmedabad Fact", randomFact);
    } 
    else if (req.url === '/food') {
        const allFoods: string[] = [...foodSuggestions.breakfast, ...foodSuggestions.lunch, ...foodSuggestions.evening, ...foodSuggestions.dinner];
        const randomFood: string = allFoods[Math.floor(Math.random() * allFoods.length)];
        responseHTML = generateHTML("Gujarati Dish Suggestion", `🍽️ Try this dish: <strong>${randomFood}</strong>`);
    } 
    else if (req.url === '/timefood') {
        const foodList: string[] = getTimeBasedFood();
        const randomFood: string = foodList[Math.floor(Math.random() * foodList.length)];
        responseHTML = generateHTML("Recommended Food", `⏰ Recommended for this time: <strong>${randomFood}</strong>`);
    } 
    else {
        statusCode = 404; // Not Found
        responseHTML = generateHTML("Error 404", "❌ Not Found! Try <a href='/fact'>/fact</a>, <a href='/food'>/food</a>, or <a href='/timefood'>/timefood</a>");
    }

    res.end(responseHTML);
});

const PORT: number = 3000;
server.listen(PORT, () => {
    console.log("\n🚀 Ahmedabad Guide Server is running at http://localhost:3000\n");
    console.log("📜 Available Endpoints:");
    console.log("🔹 /fact     → Get an Ahmedabad fact");
    console.log("🔹 /food     → Get a random Gujarati dish");
    console.log("🔹 /timefood → Get a dish suggestion based on the time\n");
});
