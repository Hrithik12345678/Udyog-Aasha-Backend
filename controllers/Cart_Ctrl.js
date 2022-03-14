const { count } = require("../models/getCart");
const cart = require("../models/getCart");

const Cart_Crtl = {
  getCart: async (req, res) => {
    try {
      const { email } = req.body;
      const GetCart = await cart.findOne({user_id: email});
      if(!GetCart) {
        console.log("empty")
      }
      else {
          return res.json(GetCart);
      }
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
  saveCart: async (req, res) => {
    try {
      const { email, productId, quantity, pname, price } = req.body;
      const user = await cart.findOne({ user_id: email });
      if (!user) {
        const insert_user = new cart({
          user_id: email,
          product_array: [
            {
              productid: productId,
              quantity: quantity,
              product_name: pname, 
              price : price,
            },
          ],
        });
        insert_user.save();
        return res.json({insert_user});
      } else {
        const query = { user_id: email, "product_array.productid": productId };
        const find_product_id = await cart.findOne({
          user_id: email,
          "product_array.productid": productId,
        });
        if (!find_product_id) {
          try {
            const query2 = { user_id: email };
            const document1 = {
              $push: {
                product_array: {
                    productid: productId,
                    quantity: quantity,
                    product_name : pname,
                    price : price,
                }
              },
            };
            const update2 = await cart.updateOne(query2, document1);
            return res.json("updated Succuessfully");
          } catch (error) {
            res.json("error");
          }
        } else {
          const document = {
            $set: {
              "product_array.$.quantity": quantity,
            },
          };
          try {
            const update = await cart.updateOne(query, document);
          } catch (error) {
            res.json(error);
          }
        }
      }
      return res.json("updated Succuessfully");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  DeleteCart: async (req, res) => {
    try {
      const {email, id} =req.body;
      const query2 = { user_id: email };
      const document1 = {
        $pull: {
          product_array: {
              "productid": id
          }
        },
      };
      const update2 = await cart.updateOne(query2, document1, {
        multi: true
      });
      return res.json({ deleted_successfully: true})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  DeleteCart_all: async (req, res) => {
    try {
      const {email} =req.body;
      const query2 = { user_id: email };
      const update2 = await cart.remove(query2);
      return res.json({ deleted_all_successfully: true})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = Cart_Crtl;
