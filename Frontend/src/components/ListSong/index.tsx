import ItemSong from "../ItemSong"


const ListSong = () => {
    return (
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-[#86828c] uppercase">
                <tr>
                    <th scope="col" className="">
                        BÀI HÁT
                    </th>
                    <th scope="col" className="">
                        ALBUM
                    </th>
                    <th className="w-52 text-right pr-10">
                        THỜI GIAN
                    </th>
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

        </table>)
}

export default ListSong