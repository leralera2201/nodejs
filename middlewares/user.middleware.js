const emailReg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

module.exports = {
    addId: (req, res, next) => {
        try {
            const user = req.body;
            user.id = Math.random().toString();

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
