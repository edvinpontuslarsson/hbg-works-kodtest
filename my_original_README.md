# HBG Works Code Test Solution

## Table of contents

- [Instructions](#instructions)
- [Solution Description](#solution-description)
- [Tools used](#tools-used)

## Instructions

### Run with Docker

Be navigated to this root directory in a terminal and enter command:

`docker-compose up`

When finished, the web client will be available on port 3000

http://localhost:3000/

### Tear down

`docker-compose down --volumes`

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

### Directories

#### Server

The server directory contains the backend source code.

#### Web Client

The source code for the web client React App is in the directory web/src/

## Tools used

- **Virtualization**: Docker, Docker Compose
- **Database**: MySQL
- **TODO**: Use Wordpress for API instead of Node.js
- **Programming language backend and frontend:** JavaScript with code standard ECMAScript 2018
- **Code formatter**: prettier, see the file prettier.config.js in this root directory for formatting settings used
- **Backend runtime environment**: Node.js
- **Frameworks/libraries**: Express.js as backend framework. React.js as main frontend library.
