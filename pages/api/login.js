import coockieConfig from "../../helpers/cookieConfig";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function loginRoute(req, res) {
    // get user from database then:
        // req.session.user = {
        //     id: 230,
        //     admin: true,
        // };
        // await req.session.save();
        // res.send({ ok: true });
        const request  = await fetch("https://cute-lime-goldfish-toga.cyclic.app/login", {
            method: "POST",
            body: new URLSearchParams(req.body).toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });

        const respons = await request.json();
        const token = respons?.results?.token;
        if(token){
            req.session.token = token;
            await req.session.save();
        }
        return res.json(respons);
    },
    coockieConfig
);