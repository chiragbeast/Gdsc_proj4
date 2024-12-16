# Gdsc_proj4
URL Shortener API Service A backend service built with Node.js, Express, and MongoDB to shorten URLs, handle redirections, and provide analytics.  
Steps to Run the Project
Start MongoDB
Make sure your MongoDB server is running on localhost:27017.
If MongoDB isn't running, start it with:
Navigate to the Project Directory
Install Dependencies

Install the necessary Node.js packages by running:
Copy code
npm install
Run the Server
Start the server using:
Copy code
npm start
The server will start at http://localhost:3000.
Testing Endpoints

Use tools like Postman or cURL to interact with the endpoints.
Available Endpoints
Create a Short URL

POST http://localhost:3000/shorten
Body: { "longUrl": "<your-long-url>" }
Redirect to Long URL

GET http://localhost:3000/:shortUrl
Get Details of a URL

GET http://localhost:3000/details/:url
Get Top Visited URLs

GET http://localhost:3000/top/:number
