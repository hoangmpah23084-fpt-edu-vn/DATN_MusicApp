
import mongoose from "mongoose";


const albumSchema = new mongoose.Schema({
    album_name: 
    {
        type: String,
        required: true,
    },
    list_song: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song",
        }
    ]
    // id_artist: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "artist",
    // }
    // để đây nào merge bảng artist vào thì mở cmt
}, { timeseries: true, versionKey: false });


export default mongoose.model("Album", albumSchema);