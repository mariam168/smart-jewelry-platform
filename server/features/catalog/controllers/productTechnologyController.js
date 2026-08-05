import {

createProductTechnology,

getProductTechnologies,

getProductTechnologyById,

updateProductTechnology,

deleteProductTechnology,

}

from "../services/productTechnologyService.js";

export const createProductTechnologyController=
async(req,res,next)=>{

try{

const productTechnology=

await createProductTechnology(req.body);

return res.status(201).json({

success:true,

message:"Technology assigned successfully.",

data:{

productTechnology,

},

});

}

catch(error){

next(error);

}

};

export const getProductTechnologiesController=
async(req,res,next)=>{

try{

const technologies=

await getProductTechnologies(

req.params.productId

);

return res.json({

success:true,

data:{

technologies,

},

});

}

catch(error){

next(error);

}

};

export const getProductTechnologyController=
async(req,res,next)=>{

try{

const technology=

await getProductTechnologyById(

req.params.id

);

if(!technology){

return res.status(404).json({

success:false,

message:"Technology not found.",

});

}

return res.json({

success:true,

data:{

technology,

},

});

}

catch(error){

next(error);

}

};

export const updateProductTechnologyController=
async(req,res,next)=>{

try{

const technology=

await updateProductTechnology(

req.params.id,

req.body

);

if(!technology){

return res.status(404).json({

success:false,

message:"Technology not found.",

});

}

return res.json({

success:true,

message:"Technology updated successfully.",

data:{

technology,

},

});

}

catch(error){

next(error);

}

};

export const deleteProductTechnologyController=
async(req,res,next)=>{

try{

const technology=

await deleteProductTechnology(

req.params.id

);

if(!technology){

return res.status(404).json({

success:false,

message:"Technology not found.",

});

}

return res.json({

success:true,

message:"Technology removed successfully.",

});

}

catch(error){

next(error);

}

};