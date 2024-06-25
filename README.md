Blogging Website
This is a full-stack blogging website built using React for the frontend, Express for the backend, and MongoDB for the database. The website allows users to create, read, update, and delete blog posts.

Table of Contents
Features
Installation
Usage
API Endpoints
Technologies Used
Folder Structure
Contributing
License
Features
User authentication (login and registration)
Create, read, update, and delete blog posts
Comment on posts
Like and unlike posts
User profile management
Installation
To set up the project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/blogging-website.git
cd blogging-website
Install server dependencies:

bash
Copy code
cd server
npm install
Install client dependencies:

bash
Copy code
cd ../client
npm install
Set up environment variables:

Create a .env file in the server directory and add the following variables:

env
Copy code
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
Run the development server:

bash
Copy code
cd server
npm run dev
This will start both the Express server and the React development server.

Usage
Open the application:

Open your browser and navigate to http://localhost:3000.

Register and login:

Create an account and log in to start creating blog posts.

Create a blog post:

Navigate to the "Create Post" section, enter your content, and publish your post.

Interact with posts:

You can like, comment, edit, or delete posts as needed.

API Endpoints
Here are some of the main API endpoints:

User Authentication:

POST /api/auth/register: Register a new user
POST /api/auth/login: Log in a user
Blog Posts:

GET /api/posts: Get all posts
POST /api/posts: Create a new post
GET /api/posts/:id: Get a single post
PUT /api/posts/:id: Update a post
DELETE /api/posts/:id: Delete a post
Comments:

POST /api/posts/:id/comments: Add a comment to a post
DELETE /api/posts/:postId/comments/:commentId: Delete a comment
Technologies Used
Frontend:

React
Redux (for state management)
Axios (for HTTP requests)
React Router (for navigation)
Backend:

Express
MongoDB (with Mongoose)
JWT (for authentication)
bcrypt (for password hashing)
