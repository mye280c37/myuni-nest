// logger.middleware.ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log("Request: ", req.method);
    if(req.method === 'POST') {
      console.log(req.body);
    }
    else if (req.method === 'GET'){
      console.log(req.params);
    }
    next();
    console.log(res.status);
  }
}