import Product from "../models/Product.js";
import TechnologyModel from "../models/TechnologyModel.js";
import ProductTechnology from "../models/ProductTechnology.js";

export const createProductTechnology =
async(data)=>{

const product=
await Product.findById(data.product);

if(!product){

const error=new Error("Product not found.");

error.statusCode=404;

throw error;

}

const technologyModel=
await TechnologyModel.findById(
data.technologyModel
);

if(!technologyModel){

const error=new Error("Technology model not found.");

error.statusCode=404;

throw error;

}

return await ProductTechnology.create(data);

};

export const getProductTechnologies=
async(productId)=>{

return await ProductTechnology.find({

product:productId,

})

.populate("technologyModel")

.populate("product");

};

export const getProductTechnologyById=
async(id)=>{

return await ProductTechnology.findById(id)

.populate("technologyModel")

.populate("product");

};

export const updateProductTechnology=
async(id,data)=>{

return await ProductTechnology.findByIdAndUpdate(

id,

data,

{

new:true,

runValidators:true,

}

);

};

export const deleteProductTechnology=
async(id)=>{

return await ProductTechnology.findByIdAndDelete(id);

};