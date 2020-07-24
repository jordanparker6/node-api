import { Request, Response, NextFunction } from 'express';
// Middleware To Return UnAuthed Users Home
export default async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) { return next(); }
      return res.status(401).json({
        error: {
          message: 'You are not authorised to perform this action. SignUp/Login to continue'
        }
      });
  };