import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    const { prompt, tag, userId } = await req.json();

    try {
        await connectToDB();
        const newPrompt = await Prompt.create({
            prompt,
            tag,
            creator: userId,
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 })
    }
}