import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import * as firebaseAdmin from 'firebase-admin';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(400).json({
      error: {
        message: 'You did not specify any idToken for this request'
      }
    });
  }
  try {
    // Use firebase-admin auth to verify the JWT passed in from the client header.
    // Decoding this token returns the userpayload and all the other token claims you added while creating the custom token
    const firebase = Container.get<firebaseAdmin.app.App>('firebase')
    const userPayload = await firebase.auth().verifyIdToken(req.headers.authorization);

    req.user._id = userPayload.uid;
    req.user.email = userPayload.email;

    next();
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};
