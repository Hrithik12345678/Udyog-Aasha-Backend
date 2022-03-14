const services = require("../models/service");
const servdatas = require("../models/servdata");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fileupload = require("express-fileupload");
const Formidable = require("formidable");
const multer = require("multer");
const express = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

const app = express();

const CLIENT_ID =
  "689218340556-jmv6ul2587ul7diukgvqrq2klalinfnl.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

app.use(express.static("public"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + file.originalname);
  },
});

const upload = multer({ storage }).array("file", 18);

const serviceCtrl = {
  apply: async (req, res) => {
    try {
      const REFRESH_TOKEN =
        "1//04mPrV-M77DNwCgYIARAAGAQSNwF-L9IrwsiCIAWkfr6aDWUJfUhLNTC_Pn_j-aPgAUC6c01R9SERSC85rybKPFUKoXeNvlUR_pM";
      const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      const drive = google.drive({
        version: "v3",
        auth: oAuth2Client,
      });
      upload(req, res, (err) => {
        const email = req.body.email;
        const service = req.body.service;
        const subservice = req.body.subservice;
        const type_of_service = req.body.type_of_service;
        console.log("1");
        driveupload();
        async function driveupload() {
          const user = await services.findOne({ email });
          // var digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          // var otpLength = 12;
          // var otp = "";
          // for (let i = 1; i <= otpLength; i++) {
          //   var index = Math.floor(Math.random() * digits.length);
          //   otp = otp + digits[index];
          // }
          if (Object.keys(user).length != 0) {
            console.log("2");
            if (service == "registration") {
              const query = await services.findOne({
                email: email,
                "registration.subservice": subservice,
              });
              if (query) {
                console.log("3");
                return res.json({ applied: "already_applied" });
              } else {
                console.log("5");
                const response_2 = await drive.files.create({
                  requestBody: {
                    parents: [user.drive_link],
                    name: subservice, //This can be name of your choice
                    mimeType: "application/vnd.google-apps.folder",
                  },
                });

                var i = 0;
                while (i < 18) {
                  if (req.files[i] != undefined) {
                    console.log("MY" + i);
                    
                    const filePath_1 = path.join(
                      __dirname,
                      `../public/${req.files[i].filename}`
                    );
                    console.log("adasd");
                    const response_file_1 = await drive.files.create({
                      requestBody: {
                        parents: [response_2.data.id],
                        name: req.files[i].filename, //This can be name of your choice
                        mimeType: "application/pdf",
                      },
                      media: {
                        mimeType: "application/pdf",
                        body: fs.createReadStream(filePath_1),
                      },
                    })
                    unlinkAsync(req.files[i].path)
                  }
                  i++;
                }
                console.log("over");
                console.log("8");
                const query1 = { email: email };
                const document = {
                  $push: {
                    registration: {
                      subservice: subservice,
                      status: "unverified",
                      type_of_service: type_of_service,
                    },
                  },
                };
                const docu = {
                  $set: {
                    unverified: user.unverified + 1,
                  },
                };
                console.log("9");
                const upd = await services.updateOne(query1, docu);
                const update = await services.updateOne(query1, document);

                console.log("10");
                return res.json({ applied: "false" });
              }
            } else {
              return res.json({ applied: "Not data Found" });
            }
          } else {
            if (service == "registration") {
              const response = await drive.files.create({
                requestBody: {
                  name: email, //This can be name of your choice
                  mimeType: "application/vnd.google-apps.folder",
                },
              });
              const response_2 = await drive.files.create({
                requestBody: {
                  parents: [response.data.id],
                  name: subservice, //This can be name of your choice
                  mimeType: "application/vnd.google-apps.folder",
                },
              });
              var i = 0;
              while (i < 18) {
                if (req.files[i] != undefined) {
                  console.log("MY" + i);
                  const filePath_1 = path.join(
                    __dirname,
                    `../public/${req.files[i].filename}`
                  );
                  console.log(response_2);
                  const response_file_1 = await drive.files.create({
                    requestBody: {
                      parents: [response_2.data.id],
                      name: req.files[i].filename, //This can be name of your choice
                      mimeType: "application/pdf",
                    },
                    media: {
                      mimeType: "application/pdf",
                      body: fs.createReadStream(filePath_1),
                    },
                  });
                  unlinkAsync(req.files[i].path);
                }
                i++;
              }

              const newservice = new services({
                email: email,
                registration: {
                  subservice: subservice,
                  status: "unverified",
                  type_of_service: type_of_service,
                },
                unverified: 1,
                drive_link: response.data.id,
              });
              newservice.save();
              
              return res.json({ applied: "false" });
            }else {
              return res.json({ applid: "data not found"})
            }
          }
        }

        // unlinkAsync(req.files[0].path)
        // unlinkAsync(req.files[1].path)
      });
      // const {email, service, subservice} = req.body;
    } catch (err) {
      console.log(err);
    }
  },
  getservices: async (req, res) => {
    try {
      const service = await services.find();
      res.json(service);
    } catch (err) {
      console.log(err);
    }
  },
  unverified: async (req, res) => {
    try {
      const REFRESH_TOKEN =
        "1//04mPrV-M77DNwCgYIARAAGAQSNwF-L9IrwsiCIAWkfr6aDWUJfUhLNTC_Pn_j-aPgAUC6c01R9SERSC85rybKPFUKoXeNvlUR_pM";
      const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
      const accessToken = await oAuth2Client.getAccessToken();
      const { email, service, subservice, verify } = req.body;
      const user = await services.findOne({ email });

      if (user && verify == "success") {
        if (service == "registration") {
          const query = {
            email: email,
            "registration.subservice": subservice,
          };
          const document = {
            $set: {
              "registration.$.status": "verified",
            },
          };
          const query1 = { email: email };
          const document1 = {
            $set: {
              unverified: user.unverified - 1,
            },
          };
          const update = await services.updateOne(query, document);
          const upd = await services.updateOne(query1, document1);
          const output = `
              <div>
                 <span>${subservice}</span>
              </div>
            `;
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "udyogaasha157@gmail.com",
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
            },
          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Udyog-Asha" <udyogaasha157@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verified Recipt", // Subject line
            html: output, // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          });
          return res.json({ data: "done" });
        }
      }else if(verify == "failed"){
        if (service == "registration") {
          const query = {
            email: email,
            
          };
          const document1 = {
            $pull: {
              registration : {
                "subservice": subservice
              }
            },
          };
          const output = `
              <div>
                 <span>${subservice}</span>
                 <span>Your file has been rejected, due to lack of data or wrong file.</span>
              </div>
            `;
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "udyogaasha157@gmail.com",
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
            },
          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Udyog-Asha" <udyogaasha157@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Rejected Recipt", // Subject line
            html: output, // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          });
          const update = await services.updateOne(query, document1);
          console.log(update);
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  service_data: async (req, res) => {
    try {
      const servdata = await servdatas.find();
      res.json(servdata);
    } catch (err) {
      console.log(err);
    }
  },
  service_id: async (req, res) => {
    try {
      const { id } = req.body;
      const serv = await servdatas.findById({ _id: id });
      res.json(serv);
    } catch (err) {
      console.log(err);
    }
  },
  sub_service_data: async (req, res) => {
    try {
      const { pid, name } = req.body;
      const serv = await servdatas.find(
        { "service_array.name": name },
        { _id: pid, service_array: { $elemMatch: { name: name } } }
      );
      res.json(serv);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = serviceCtrl;
