import dbClient from '../config/database';
import { UserBasicDetails } from '../models/userBasicBasicModel';

import { Request, Response } from 'express';

export const createUserBasicDetails = async (req: Request, res: Response) => {
    try {
        const { id, first_name, last_name, email_id, user_name, contact_number, country_code } = req.body;
        const data: UserBasicDetails = {
            id,
            first_name,
            last_name,
            email_id,
            user_name,
            contact_number,
            country_code,
        };

        const createdDetail = await createUserBasicDetailsForDB(data);

        res.status(201).json({
            message: 'User basic details created successfully',
            data: createdDetail,
        });
    } catch (error) {
        console.error('Error creating user basic details:', error);
        res.status(500).json({ message: 'Error creating user basic details' });
    }
};


export const createUserBasicDetailsForDB = async (data: UserBasicDetails): Promise<UserBasicDetails> => {
    try {
        const query = `
            INSERT INTO user_basic_details (id, first_name, last_name, email_id, user_name, contact_number, country_code)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        const values = [
            data.id,
            data.first_name,
            data.last_name,
            data.email_id,
            data.user_name,
            data.contact_number,
            data.country_code,
        ];

        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};



// *******************************************UPDATE************************************************

export const updateUserBasicDetails = async (req: Request, res: Response) => {
    try {
        const { id, first_name, last_name, email_id, user_name, contact_number, country_code } = req.body;
        const data: UserBasicDetails = {
            id,
            first_name,
            last_name,
            email_id,
            user_name,
            contact_number,
            country_code,
        };

        const updatedDetail = await updateUserBasicDetailsForDB(data);

        if (updatedDetail) {
            res.status(200).json({
                message: 'User basic details updated successfully',
                data: updatedDetail,
            });
        } else {
            res.status(404).json({ message: 'User basic details not found' });
        }
    } catch (error) {
        console.error('Error updating user basic details:', error);
        res.status(500).json({ message: 'Error updating user basic details' });
    }
};

export const updateUserBasicDetailsForDB = async (data: UserBasicDetails): Promise<UserBasicDetails | null> => {
    try {
        const query = `
            UPDATE user_basic_details
            SET
                first_name = $2,
                last_name = $3,
                email_id = $4,
                user_name = $5,
                contact_number = $6,
                country_code = $7
            WHERE id = $1
            RETURNING *;
        `;

        const values = [
            data.id,
            data.first_name,
            data.last_name,
            data.email_id,
            data.user_name,
            data.contact_number,
            data.country_code,
        ];

        const result = await dbClient.query(query, values);

        if (result.rows.length > 0) {
            return result.rows[0];
        }

        return null;
    } catch (error) {
        throw error;
    }
};



// ************************************GET API*********************************************
export const getUserBasicDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;

        const detail = await getUserBasicDetailsFromDB(id as string);

        if (detail) {
            res.status(200).json({
                message: 'User basic details retrieved successfully',
                data: detail,
            });
        } else {
            res.status(404).json({ message: 'User basic details not found' });
        }
    } catch (error) {
        console.error('Error retrieving user basic details:', error);
        res.status(500).json({ message: 'Error retrieving user basic details' });
    }
};

export const getUserBasicDetailsFromDB = async (id: string): Promise<UserBasicDetails | null> => {
    try {
        const query = `
            SELECT *
            FROM user_basic_details
            WHERE id = $1;
        `;

        const values = [id];
        const result = await dbClient.query(query, values);

        if (result.rows.length > 0) {
            return result.rows[0];
        }

        return null;
    } catch (error) {
        throw error;
    }
};
