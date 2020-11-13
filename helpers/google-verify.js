const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleVerify = async (token) => {
    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_ID,
        process.env.GOOGLE_SECRET
    );
    const tiket = await oAuth2Client.verifyIdToken({
        idToken: token
        //audience: GOOGLE_CLIENT_ID
    });
    const payload = tiket.getPayload();
    const { name, email, picture } = payload;
    return { name, email, picture };
}

module.exports = {
    googleVerify
}