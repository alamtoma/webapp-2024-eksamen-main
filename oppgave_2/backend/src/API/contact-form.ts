import { Request, Response } from "express";
// contact-form.ts
const contactHandlers = {
    postMessage: (req, res) => {
      res.json({ message: "Post message handled" });
    },
    getMessage: (req, res) => {
      res.json({ message: "Get message handled" });
    },
  };
  
  export default contactHandlers;
  