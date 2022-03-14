const aliens = require("../models/train");
const trainctrl = {
  training: async (req, res) => {
    try {
      const { pname, price, Mode, id } = req.body;
      const new_aliens = new aliens({
        pname,
        price,
        Mode,
        id,
      });
      new_aliens.save();
      res.json(new_aliens);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  GetTraining: async (req, res) => {
    try {
      const Aliens = await aliens.find();
      res.json(Aliens);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  Recommended: async (req, res) => {
    try {
      const Aliens = await aliens.findById(req.params.id);
      res.json(Aliens);
    } catch (err) {
      res.json("null");
    }
  },
  Popular: async (req, res) => {
    try {
      const Aliens = await aliens.findById(req.params.id);
      res.json(Aliens);
    } catch (err) {
      res.json("null");
    }
  },
  Live: async (req, res) => {
    try {
      const Aliens = await aliens.findById(req.params.id);
      res.json(Aliens);
    } catch (err) {
      res.json("null");
    }
  },
  Delete: async (req, res) => {
    try {
      const Aliens = await aliens.findByIdAndDelete(req.params.id);
      res.json(Aliens);
    } catch (err) {
      res.json("null");
    }
  },
  Details: async (req, res) => {
    try {
      const Aliens = await aliens.findById(req.params.id);
      res.json(Aliens);
      return Aliens;
    } catch (err) {
      res.json("null");
    }
  },
  check: async (req, res) => {
    try{
      const {pid} = req.body;
      const find = await aliens.findOne({ _id: pid });
      if(!find) {
        return res.json({ product: false });
      }else {
        return res.json({ product: true });
      }
    }catch (err) {
      res.json(err)
    }
  },
  posttrain: async (req, res) => {
    try{
      const {data} = req.body;
      console.log(data);
    }catch(err){
      console.log(err)
    }
  }
};

module.exports = trainctrl;
