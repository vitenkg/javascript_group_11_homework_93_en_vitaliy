// router.post('/', async (req, res) => {
//     const inputToken = req.body.accessToken;
//
//     const accsessToken = config.facebook.appId + '|' + config.facebook.appSecret;
//
//     const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&accsess_token=${accsessToken}}`;
//
//     try {
//         const response = await axios.get(debugTokenUrl);
//
//         if (response.data.data.error) return res.status(401).send({global: 'Facebook token incorrect'});
//
//         if (req.body.id !== response.data.data.user_id) return res.status(401).send({global: 'Wrong user Id'});
//
//         let user = await User.findOne({facebookId: req.body.id});
//
//         if (!user) user = new User({
//             email: req.body.email,
//             password: nanoid(),
//             facebookId: req.body.id,
//             displayName: req.body.name,
//         });
//
//         console.log(user);
//         user.generateToken();
//         user.save({validateBeforeSave: false});
//
//         console.log(response);
//         res.send({message: 'Success', user});
//     } catch (e) {
//         res.status(401).send({global: 'Facebook token incorrect'});
//     }
// });