# Node-RestAPI
A RestAPI to interact with the database via NodeJS
This is a very basic example of a app in Node.js, mySQL.

Installation

npm install
Configuration (database)
main.js

    host: 'localhost',
    user: 'root',
    password : 'root',
    port : 3306, //port mysql
    database:'nodeapp'	
    
You're gonna need to create a DB named 'nodeapp' and create a table named detals....

In your Mysql terminal type the following query

SQL Query:

create table details(
        QuoteID INT  auto_increment  primary key,
        QuoteDate DATETIME, QuoteNumber INT, 
        CustomerName varchar(20),
        SalesPerson varchar(30),
        QuotaStatus varchar(20) ,
        QuotaInfo JSON,QuotaSummary JSON);


