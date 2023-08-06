import { Request, Response } from 'express';
import { UserProfileDetails } from '../models/userProfileDetailsModel';
import dbClient from '../config/database';

export const createUserProfileDetailsForDB = async (data: UserProfileDetails): Promise<UserProfileDetails> => {
    try {
        const query = `
            INSERT INTO user_profile_details (user_id, company, speciality, daily_reach, total_posts, about, country, address, previous_collaborations)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;

        const values = [
            data.user_id,
            data.company,
            data.speciality,
            data.daily_reach,
            data.total_posts,
            data.about,
            data.country,
            data.address,
            data.previous_collaborations,
        ];

        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const createUserProfileDetails = async (req: Request, res: Response) => {
  try {
      const { user_id, company, speciality, daily_reach, total_posts, about, country, address, previous_collaborations } = req.body;
      const data: UserProfileDetails = {
          user_id,
          company,
          speciality,
          daily_reach,
          total_posts,
          about,
          country,
          address,
          previous_collaborations
      };

      const createdDetail = await createUserProfileDetailsForDB(data);

      res.status(201).json({
          message: 'User profile details created successfully',
          data: createdDetail,
      });
  } catch (error) {
      console.error('Error creating user profile details:', error);
      res.status(500).json({ message: 'Error creating user profile details' });
  }
};


// *************************************UPDATE API*****************************************
export const updateUserProfileDetails = async (req: Request, res: Response) => {
  try {
      const { user_id, company, speciality, daily_reach, total_posts, about, country, address, previous_collaborations } = req.body;
      const data: UserProfileDetails = {
          user_id,
          company,
          speciality,
          daily_reach,
          total_posts,
          about,
          country,
          address,
          previous_collaborations
      };

      const updatedDetail = await updateUserProfileDetailsForDB(data);

      if (updatedDetail) {
          res.status(200).json({
              message: 'User profile details updated successfully',
              data: updatedDetail,
          });
      } else {
          res.status(404).json({ message: 'User profile details not found' });
      }
  } catch (error) {
      console.error('Error updating user profile details:', error);
      res.status(500).json({ message: 'Error updating user profile details' });
  }
};

export const updateUserProfileDetailsForDB = async (data: UserProfileDetails): Promise<UserProfileDetails | null> => {
  try {
      const query = `
          UPDATE user_profile_details
          SET
              company = $2,
              speciality = $3,
              daily_reach = $4,
              total_posts = $5,
              about = $6,
              country = $7,
              address = $8,
              previous_collaborations = $9
          WHERE user_id = $1
          RETURNING *;
      `;

      const values = [
          data.user_id,
          data.company,
          data.speciality,
          data.daily_reach,
          data.total_posts,
          data.about,
          data.country,
          data.address,
          data.previous_collaborations,
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


// ****************************************GET CONTROLLER***************************************
export const getUserProfileDetails = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.query;

        const detail = await getUserProfileDetailsFromDB(user_id as string);

        if (detail) {
            res.status(200).json({
                message: 'User profile details retrieved successfully',
                data: detail,
            });
        } else {
            res.status(404).json({ message: 'User profile details not found' });
        }
    } catch (error) {
        console.error('Error retrieving user profile details:', error);
        res.status(500).json({ message: 'Error retrieving user profile details' });
    }
};

export const getUserProfileDetailsFromDB = async (user_id: string): Promise<UserProfileDetails | null> => {
    try {
        const query = `
            SELECT *
            FROM user_profile_details
            WHERE user_id = $1;
        `;

        const values = [user_id];
        const result = await dbClient.query(query, values);

        if (result.rows.length > 0) {
            return result.rows[0];
        }

        return null;
    } catch (error) {
        throw error;
    }
};