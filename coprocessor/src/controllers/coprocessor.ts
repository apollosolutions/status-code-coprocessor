import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";

config();

const exampleText = process.env.EXAMPLE || "defaultExample";

const getCoprocessor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(200).json({
    message: "Successfully Queried coprocessor",
  });
};

const postCoprocessor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  if(req.body.stage === "SupergraphResponse") {
    req.body.control = { break: 200 };
    if (req.body.body.errors) {
      req.body.body.errors[0] = {
        "path": null,
        "locations": [
          {
            "line": 1,
            "column": 8,
            "sourceName": null
          }
        ],
        "message": "Variable 'fubar' has coerced Null value for NonNull type 'String!'"
      }
      req.body.body.errors.push({
        "message": "The error above was intercepted by the coprocessor",
      })
    }
  }

  // return response
  return res.status(200).json(req.body);
};

export default { getCoprocessor, postCoprocessor };
