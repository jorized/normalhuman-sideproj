// Allow people to hit this route -> /api/clerk/webhook

import { db } from "@/server/db";

export const POST = async (req: Request) => {
    const { data } = await req.json();
    console.log('Clerk webhook received: ', data);
    const emailAddress = data.email_addresses[0].email_address;
    const firstName = data.first_name;
    const lastName = data.last_name;
    const imageUrl = data.image_url;
    const id = data.id;

    //Everytime clerk creates a user in their db, sync it to our own db
    await db.user.create({
        data: {
            id: id,
            emailAddress: emailAddress,
            firstName: firstName,
            lastName: lastName,
            imageUrl: imageUrl
        }
    })
    console.log('user created');
    return new Response('Webhook received', { status: 200});
}