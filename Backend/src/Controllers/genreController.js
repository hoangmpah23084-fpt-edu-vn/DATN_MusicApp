import Genre from "../Models/genderModel.js";
import { genreValidate } from "../Schemas/genderSchema.js";

export const create_Genre = async (req, res) => {
    try {
        const { error } = genreValidate.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((item) => item.message);
        }
        const data = await Genre.create(req.body);
        if (!data) {
            return res.status(400).json({ message: "Create Genre Failed" });
        }
        console.log(data);
        return res.status(200).json({
            message: "Create Genre Success",
            data
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAll_Genre = async (req, res) => {
    try {
        const data = await Genre.find();
        if (!data) {
            return res.status(400).json({ message: "Get All Genre Failed" });
        }
        return res.status(200).json({
            message: "Get All Genre Success",
            data
        });
    } catch (error) {
        console.log(error);
    }
}

export const get_GenreById = async (req, res) => {
    try {
        const data = await Genre.findById(req.params.id);
        if (!data) {
            return res.status(400).json({ message: "Get Genre By Id Failed" });
        }
        return res.status(200).json({
            message: "Get Genre By Id Success",
            data
        });
    } catch (error) {
        console.log(error);
    }
}


export const update_Genre = async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!genre) {
            return res.status(404).json({
                message: "Get Genre By Id Failed",
            });
        }
        return res.status(200).json({
            message: "Update Genre Success",
            data: genre,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const delete_Genre = async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Genre Deleted",
            genre,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}