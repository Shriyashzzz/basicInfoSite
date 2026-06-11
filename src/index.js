//importing necessary modules from node runtime

import { createServer } from "node:http";
import fs from "node:fs";
import { error } from "node:console";
import url from "node:url";

//define the port & the | hostname /ip =>(default is localhost/127.0.0.1) | for the server to run on.
// accesing enviroment variable
const PORT = process.env.PORT ? process.env.PORT : 8080;
const server = createServer((request, response) => {
  // give the repsonse according to the request made by the client
  response.statusCode = 200;
  // set the header for the response and declare the type of repsonse the server will be giving after the processing
  response.setHeader("Content-Type", "text/html");

  let currentPage = "index.html";
  // this is  checking the path the client is trying to access.
  // structure of an url `=>  "  https: // user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
  if (request.url == "/") {
    currentPage = "index.html";
  } else if (request.url == "/about") {
    currentPage = "about.html";
  } else if (request.url == "/contact-me") {
    currentPage = "contact-me.html";
  } else {
    currentPage = "404.html";
  }
  // use readfile method from fs lib of node module to read the neededd(currentPage) file
  //  convert it to text/html content and send it as an response.
  fs.readFile(`${import.meta.dirname}/${currentPage}`, (error, html) => {
    if (error) {
      throw error;
      console.log(error);
      return;
    }
    response.end(html);
  });
});

// tells the node to start listening for incoming HTTP requests on port 8080.
//  This is what "turns" the server on. listen is of an event type.
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
