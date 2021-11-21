# Database Documentation
We will be using mongodb with docker to provide environment encapsulation
so that the db can be deployed in any environment.

you will need docker pre-installed on your computer before u can proceed.

###### MongoDB version used
- version used: 5.0.4

command to pull from docker repository
```bash
docker pull mongo:5.0.4
```

## Getting Started (the TLDR version of it)
How to get started using the database

1. ensure docker is installed on your computer
2. open a terminal in the current directory
3. run this command in this current directory of this file
```bash
docker-compose up
```
Thats it, 3 steps to get started using this mongo_db

4. open a new terminal in the current directory of this file
5. navigate into the mongo by running this command(ensure the mongo is opened in the database_scripts directory)
```bash
mongosh localhost:2717
```
6. run these commands below to insert record into the database
```bash

mongoimport -h localhost:2717 -d vaccination -c vaccinecenters -u admin -p pass --authenticationDatabase admin --jsonArray --file ./database_scripts/vaccinecenters.json

```

Thats it, additional 3 steps to insert records into DB

## shutdown the db_server
```bash
docker-compose down
```

## for viewing of DB using GUI (optional)
- download MongoDB Compass
- click on "Fill in connection fields Individually"
![Intro](./img/1.png)
- then fill the details accordingly, get the credentials from the docker-compose.yml
![Credentials](./img/2.png)
- you have connected successfully

## for viewing of DB using CLI (optional)
mongosh localhost:2717
