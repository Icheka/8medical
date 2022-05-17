const setTokenCookie = (token, req, res) => {
    console.log(`Set auth cookie.`);

    res.cookie('auth', token, {
        maxAge: 3600 * 2400 * 1000,
        httpOnly: false,
        sameSite: false,
        secure: true
    });

    return;
}


module.exports = {
    setTokenCookie
}