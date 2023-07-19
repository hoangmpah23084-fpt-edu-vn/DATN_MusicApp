import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const songFavouriteSchema = new mongoose.Schema({

    id_user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User' // truy cập đến bảng User 
    },
    list_songFavourites: [{
        id_song: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Song' // truy cập đến bằng Song
        }
    }]
})

songFavouriteSchema.plugin(mongoosePaginate);
export default mongoose.model("Favourites", songFavouriteSchema)
