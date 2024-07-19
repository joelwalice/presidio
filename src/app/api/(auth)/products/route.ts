import db from "../../../../lib/db";
import connect from "../../../../lib/db";
import Product from '../../../../lib/models/product-data';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    if (body.image === null) {
      body.image = "";
    }

    const product = new Product({
      name : body.name,
      category : body.category,
      price : body.price,
      image : body.image,
      sku : body.sku,
      status : 'Not Ordered'
    })
    await connect();
    await product.save();
    
    return new Response(JSON.stringify({ message: "Data is created" }), { status: 200 });
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response(JSON.stringify({ message: "Error in creating product", error }), { status: 500 });
  }
}

export const GET = async () => {
  try {
    await connect();
    const products = await Product.find({});
    if (!products) return new Response('Error');
    if (products) {
      return new Response(JSON.stringify({ data: products }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'No products found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ message: "Error in fetching products", error }), { status: 500 });
  }
}