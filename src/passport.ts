// import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
// import passport from 'passport';
// import { Request, Response, NextFunction } from 'express'; // Import types from express

// // Assuming you have a function to serialize and deserialize users for session management
// passport.serializeUser((user: Profile, done) => {
//     // Serialize the user ID or any other necessary information
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     // Fetch user data based on the serialized ID and pass it to the callback
//     // For example: User.findById(id, (err, user) => done(err, user));
//     done(null, null); // Replace null with the fetched user object
// });

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//             callbackURL: '/auth/google/callback',
//             scope: ['profile', 'email']
//         },
//         authenticateUser
//     )
// );

// function authenticateUser (accessToken: string, refreshToken: string, profile: Profile, callback: (error: Error | null, user?: any) => void) {
//     // profile.displayName or profile.name ....
//     callback(null, profile);
// }
// // Middleware to check if the user is authenticated
// export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login'); // Redirect to login page if not authenticated
// }

// // Export passport for use in other parts of the application
// export default passport;
