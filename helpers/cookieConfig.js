const cookieConfig = {
    cookieName: "EasyPay",
    password: "M3h@8Zu#Qy2sDx5FvN6T9P1l0O7i4JcK",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export default cookieConfig;

// const cookieConfig = {
//     cookieName: "ZIpay",
//     password: "N>x3Vq&9?)kPzp]GAg>y=$s3^r$GcPFQ",
//     // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//     cookieOptions: {
//         secure: process.env.NODE_ENV === "production",
//     },
// };

// export default cookieConfig;