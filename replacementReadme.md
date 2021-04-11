# HBG Works Code Test Solution

## Table of contents

* [Instructions](#instructions)
* [Solution Description](#solution-description)
* [Tools used](#tools-used)

## Instructions

### Run with Docker

Be navigated to this root directory in a terminal and enter command:

``` docker-compose up ```

When finished, the web client will be available on port 3000

http://localhost:3000/

### Tear down
``` docker-compose down ```

### Rebuild
``` docker-compose up --build ```

## Solution Description

A web form

### Extra features

* Responsive design
* Form validation
* Participant fields can be removed
* Submitted applications stored in database can be viewed by clicking a link at the bottom of the page

### Directories

#### Server

The server directory contains the backend source code. 

#### Web Client

The source code for the web client React App is in the directory web/src/

## Tools used

* __Virtualization__: Docker, Docker Compose
* __Database__: MongoDB
* __Programming language backend and frontend:__ JavaScript with code standard ECMAScript 2018
* __Code formatter__: prettier, see the file prettier.config.js in this root directory for formatting settings used
* __Backend runtime environment__: Node.js
* __Frameworks/libraries__: Express.js as backend framework. React.js as main frontend library.
