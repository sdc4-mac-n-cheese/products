# Product API
System Design Capstone
Authored by Joel Hench.

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Overview
This product API, a node.js/arangodb database REST API, is designed to provide a fully scalable server and database solution. It delivers requests related to an Ecommerce webpage for page loading, user navigation, and meta data. While a visitor is on the site, this API serves information related to products, similar items, images, reviews, and questions and answers.

## Table of Contents
1. Description
1. Setup
1. Usage
1. Contact

## Description
This API is designed to replace an existing service which cannot keep up with increasing web traffic. All clients are connected to load balancing server hosting Nginx. Nginx routes traffic to upstream product servers based on a round robin configuration. The product servers interact with the ArangoDB database through node.js/AQL (ArangoDB Query Language). These servers optimize query time by leveraging subqueries and minimizing use of JavaScript object manipulation. The ArangoDB database management system itself is used to rapidly organize data, containining sorted collections, and documents marked with indexes for quick access. The result is a REST API which pushes the limits of web traffic throughput. In summary, this API can respond to requests in as low as 125ms. While tested under load, with a criteria of keeping an error rate under 1% and response time under 2000ms, the following metrics for several server routes demonstrate the high throughput ability of this API, measured by simulating the number of VUs (virtual users) per second visiting the webpage; products/:productid: 2000 VUs/s, products/:productid/styles: 1500 VUs/s, products/:productid/related: 2750 VUs/s.

## Setup
1. Download a local copy of this repository.
1. If you're already using Node.js v16.14.0, great! Our project uses this version.
  - If you dont have this version, we recommend using nvm (node version manager). It makes switching
  to Node.js v16.14.0 much easier.
    - Follow this link for steps on installing nvm. https://github.com/nvm-sh/nvm/blob/master/README.md
    - In the terminal, run `nvm install 16.14.0` to install Node.
    - In the terminal, run `npm install -g npm` to install npm (node package manager).
    - For more details, follow this link. https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
1. In the terminal, run `npm install` to set up dependencies.
1. Open up ArangoDB Shell with `arangosh`
1. Default log in username is 'root' and password is empty.
1. Create a database using `db._createDatabase('productdb');`
1. Navigate to products/server/ and run `node arango_setup2.js`
1. Import CSV data through Arango import to respective collections (example: `arangoimp  --batch-size 838860 --file "photos.csv" --type csv --server.database "productdb" --collection "photos";`)
1. If being used in deployment, the database IP should be changed in /products/server/arango_setup1.js to your instance IP. Otherwise, the IP may be set to 'http://127.0.0.1:8529'.
1. To run the server, visit /products/server/server.js and run `node server.js`. A successful start will show these messages in the console:
 - >Server is listening on port 8528
 - >Using database "productdb"

## Usage
This project would be useful in the context of a proposal. It could be an upgrade, modification, or revamp of an existing API service. It is a demonstration of the power of load balancing and database query optimization.

## Contact
https://www.linkedin.com/in/joel-hench/
joelhench@gmail.com