# Task Management App

## Project Description
The **Food Ordering System**: Backend API with Node.js and Frontend Dashboard with React.js
### Key Features
- **User Authentication**: Secure login and registration using JWT authentication. In this project, we are sending JWT Tokens in the form of cookies as cookies are more resistant to XSS Attacks.
- **Menu Management**: Create, edit, delete, and view Menu items with proper error handling.
- **Place Order**: Select menuitems and add to cart for placing order. While placing order cases like Item not found, Item is unavailable, or Item quantities are not sufficient are also handled.
- **Dashboard**: Overview of all the available items is displayed. Also, Menu management and order history is also handled.

## Setup Instructions

### Prerequisites
- **Node.js** (v16.x or higher)
- **npm** or **yarn** for package management
- **MongoDB Atlas** for database

### Project Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Priyanka-chaudhari26/full-stack-task-management-app/
   cd client
   cd craftsfrontapp
   ```

### Front-End Setup

1. Install dependencies:
   ```bash
   npm install
   # Or
   yarn install

   npm install react-cookie react-router-dom react-toastify axios react-bootstrap bootstrap
   
   ```

2. Start the development server:
   ```bash
   npm start
   # Or
   yarn start
   ```

The frontend will run on `http://localhost:3000/` by default.

### Back-End Setup

1. Install dependencies:
   ```bash
   npm install express cors bcrypt cookie-parser nodemon jsonwebtoken mongoose dotenv
   ```
   
2. Start the development server:
   ```bash
   npm start
   # Or
   yarn start
   ```
3. Create database using MongoDB Atlas and store the connection string in MONGO_URL.
   
5. Configure env file`:
   create .env file in root directory of server
   ```env
   MONGO_URL = <your_mongodb_connection_string>
   PORT = 4000
   TOKEN_KEY = <your_token_key>
   ```

6. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:4000/` by default.

### API Documentation

#### User Auth Endpoints:
- `POST "http://localhost:4000/signup"` - To register a user.
- `POST "http://localhost:4000/login"` - To log in a user.
- `POST "http://localhost:4000/user"` - To get verified user data.

#### Menu Endpoints:
- `GET "http://localhost:4000/menu"` - To get all the menu items.
- `GET "http://localhost:4000/categories"` - To get all the categories in the menu model.
- `POST "http://localhost:4000/menu"` - To add a new menu item.
- ``PUT `http://localhost:4000/menu/${id}` `` - To update a particular menu item.
- ``DELETE `http://localhost:4000/menu/${id}` `` - To delete a particular menu item.

#### Order Endpoints:
- `POST "http://localhost:4000/order"` - To place an order.
- `GET "http://localhost:4000/orders"` - To get all previous orders.


### Challenges
- **Integration Issues**: Initial challenges in integrating JWT authentication with the React frontend.
- **LoggedIn User Management Issue**: Initial challenges in passing the loggedin user to all other controllers in the backend. Resolved it using attaching user to request body and calling next().
  

### Future Scope
- Filter menu items by category feature on frontend.


---

Feel free to raise issues or contribute to the project. Happy coding!

