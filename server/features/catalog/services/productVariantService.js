import ProductVariant from "../models/ProductVariant.js";


// ==========================================
// CREATE VARIANT
// ==========================================

export const createVariant =
async (variantData)=>{

const variant =
await ProductVariant.create(
variantData
);

return variant;

};


// ==========================================
// GET PRODUCT VARIANTS
// ==========================================

export const getProductVariants =
async(productId)=>{

return await ProductVariant
.find({
product:productId,
isActive:true,
})
.sort({
createdAt:1,
});

};


// ==========================================
// GET SINGLE VARIANT
// ==========================================

export const getVariantById =
async(id)=>{

return await ProductVariant.findById(id);

};


// ==========================================
// UPDATE VARIANT
// ==========================================

export const updateVariant =
async(
id,
variantData
)=>{

return await ProductVariant.findByIdAndUpdate(

id,

variantData,

{
new:true,
runValidators:true,
}

);

};


// ==========================================
// DELETE VARIANT
// ==========================================

export const deleteVariant =
async(id)=>{

return await ProductVariant.findByIdAndDelete(id);

};