const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../members");

//*Get members
router.get("/", (req, res) => res.json(members));

//* Get 1 member
router.get("/:id", (req, res) => {
  //. req.params.id ==> :id
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  else res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
});

//*Create member
router.post("/", (req, res) => {
  // res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include the name and email!" });
  }
  members.push(newMember);
  res.json(members);
});

//*Update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach((x, ) => {
      if(x.id === parseInt(req.params.id)){
        x.name = updMember.name ? updMember.name: x.name;
        x.email = updMember.email ? updMember.email: x.email;

        res.json({msg: `Member updated`, x});
      }
    });
  } else res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
});

//* Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({msg: "Member deleted", members: members.filter(x=>x.id !== parseInt(req.params.id))});
  } else res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
});

module.exports = router;
