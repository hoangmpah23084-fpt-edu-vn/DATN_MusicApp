
import mongoose from "mongoose";


const genreSchema = new mongoose.Schema({
    genre_name:
    {
        type: String,
        required: true,
    },
    list_song: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song",
        }
    ],
}, { timeseries: true, versionKey: false });


export default mongoose.model("Genre", genreSchema);