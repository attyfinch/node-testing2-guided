const express = require("express");

const Hobbits = require("./hobbits/hobbits-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/hobbits/:id", (req, res) => {
  const { id } = req.params
  Hobbits.getById(id)
    .then(hobbit => {
      res.status(200).json(hobbit)
    })
    .catch(err => {
      console.error(err)
    })
});

server.post("/hobbits", async (req, res) => {

res.status(201).json(await Hobbits.insert(req.body))

  // const { name } = req.body;
  // console.log(name)
  // try {
  //   const newHobbit = await Hobbits.insert(name)
  //   res.status(201).json(newHobbit)
  // } catch (err) {
  //   console.error
  // }

});

server.delete("/hobbits/:id", (req, res) => {
  res.end()
});

server.put("/hobbits/:id", (req, res) => {
  res.end()
});

module.exports = server;
