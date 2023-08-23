import axios from "axios";

//todo UploadImage
type ResponseData = {
  [0] : File,
}
// type ResponseData1 = {
//   file : File[],
// }



export const handImage = async (file : FileList)=> {
    // const file = (e.target as HTMLInputElement).files;
    console.log(file);
    if(!file) return [] ;
    const files = Array.from(file);
    if (files.length === 0) return [];
    console.log(files);
    if (files) {
      const upLoadResponse = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append('upload_preset', 'demo-ECMA');
          formData.append("folder", "DATN");
          formData.append("cloud_name", "dsbiugddk");
          const response = await axios.post(`https://api.cloudinary.com/v1_1/dsbiugddk/image/upload`, formData)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
          return response.data.secure_url
        })
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
      const responesData : string[] = [...upLoadResponse];
      return responesData
    }
  }

  //todo Upload Video
export  const handleFileUpload = async (file: ResponseData) => {
    // const file = e.target.files[0];
    console.log(file);
    const files = file[0];
    if (!files) return;
    const formData = new FormData();
    formData.append('file', files);
    formData.append('upload_preset', 'demo-ECMA'); // Đặt upload preset tương ứng của bạn
    formData.append('folder', 'audiofiles'); // Đặt upload preset tương ứng của bạn
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dsbiugddk/video/upload`,
        formData
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (response.data && response.data.secure_url) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return response.data.secure_url
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
};