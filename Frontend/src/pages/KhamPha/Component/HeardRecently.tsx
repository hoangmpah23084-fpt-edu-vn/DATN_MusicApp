import SongCarouselItem from "@/components/Song-carousel-item";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const HeardRecently = (props: Props) => {
  const song = useAppSelector(({ Song }) =>
    Song.song.filter((item, index) => index >= 7 && index <= 11 && item)
  );

  // const song1 = useAppSelector(({Song}) => console.log(Song));

  return (
    <div className="carousel-wrapper relative ">
      <div className="carousel flex -mx-[15px]">
        <div className="carousel-container flex w-[100%]">
          {song.length > 0 &&
            song.map((item) => (
              <Link to={"/playlist"} className="w-[25%]">
                <SongCarouselItem item={item} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default HeardRecently;
