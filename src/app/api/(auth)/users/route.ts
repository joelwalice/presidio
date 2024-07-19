import bcrypt from "bcrypt"
import connect from "../../../../lib/db";
import Admin from "../../../../lib/models/admin-data"

export const GET = async (request: Request) => {
    try{
        await connect();
        const users = await Admin.find();
        console.log(users.length);
        return new Response(JSON.stringify(users), {status:200});
    }
    catch(err){
        return new Response(JSON.stringify(err), {status: 500});
    };
}

export const POST = async (request: Request) => {
    try {
      const body = await request.json();
      const hashedPassword = await bcrypt.hash(body.password, 10);

    const newAdmin = new Admin({
            name: body.name,
            email: body.email,
            password: hashedPassword, 
            role: body.role
        });
      await connect();
      await newAdmin.save();
  
      return new Response(
        JSON.stringify({ message: "User is created", user: newAdmin }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "Error in creating user",
          error,
        }),
        {
          status: 500,
        }
      );
    }
  };