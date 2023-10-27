import ItemSong from "../ItemSong";

const ListSong = () => {
  return (
    <table className="w-full text-sm text-left">
      <thead className="text-xs text-[#86828c] uppercase ">
        <tr className="border-b-[#2c2436] border-b-[1px] ">
          <th scope="col" className="pl-[40px] py-[15px]">
            BÀI HÁT
          </th>
          <th scope="col" className="py-[15px]">
            ALBUM
          </th>
          <th className="w-56 text-right pr-10 py-[15px]">THỜI GIAN</th>
        </tr>
      </thead>
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
      <ItemSong />
    </table>
  );
};

export default ListSong;
