// import { Request, Response, NextFunction } from 'express';
// import { OAuth2Client } from 'google-auth-library';
// import { User } from '../models/userLoginModel';

// const GOOGLE_CLIENT_ID = '148292733057-ek3kg3g9dii6i6s19vv5c23hkhrhf7e3.apps.googleusercontent.com'; // Replace with your actual Google client ID
// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// export const authenticateGoogleToken = async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: GOOGLE_CLIENT_ID,
//         });

//         const payload = ticket.getPayload();
//         if (!payload) {
//             return res.status(401).json({ message: 'Invalid token' });
//         }

//         // Attach user information to the request object
//         req.user = payload as User;

//         next(); // Proceed to the next middleware/route handler
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { GoogleUserDetails } from '../models/userLoginModel';
import { checkIfEmailExists } from '../controllers/userBasicDetailsController';

const GOOGLE_CLIENT_ID = '148292733057-ek3kg3g9dii6i6s19vv5c23hkhrhf7e3.apps.googleusercontent.com'; // Replace with your actual Google client ID
// const client = new OAuth2Client(GOOGLE_CLIENT_ID, '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');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const authenticateGoogleToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        const userEmail = payload.email;
        const userBasicDetail = await checkIfEmailExists(userEmail as string);

        if (!userBasicDetail) {
            // User doesn't exist, return error message
            res.status(401).json({ message: 'Account does not exist, please create one' });
        }

        // User exists
        //  Attach user information to the request object
        req.user = payload as GoogleUserDetails;
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login' });
    }
};

