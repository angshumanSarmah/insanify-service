import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { getUserProfileDetailsFromDB } from './userProfileDetailsController';
import { getSocialMediaDetailFromDB } from './socialMediaController';
import { getUserBasicDetailByEmail } from './userBasicDetailsController';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Replace with your actual Google client ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
// const client = new OAuth2Client(GOOGLE_CLIENT_ID);
console.log("****************************************", client)
export const loginWithGoogleToken = async (req: Request, res: Response) => {
    try {
        const { idToken } = req.body;

        const ticket = await client.verifyIdToken({
            idToken,
            audience: GOOGLE_CLIENT_ID,
        });
        console.log('ticket: ', ticket)

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const userEmail = payload.email;
        const userBasicDetail = await getUserBasicDetailByEmail(userEmail as string);

        if (userBasicDetail) {
            // User exists, 
            // return basic details + profile details + social media details
            const userProfileDetails = await getUserProfileDetailsFromDB(userBasicDetail.id);
            const socialMediaDetails = await getSocialMediaDetailFromDB(userBasicDetail.id);
            
            return res.status(200).json({ message: 'Login successful', userBasicDetail, userProfileDetails, socialMediaDetails  });
        } else {
            // User doesn't exist, return error message
            return res.status(401).json({ message: 'Account does not exist, please create one' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login' });
    }
};

