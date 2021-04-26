# HBG Works Code Test Solution

## Table of contents

- [Instructions](#instructions)
- [Solution Description](#solution-description)
- [Tools used](#tools-used)

## Instructions

### Sensitive environment variables

You are encouraged to change all passwords and other sensitive environment variables in the root directory's docker-compose.yml file as well as in the server/.env file.

You could have the sensitive variables in docker-compose.yml in a .env file. Then add .env to .gitignore for all directories.

### Run with Docker

Be navigated to this root directory in a terminal and enter command:

`docker-compose up`

When finished, the web client will be available on port 3000

http://localhost:3000/

### Server setup

Migrate tables to database with the following command:

`docker-compose exec php php /var/www/html/artisan migrate`

You can clear artisan cache with the following command:

`docker-compose run artisan config:cache`

### Tear down

`docker-compose down`

### Rebuild

`docker-compose up --build`

## Solution Description

A web form for course applications. 1 or more participants needs to be added.

Required fields:

- course id (this id is not something the user has to select/fill in manually)
- course date
- company name
- company phone number
- company email
- 1 or more participants with at least a name added

Phone number and email of participants are optional, this interpretation was made based on the design since there are no asterisks (\*) for those fields on the design image.

### Extra features

- Responsive design
- Client side form validation
- Participant fields can be removed if more than 1 participant has been added
- Submitted applications stored in database can be viewed by clicking a button at the bottom of the page

### Source Code Directories

#### Server

The server directory contains the backend source code.

#### Web Client

The source code for the web client React App is in the directory web/src/

## Tools used

- **Virtualization**: Docker, Docker Compose
- **Database**: MySQL
- **Programming language frontend:** JavaScript with code standard ECMAScript 2018
- **Programming language frontend:** PHP version 7+
- **JavaScript code formatter**: prettier, see the file prettier.config.js in this root directory for formatting settings used
- **Frameworks/libraries**: Laravel as backend framework. React.js as main frontend library.
