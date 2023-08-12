import { Request, Response } from 'express';
import { SocialMediaDetail, SocialMediaPlatformDetails, SocialMediaTypes } from '../models/socialMediaModel';
import dbClient from '../config/database';

export const createSocialMediaDetail = async (req: Request, res: Response) => {
    try {
        //this check is already present in the middleware, still another layer 
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { user_id, social_media } = req.body;

        const data: SocialMediaDetail = {
            user_id,
            social_media,
        };

        const createdDetail = await createSocialMediaDetailForDB(data);

        res.status(201).json({
            message: 'Social media detail created successfully',
            data: createdDetail,
        });
    } catch (error) {
        console.error('Error creating social media detail:', error);
        res.status(500).json({ message: `Error creating social media detail: ${error}` });
    }
};

// Function to create a social media detail
export const createSocialMediaDetailForDB = async (data: SocialMediaDetail): Promise<SocialMediaDetail> => {
    try {
        //getting the social media types availavble
        const socialMediaColumns = Object.keys(data.social_media) as SocialMediaTypes[];
        //extracting the social media types that are coming for an update
        const setColumns = socialMediaColumns
        .filter(column => {
            return data.social_media[column] !== undefined
        });

        //creating the clause ONLY for the social media types that are coming for an update
        const setClause = setColumns.map((column, index) => `${column} = EXCLUDED.${column}`).join(', ');
        const query = `
            INSERT INTO social_media_details (user_id, ${socialMediaColumns.join(', ')})
            VALUES ($1, ${setColumns.map((_, index) => `$${index + 2}`).join(', ')})
            ON CONFLICT (user_id) DO UPDATE
            SET ${setClause}
            RETURNING *;
        `;

        const values: any = [
            data.user_id,
        ];

        socialMediaColumns.map((column: SocialMediaTypes) => {
            values.push(data.social_media[column] as SocialMediaPlatformDetails)
        })

        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    } finally {
        console.log("Updated")
    }
};


// *******************************************DELETE SOCIAL MEDIA DETAIL*****************************************************
export const deleteSocialMediaDetail = async (req: Request, res: Response) => {
    try {
        
        //this check is already present in the middleware, still another layer 
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { user_id, social_media_type } = req.body;

        const deletedDetail = await deleteSocialMediaDetailFromDB(user_id, social_media_type);

        if (deletedDetail) {
            res.status(200).json({ message: 'Social media detail deleted successfully' });
        } else {
            res.status(404).json({ message: 'Social media detail not found' });
        }
    } catch (error) {
        console.error('Error deleting social media detail:', error);
        res.status(500).json({ message: `Error deleting social media detail: ${error}` });
    }
};

export const deleteSocialMediaDetailFromDB = async (user_id: string, social_media_type: SocialMediaTypes): Promise<boolean> => {
    try {
        const query = `
            UPDATE social_media_details
            SET ${social_media_type} = NULL
            WHERE user_id = $1
            RETURNING *;
        `;

        const values = [user_id];
        const result = await dbClient.query(query, values);

        if (result.rows.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
};


// ********************************************GET SINGLE DETAIL****************************************************

export const getSocialMediaDetail = async (req: Request, res: Response) => {
    try {
        //this check is already present in the middleware, still another layer 
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { user_id, social_media_type } = req.query;

        const detail = await getSocialMediaDetailFromDB(user_id as string, social_media_type as SocialMediaTypes);

        if (detail) {
            res.status(200).json({ message: 'Social media detail retrieved successfully', data: detail });
        } else {
            res.status(404).json({ message: 'Social media detail not found' });
        }
    } catch (error) {
        console.error('Error retrieving social media detail:', error);
        res.status(500).json({ message: `Error retrieving social media detail: ${error}` });
    }
};

export const getSocialMediaDetailFromDB = async (user_id: string, social_media_type?: SocialMediaTypes): Promise<SocialMediaPlatformDetails | null> => {
    try {
        const query = `
            SELECT ${social_media_type || '*'}
            FROM social_media_details
            WHERE user_id = $1;
        `;

        const values = [user_id];
        const result = await dbClient.query(query, values);

        if (result.rows.length > 0) {
            if(social_media_type) {
                return result.rows[0][social_media_type];
            }
            return result.rows[0];
        }

        return null;
    } catch (error) {
        throw error;
    }
};
