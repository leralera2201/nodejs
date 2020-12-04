const emailReg = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

module.exports = {
    checkUpdate: (req, res, next) => {
        try {
            if (!Object.keys(req.body).length) {
                throw new Error('You must put at least one of fields');
            }
            for (const key in req.body) {
                switch (key) {
                    case 'email':
                        if (!emailReg.test(req.body[key])) {
                            throw new Error('Email not valid');
                        }
                        break;
                    case 'password':
                        if (req.body[key].length < 6) {
                            throw new Error('Min password length must be 6');
                        }
                        break;
                    case 'name':
                        if (req.body[key].length < 2) {
                            throw new Error('Min name length must be 2');
                        }
                        break;
                    default:
                        throw new Error('Only name, email, password you can send');
                }
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    checkId: (req, res, next) => {
        try {
            const { userId } = req.params;
            if (userId < 1) {
                throw new Error('Id can not be less than 1');
            }
            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    checkValidity: (req, res, next) => {
        try {
            const { email, password, name } = req.body;

            if (!email || !emailReg.test(email)) {
                throw new Error('Email not valid');
            }

            if (!password || password.length < 6) {
                throw new Error('Min password length must be 6');
            }

            if (!name || name.length < 2) {
                throw new Error('Min name length must be 2');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
