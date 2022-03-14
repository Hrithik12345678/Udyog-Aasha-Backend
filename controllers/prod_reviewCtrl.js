const product_reviews = require("../models/product_review");
const jwt = require("jsonwebtoken");
const orderSchema = require("../models/orderSchema");

const product_reviewCtrl = {
    saveReview: async (req, res) => {
        try{
            const { email, pid, product_quality, product_use, comparison, money, recommendation, review } = req.body
            const user = await product_reviews.findOne({ email: email  })
            const new_review = await product_reviews({
                email: email,
                reviews_array: [
                    {
                        product_id: pid,
                        product_quality: product_quality,
                        product_use: product_use,
                        comparison: comparison,
                        money: money,
                        recommendation: recommendation,
                        review: review,
                    }
                ]
            })
            if(!user){
                new_review.save();
                return res.json("successfull")
            }else {
                const review = await product_reviews.findOne({ email: email, "reviews_array.product_id": pid })
                if(!review){
                    const query = { email: email };
                    const document1 = {
                        $push: {
                            reviews_array: 
                                {
                                    product_id: pid,
                                    product_quality: product_quality,
                                    product_use: product_use,
                                    comparison: comparison,
                                    money: money,
                                    recommendation: recommendation,
                                    review: review,
                                }
                            
                        },
                      };
                      const update2 = await product_reviews.updateOne(query, document1);
                      return res.json({ data: "updated_successfully" })
                }else {
                    return res.json({ data: "already_done" })     
                }
            }
        }catch(err) {
            res.json(err)
        }
    },
    checkReview: async (req, res) => {
        try{
            const {email, pid} = req.body;
            const user = await product_reviews.findOne({ email: email, "reviews_array.product_id": pid })
            if(!user) {
                return res.json({ Done:false });
            }else {
                return res.json({ Done:true });
            }
        }catch(err) {
            res.json(err)
        }
    }
}

module.exports = product_reviewCtrl;