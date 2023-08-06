
export enum SocialMediaEnum {
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'Instagram',
  LINKED_IN = 'LinkedIn',
  TWITTER = 'Twitter'
}

export type SocialMediaTypes = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'redit' | 'youtube';

export interface SocialMediaPlatformDetails {
  social_media_type: SocialMediaTypes;
  social_media_user_name: string;
  followers_count: number;
  posts_count: number;
  collaboration_rate_per_post: number;
}

export interface SocialMediaDetail {
  user_id: string;
  social_media: {
    [socialMedia in SocialMediaTypes]?: SocialMediaPlatformDetails
  };
}