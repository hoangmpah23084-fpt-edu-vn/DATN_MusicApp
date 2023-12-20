import React, { useEffect, useState } from "react";
import { ifAlbum } from "../Admin/Interface/validateAlbum";
import { useParams } from "react-router-dom";
import axios from "axios";
import BXHItemSong from "@/components/BXHItemSong";
import SuggSkeleton from "../KhamPha/Skeleton/Sugg.skeleton";
import ListSong from "@/components/Favourites/ListSong";

type Props = {};

const DetailAlbum = (props: Props) => {
  const [loading, setLoading] = useState(true);

  const [album, setAlbum] = useState<ifAlbum[] | []>([]);
  const param = useParams();
  const id = param.id;
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/album/${id}`)
      .then(({ data }) => setAlbum(data.data));
    //   const song = album?.
  }, []);

  return (
    <div className="chanel-section-title mt-[70px] md:mt-[100px] px-[15px] md:px-16 py-5 flex justify-between md:mb-[20px] text-[#fff]">
      <ListSong listSong={album?.list_song} />
    </div>
  );
};

export default DetailAlbum;
