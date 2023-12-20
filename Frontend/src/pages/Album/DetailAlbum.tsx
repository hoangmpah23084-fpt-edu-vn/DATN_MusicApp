import React, { useEffect, useState } from "react";
import { ifAlbum } from "../Admin/Interface/validateAlbum";
import { useParams } from "react-router-dom";
import axios from "axios";

type Props = {};

const DetailAlbum = (props: Props) => {
  const [album, setAlbum] = useState<ifAlbum[] | []>([]);
  const param = useParams();
  const id = param.id;
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/album/${id}`)
      .then(({ data }) => setAlbum(data.data));
  }, []);

  return <div></div>;
};

export default DetailAlbum;
