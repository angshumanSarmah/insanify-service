import { Request } from 'express';

// this is needed to set the         
//      req.user = payload as GoogleUserDetails;
declare module 'express' {
    interface Request {
        user?: {
            sub: string;
            email: string;
            name: string;
            // ... other properties you expect from the Google ID token payload
        };
    }
}
