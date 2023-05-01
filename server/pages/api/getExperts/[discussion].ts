import openai from "../../../services/openai";
import NextCors from 'nextjs-cors';
import { experts } from "../../../services/data";

export default async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const { discussion } = req.query
    try {
        let prompt = `I have the array of people in json format: ${ JSON.stringify(experts) }. Out of this list please select and return in the same json format(name, profession, twitter, intro, avatar) the top 3 person with most expertise based on their profession and intro that relates best to the twitter post: "${discussion}"`;

        let response = await openai.prompt(prompt);

        let users = JSON.parse(response);

        res.status(200).json({ success: true, users });
    } catch(err){
        res.status(200).json({ success: false, error: err.toString() })
    }
}