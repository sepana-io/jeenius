import openai from "../../../services/openai";
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const { prompt } = req.query

    try {
        let response = await openai.prompt(prompt);

        res.status(200).json({ success: true, prompt, response });
    } catch(err){
        res.status(200).json({ success: false, prompt, error: err.toString() })
    }
}