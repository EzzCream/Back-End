import { Strategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.js';
import { logger } from '../logs/loggers.logs.js';

passport.use(
	'signup',
	new Strategy(
		{
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			try {
				const userExist = await UserModel.findOne({ username });
				if (userExist) {
					return done(null, false);
				}
				const newUser = {
					username,
					password: bcrypt.hashSync(
						password,
						bcrypt.genSaltSync(10),
						null,
					),
					email: req.body.email,
					direccion: req.body.direccion,
					age: req.body.age,
					number: req.body.number,
					img: req.body.img,
				};
				const user = await UserModel.create(newUser);
				return done(null, user);
			} catch (error) {
				logger.error(error);
			}
		},
	),
);

passport.use(
	'login',
	new Strategy(async (username, password, done) => {
		try {
			const user = await UserModel.findOne({ username });
			if (!user) {
				done(null, false);
			}
			const isValid = bcrypt.compareSync(password, user.password);
			if (isValid) {
				return done(null, user);
			} else {
				done(null, false);
			}
		} catch (error) {
			logger.error(error);
			done(error);
		}
	}),
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});
passport.deserializeUser((id, done) => {
	UserModel.findById(id, done);
});

export default passport;
