import axios from "axios";


const createTrack = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true
});
export const getUrl = async (file : any) => {
  console.log(file);
  
  const response  = await createTrack.post("/upload/url", file, {
    headers : {
      "Content-Type": "multipart/form-data"
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
}