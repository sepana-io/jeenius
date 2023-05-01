const { Configuration, OpenAIApi } = require("openai");

class OpenAi {
    private openai;

    constructor(){
        let configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        this.openai = new OpenAIApi(configuration);
    }

    async prompt(text){
        const completion = await this.openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.5,
            max_tokens: 2048
        });

        return completion.data.choices[0].text;
    }
}

export default new OpenAi();