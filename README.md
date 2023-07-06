# inContest

## [See the App!](https://incontest.cyclic.app/)

## Description

A simple app allows you to compete with your friends on the investment results!
 
## User Stories

- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and access to login and signup.
- **sign up** - As a user I want to sign up the app so that I can start accessing the app.
- **login** - As a user I want to be able to log in so that I can get back into my account.
- **logout** - As a user I want to be able to log out from the application so that I can make sure no one will access my account.
- **portfolio** - As a user I want to be able to view all my logged observations, be able to add a new observation and update the existing observation
- **competition** - As a user I want to be able view all competitions in the application.
- **competition detail** - As a user I want to be able to visit the detail of an existing competition, if the compeititon is created by me, I can modify and delete thie competition.
- **competition create** - As a user I want to be able to create a new competition and specify users to join the competition.
- **account** - As a user I want to see my account detail, including username, password and default profile picture.
- **account update** - As a user I want to be able to update my username, password and profile picture.
- **all portfolio** - As a user I want to be able to view all users in the app and able to go to detail and see all observations from the user.

## Backlog Functionalities

- **mobile view** - As a user, I want to be able to use the application on the mobile device, with tailored mobile experience.
  
## Technologies used

- **Front-end** - HTML, CSS, Handlebars, Bootstrap
- **Back-end** - Javascript, Node, Mongoose, Express, Express-session, Cookies,
- **DataBase/ Storage** - MongoDB, Cloudinary
- **Deployment** - Cyclic

## API routes (back-end)

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password

- GET /account
  - render the account form
- POST /account/edit
  - body:
    - username
    - password
    - email
  - imagefile - link generated from Cloudinary
  - If success, redirect to /account

- GET /portfolio
  - renders the logged observation from logged in user
- GET /portfolio/add-result
  - renders the add new observation form
- POST /portfolio/add-result
  - body:
    - referenceDate
    - totalAccount
    - totalPortfolio
    - totalResult
- GET /portfolio/:_id/edit
  - params:
    - _id
  - renders the edit form of a observation
- POST /portfolio/:_id/edit_result
  - body:
    - totalAccount
    - totalPortfolio
    - totalResult

- GET /all-portfolio
  - render page of all users
- GET /all-portfolio/:userId
  - params:
    - userId
  - render all portoflio of a user
  - present a bar-chart graphic of portfolios of the user

- GET /competition
  - render all competitions in the application
- GET /competition/:competitionId
  - params:
    - competitionId
  - render the most recent protfolio of the users in the competition
  - render the edit and delete option depending on if the current logged user is the creator of the competition
- POST /competition/:competitionId/sync
  - fetch all portfolios associated with this compeittion
  - if success, redirect to /competition/${req.params.competitionId}
- GET /competition/:competitionId/edit
  - render the edit view of a competition
- POST /competition/:competitionId/edit
  - body:
    - name
    - description
    - userGroup
  - fetch the relevant portfolios based on specified userGroup
  - update the give competition data
  - if success, redirect to /competition/${req.params.competitionId}
- GET /new-competition
  - Render create new competition view
- POST /new-competition
  - body:
    - name
    - description
    - userGroup
  - session:
    - currentUser
  - fetch the relevant portfolios based on specified userGroup
  - if success, redirect to /competition
- POST /competition/:competitionId/delete
  - delete the competition
  - if success, redirect to /competition


## Models

User model
 
```
username: String
emai: String
password: String
imageUrl: String
```

Portfolio model

```
createdBy: ObjectId<User>
referenceDate: Date
totalAccount: Number
totalPortfolio: Number
totalResult: Number
totalReturn: Number
percentageReturn: Number
```

Competition model

```
name: String
competitionDescription: String
createdBy: ObjectId<User>
usersInGroup: [ObjectId<User>]
portfolio: [ObjectId<Portfolio>]
```

## Links

## Collaborators

[Luke Chen](https://github.com/heylukechen)

[Jelle Wallenburg](https://github.com/JelleWallenburg)

### Project

[Repository Link](https://github.com/JelleWallenburg/inContest)

[Deploy Link](https://incontest.cyclic.app/)

### Trello

[Link to trello board](https://trello.com/b/4YKwBRuw/incontest)

### Figma

[Link to Figma file](https://www.figma.com/file/i7fkpRsbURfrmamnBwJutj/InvestCompete?type=design&node-id=10%3A145&mode=design&t=116rLlifGZP32r9p-1)

### Slides

[Slides Link](www.your-slides-url-here.com)
