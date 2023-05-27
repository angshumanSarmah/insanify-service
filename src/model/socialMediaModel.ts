
export enum SocialMediaEnum {
    FACEBOOK = 'Facebook',
    INSTAGRAM = 'Instagram',
    LINKED_IN = 'LinkedIn',
    TWITTER = 'Twitter'

}

export type SocialMediaTypes = 'facebook' | 'instagram' | 'linkedin' | 'twitter';

export interface SocialMediaInfo {
    userName: string,
    followers: string,
    reach: string
}

export interface SocialMediaDetailsModel {
    user_id: string,
    twitter?: SocialMediaInfo,
    facebook?: SocialMediaInfo,
    instagram?: SocialMediaInfo,
    linkedin?: SocialMediaInfo
}