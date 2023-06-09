import UserPrompt from "@models/userPrompts";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {

    const userId = params.id;
    const postId = params.postid;

    try {
        await connectToDB();

        const res = await UserPrompt.findOne({user: userId, prompt: postId});

        if (res){
            //console.log(res.completed);
            return new Response(JSON.stringify(res), {status: 200});
        } else {
            const newRecord = new UserPrompt({user:userId, prompt:postId});
            newRecord.save();
            console.log("Created new UserPrompt");
            return new Response(JSON.stringify(newRecord), {status: 200});
        }
    } catch (error){
        console.log("Failed GET request to UserPrompt");
        return new Response("Failed to fetch UserPrompt", { status: 500 });
    }

}


export const PATCH = async (request, {params}) => {
    const userId = params.id;
    const postId = params.postid;

    try {
        await connectToDB();

        const res = await UserPrompt.findOne({user: userId, prompt: postId});

        if (res){
            res.completed = !res.completed;
            await res.save();

            console.log(`Changed post completed status to: ${res.completed}`);

            return new Response(JSON.stringify("Successfully updated post"), {status: 200});
        } else {
            const newRecord = new UserPrompt({user:userId, prompt:postId, completed:true});
            await newRecord.save();
            console.log("Created new UserPrompt");
            return new Response(JSON.stringify(newRecord), {status: 200});
        }
    } catch (error){
        console.log("Failed PATCH request to UserPrompt");
        return new Response("Failed to fetch UserPrompt", { status: 500 });
    }

}