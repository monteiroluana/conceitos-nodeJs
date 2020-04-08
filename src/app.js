const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json( repositories );
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes:0 };

  repositories.push( repository );

  return response.json( repository );
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex( repo => repo.id == id );

  if( repoIndex < 0 ) return response.status(400).json( {error: 'Repository not found'} );

  repositories[repoIndex].title = title;
  repositories[repoIndex].url = url;
  repositories[repoIndex].techs = techs;

  return response.json( repositories[repoIndex] );
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex( repo => repo.id == id );

  if( repoIndex < 0 ) return res.status(400).json( {error: 'Repository not found'} );

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex( repo => repo.id == id );

  if( repoIndex < 0 ) return response.status(400).json( {error: 'Repository not found'} );

  repositories[repoIndex].likes ++;

  return response.json( repositories[repoIndex] )

});

module.exports = app;
