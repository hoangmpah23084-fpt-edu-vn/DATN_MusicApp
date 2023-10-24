/* eslint-disable @typescript-eslint/no-misused-promises */
import Title from "../Title";
import { Box, TextField, Typography } from "@mui/material";
import { BoxProduct, BoxUpload } from "@/Mui/Component/Product";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handImage, handleFileUpload } from "@/Mui/Component/handUpload";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getAlbum } from "@/store/Reducer/albumReducer";
import { IArtist, validateArtist } from "../Interface/IArtist";
import { updateArtist } from "@/store/Reducer/artistReducer";
import { getOne } from "@/store/Reducer/artistReducer";
import { ifAlbum } from "../Interface/validateAlbum";
import { ifSong } from "../Interface/ValidateSong";
import { useParams } from "react-router-dom";
import { handGetOne } from "@/store/Reducer/Song";

const UpdateArtist = () => {
  const [ artist , setArtist ] = useState<IArtist>();
  const dispatch = useAppDispatch();
  const { album } = useAppSelector(({ album }) => album);
  const { song } = useAppSelector(({ Song }) => Song);
  const {id} = useParams<{id ?: string}>();

  useEffect(() => {
    if (id) {
        getOne(id).then(({data}) => {
            setArtist(data)
        }).catch((error) => console.error(error));
    }
    void dispatch(getAlbum());
    void dispatch(handGetOne());
  }, [id, dispatch]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateArtist),
  });
  useEffect(() => {
    return reset(artist);
  },[reset, artist])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handSubmitHandler: SubmitHandler<any> = async (value: IArtist) => {
    value.images = await handImage(value.images);
    const { payload } = await dispatch(updateArtist(value));
    if (payload) {
      alert(payload);
    }
  };
  return (
    <>
      <Title Title="Update Artist" />
      <Box sx={{ width: "100%", height: 1300 }}>
        <form
          onSubmit={handleSubmit(handSubmitHandler)}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
          encType="multipart/form-data"
        >
          <Box sx={{ width: "60%", height: "100%" }}>
            <Box sx={{ width: "100%", mt: "10px", height: "8%" }}>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                Basic Information
              </Typography>
              <Typography>
                Section to config basic product information
              </Typography>
            </Box>
            <div>
              <BoxProduct sx={{ width: "100%", height: "16%" }}>
                <Typography sx={{ padding: "8px 0px" }}>Artist name</Typography>
                <TextField
                  helperText={errors.name?.message}
                  placeholder="Enter Artist name"
                  {...register("name")}
                  sx={{
                    width: "100%",
                    "& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input": {
                      height: "10px",
                    },
                  }}
                />
              </BoxProduct>
              <BoxProduct sx={{ width: "100%", height: "16%" }}>
                <Typography sx={{ padding: "8px 0px" }}>Age</Typography>
                <TextField
                  placeholder="Enter Artist Age"
                  helperText={errors.age?.message}
                  {...register("age")}
                  sx={{
                    width: "100%",
                    "& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input": {
                      height: "10px",
                    },
                  }}
                />
              </BoxProduct>
              <BoxProduct sx={{ width: "100%", height: "16%" }}>
                <Typography sx={{ padding: "8px 0px" }}>Description</Typography>
                <TextField
                  placeholder="Enter Description"
                  type="text"
                  {...register("description")}
                  helperText={errors.description?.message}
                  sx={{
                    width: "100%",
                    "& .css-24rejj-MuiInputBase-input-MuiOutlinedInput-input": {
                      height: "10px",
                    },
                  }}
                />
              </BoxProduct>
            </div>
            <Box className="grid grid-cols-2 gap-6 mt-4 mb-5">
              <Box>
                <label>Select Album</label>
                <select
                  {...register("album")}
                  className="block w-full border-gray-300 rounded-lg"
                >
                  <option value={""} selected>
                    Choose an Album
                  </option>
                  {album.length > 0
                    ? album.map((item: ifAlbum) => (
                        <option value={item._id}>{item.album_name}</option>
                      ))
                    : ""}
                </select>
              </Box>
              <Box>
                <label>Select Song</label>
                <select
                  {...register("songs")}
                  className="block w-full border-gray-300 rounded-lg"
                >
                  <option value={""} selected>
                    Choose a Song
                  </option>
                  {song.length > 0
                    ? song.map((item: ifSong) => (
                        <option value={item._id}>{item.song_name}</option>
                      ))
                    : ""}
                </select>
              </Box>
            </Box>
            <div className="w-full h-[5%]">
              <button
                type="submit"
                className="bg-purple-500 text-white w-[100px] h-[85%] rounded-lg "
              >
                Submit
              </button>
            </div>
          </Box>
          <Box sx={{ width: "35%", height: "100%" }}>
            <Box sx={{ width: "100%", mt: "10px", height: "8%" }}>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                Basic Information
              </Typography>
              <Typography>
                Section to config basic product information
              </Typography>
            </Box>
            <BoxUpload>
              <TextField
                {...register("images")}
                type="file"
                inputProps={{ multiple: true }}
                error={Boolean(errors.images)}
                helperText={errors.images?.message}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  position: "absolute",
                  cursor: "pointer",
                  opacity: 0,
                  inset: "0px",
                  fontSize: "100%",
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  },
                  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                    height: "100%",
                  },
                }}
              ></TextField>
              <Box sx={{ textAlign: "center", margin: "4rem 0rem" }}>
                <img
                  src="../../../../public/Image/upload.png"
                  alt=""
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                    verticalAlign: "middle",
                  }}
                />
                <Typography variant="body1">
                  <span style={{ fontWeight: 600 }}>
                    Drop your Video here, or{" "}
                  </span>
                  <span style={{ fontWeight: 600, color: "#1D5D9B" }}>
                    {" "}
                    browse
                  </span>
                </Typography>
                <Typography variant="body1" sx={{ color: "gray" }}>
                  Support: jpeg, png
                </Typography>
              </Box>
            </BoxUpload>
          </Box>
        </form>
      </Box>
    </>
  );
};
export default UpdateArtist;
