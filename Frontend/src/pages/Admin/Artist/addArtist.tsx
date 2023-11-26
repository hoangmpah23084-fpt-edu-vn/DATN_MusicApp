/* eslint-disable @typescript-eslint/no-misused-promises */
import Title from "../Title";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BoxProduct, BoxUpload } from "@/Mui/Component/Product";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handImage } from "@/Mui/Component/handUpload";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { getAlbum } from "@/store/Reducer/albumReducer";
import { IArtist, validateArtist } from "../Interface/IArtist";
import { addArtist } from "@/store/Reducer/artistReducer";
import { handGetSong } from "@/store/Reducer/Song";
import { ifAlbum } from "../Interface/validateAlbum";
import { Link } from "react-router-dom";

const AddArtist = () => {
  const dispatch = useAppDispatch();
  const { album } = useAppSelector(({ album }) => album);
  useEffect(() => {
    void dispatch(getAlbum());
    void dispatch(handGetSong());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateArtist),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handSubmitHandler: SubmitHandler<any> = async (value: IArtist) => {
    value.images = await handImage(value.images);
    console.log(value);
    const { payload } = await dispatch(addArtist(value));
    if (payload) {
      alert("Thêm Artist thành công");
    }
  };
  return (
    <>
      <Title Title="Add Artist" />
      <Box sx={{ width: "100%" }}>
        <form
          onSubmit={handleSubmit(handSubmitHandler)}
          style={{
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
                <Typography sx={{ padding: "8px 0px" }}>Name</Typography>
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
            <div className="mt-[15px]">
              <label>Select Album</label>
              <select required  {...register("album")} className='block w-[50%] border-gray-300 rounded-lg'>
                <option value={""}>Choose an Album</option>
                  {
                    album.length > 0  ? album.map((item : ifAlbum) => <option key={item._id} value={item._id}>{item.album_name}</option> ) : ""
                  }
              </select>
            </div>
            <div className="mt-5">
              <Button variant="contained" color="secondary">
                Submit
              </Button>
              <Button variant="contained" color="secondary" sx={{ ml: "10px" }}>
                <Link to={'/admin/list-artist'}>List Arrtist</Link>
              </Button>
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
export default AddArtist;