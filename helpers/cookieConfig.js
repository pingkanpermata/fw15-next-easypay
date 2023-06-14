const cookieConfig = {
    cookieName: "EasyPay",
    password: "M3h@8Zu#Qy2sDx5FvN6T9P1l0O7i4JcK",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export default cookieConfig;