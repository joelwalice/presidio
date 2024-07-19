import Product from "../../../../../lib/models/product-data";
import connect from "../../../../../lib/db";


export const POST = async(req: Request) => {
    try {
        
        const {sku, status} = await req.json();
        console.log(sku);
        await connect();
        const product = await Product.findOneAndUpdate(
            { sku: sku },
            { $set: { status: status } });
        console.log(product);
        return new Response(JSON.stringify({ message: 'Product Updated' }), {status : 200});
      } catch (error) {
        console.error('Error updating product status:', error);
        return new Response(JSON.stringify({ message: 'Error' }), {status : 500});
      }
}