import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import connect from "../../../../../lib/db";
import Admin from "../../../../../lib/models/admin-data"

const JWT_SECRET = "jwtsupersecret";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        await connect();
        const user = await Admin.findOne({ email: body.email });

        if (!user) {
            return new Response(JSON.stringify({ message: 'No User' }), { status: 404 });
        }

        if (!user.role.includes(body.role)) {
            return new Response(JSON.stringify({ message: 'Invalid Role' }), { status: 401 });
        }

        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: 'Invalid Credentials' }), { status: 401 });
        }

        const token = jwt.sign({ email: body.email, role: body.role }, JWT_SECRET);
        return new Response(JSON.stringify({data : {token, name:user.name, email: user.email, password: user.password, role: user.role, new: user.new} }), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ message: 'Error' }), { status: 500 });
    }
}

