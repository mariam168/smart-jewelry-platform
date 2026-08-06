import mongoose from "mongoose";

const smartExperienceSchema = new mongoose.Schema(
{
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },

    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true,
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    smartUnit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SmartUnit",
        required:true,
    },

    serialNumber:{
        type:String,
        unique:true,
        required:true,
    },

    manageToken:{
        type:String,
        unique:true,
        required:true,
    },

    publicToken:{
        type:String,
        unique:true,
        required:true,
    },

    status:{
        type:String,
        enum:[
            "waiting",
            "configured",
            "gifted",
            "active",
        ],
        default:"waiting",
    },

    ownerName:{
        type:String,
        default:"",
    },

    receiverName:{
        type:String,
        default:"",
    },

    receiverEmail:{
        type:String,
        default:"",
    },

    title:{
        type:String,
        default:"",
    },

    message:{
        type:String,
        default:"",
    },

    profileImage:{
        type:String,
        default:"",
    },

    gallery:[
        {
            image:String,
            uploadedAt:{
                type:Date,
                default:Date.now,
            },
        },
    ],

    videos:[
        {
            url:String,
        },
    ],

    audios:[
        {
            url:String,
        },
    ],

    socialLinks:[
        {
            title:String,
            url:String,
        },
    ],

    permissions:{
        allowGuestUpload:{
            type:Boolean,
            default:false,
        },

        allowComments:{
            type:Boolean,
            default:true,
        },

        publicGallery:{
            type:Boolean,
            default:true,
        },
    },

    activatedAt:Date,

},
{
    timestamps:true,
}
);

export default mongoose.model(
"SmartExperience",
smartExperienceSchema
);