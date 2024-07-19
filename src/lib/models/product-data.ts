import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  image: String,
  sku: { type: String, unique: true },
  status: String
});

const product = models.product || model('product', ProductSchema);

export default product;
