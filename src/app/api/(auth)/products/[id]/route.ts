import connect from "../../../../../lib/db";
import Product from "../../../../../lib/models/product-data";

export const PUT = async (req: Request) => {
    const sku = req.url.split("products/")[1];
    const body = await req.json();

    try {
        await connect();
        const updateFields = {
            name: body.name,
            category: body.category,
            sku : body.sku,
            image: body.image,
            price: body.price
          };
          const updatedProduct = await Product.findOneAndUpdate(
            { sku: sku },
            { $set: updateFields }
          );

        if (updatedProduct.affectedRows > 0) {
            return new Response(
                JSON.stringify({ message: "Data Updated" }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ message: "Product not found" }),
                { status: 404 }
            );
        }
    } catch (err) {
        return new Response(
            JSON.stringify({ message: 'Error updating product', data: err }),
            { status: 500 }
        );
    }
};

export const GET = async (req: Request) => {
    const sku = req.url.split("products/")[1];
    console.log(sku);
    try {
        await connect();
        const product = await Product.findOne({sku : sku});
        
        if (!product) {
            return new Response(JSON.stringify({ message: 'Data not found' }), { status: 404, });
        }
        console.log(product);
        return new Response(JSON.stringify({ message: 'Data found', data: product }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Server Error' }), { status: 500, });
    }
};