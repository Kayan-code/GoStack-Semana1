const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  const results = repositories;
    return res.json(results);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;
  const likes = 0;
  const repositorie = { id: uuid(), title, url, techs, likes };

  repositories.push(repositorie);

  return res.json(repositorie);

});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex < 0){
      return res.status(400).json({error: 'Repository not found.'});
  }

  const likes = repositories[repositoryIndex].likes;
  const repository = {
      id,
      title,
      url,
      techs, 
      likes
  }

  repositories[repositoryIndex] = repository;


  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex < 0){
      return res.status(400).json({error: 'Repository not found.'});
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
  
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex < 0){
      return res.status(400).json({error: 'Repository not found.'});
  }

  repositories[repositoryIndex].likes += 1;

  return res.json(repositories[repositoryIndex]);
});

module.exports = app;
