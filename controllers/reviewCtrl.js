const reviews = require("../models/review");
const jwt = require("jsonwebtoken");
const orderSchema = require("../models/orderSchema");

const reviewCtrl = {
    saveReview: async (req, res) => {
        try{
            const { email, pid, interesting, audio, interaction, question_answered, experience, review_comment } = req.body
            const user = await reviews.findOne({ email: email })
            const new_review = new reviews({
                email: email,
                reviews_array: [
                    {
                        course_id: pid,
                        interesting: interesting,
                        audio: audio,
                        interaction: interaction,
                        question_answered: question_answered,
                        experience: experience,
                        review_comment: review_comment
                    }
                ]
            })
            if(!user){
                new_review.save();
                return res.json("successfull")
            }else {
                const review = await reviews.findOne({ email: email, "reviews_array.course_id": pid })
                if(!review){
                    const query = { email: email };
                    const document1 = {
                        $push: {
                            reviews_array: 
                                {
                                    course_id: pid,
                                    interesting: interesting,
                                    audio: audio,
                                    interaction: interaction,
                                    question_answered: question_answered,
                                    experience: experience,
                                    review_comment: review_comment
                                }
                            
                        },
                      };
                      const update2 = await reviews.updateOne(query, document1);
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
            const user = await reviews.findOne({ email: email, "reviews_array.course_id": pid });
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

module.exports = reviewCtrl;