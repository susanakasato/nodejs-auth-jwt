# NODEJS API WITH JWT AUTH
This is a simple example of server application of jwt user authentication and roles authorizations. 
The example is based on an user with its roles ADMIN or BASIC, and its permissions to access some projects. The database is provided by the data.js file, with json data.

## Routes
There are three main routes on the application:

### /users
- GET: Return all users on database. It exists just for checking purpose.
- POST: To sign in a new user. The request must have a body with the new user information, for example:
  ```
  {
    "username": "John",
    "password": "john123",
    "role": "admin"
  }
  ```
- POST (/login): To login a user. It returns the jwt (json web token) authenticated. The request must have a body with the user information, for example:
```
  {
    "username": "John",
    "password": "john123"
  }
```

### /home
To access this route, the authentication token is required.
- GET: Return the home information for the user with basic role. Otherwise, it is unauthorized.
- GET (/admin): Returns the home information for the user with admin role. Otherwise, it is unauthorized.

### /projects
To access this route, the authentication token is required.
- GET: Returns all the authorized projects. The user with admin role has access to all projects, and the user with basic role has access to his own projects.
- GET (/{projectId}): Returns the project with the given id on the request parameters. The project is only accessible for the owner of the project or the user with admin role.
- GET (/user/{userId}): Returns all the projects of the user provided by the user id on the request parameters. This route is only accessible for users with admin roles.

## Run the server
Once the project is downloaded, run the following command on cli, to install the node modules:
> npm install

Then, run the following command to start the server, for testing the api:
> npm run start

Now, the server is available on http://localhost:3000


