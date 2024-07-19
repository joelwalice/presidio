import connect from "../../../../../../lib/db";
import product from "../../../../../../lib/models/product-data";

export const DELETE = async (req: Request) => {
    const sku = req.url.split('delete/')[1];
    console.log(sku);

    try {
        await connect();
        const result = await product.deleteOne({ sku: sku });
        if (result) {
            return new Response(JSON.stringify({ message: "Data Deleted" }), { status: 201 });
        } else {
            return new Response(JSON.stringify({ message: "Data Error" }), { status: 404 });
        }
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ message: "Server Error" }), { status: 500 });
    }
};
