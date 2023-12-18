import { useCallback, useEffect, useRef, useState } from "react";
import "./css.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiRadio } from "react-icons/fi";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { FaDoorOpen } from "react-icons/fa";
import RoomLeftItem from "@/components/Room-left-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Socket, io } from "socket.io-client";
import axios from "axios";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { listMessages, memberGroup } from "../Admin/Interface/Room";
import SideBarRoom from "./SideBarRoom";
import { handGetSong } from "@/store/Reducer/Song";
import { setCurrentSong, setStateSong } from "@/store/Reducer/currentSong";
import FooterRoom from "@/components/Footer/Room/FooterRoom";
import { toast } from "react-toastify";
import { ifSong } from "../Admin/Interface/ValidateSong";
import { MdPerson } from "react-icons/md";
import { leaveRoom } from "@/store/Reducer/roomReducer";

type Props = {
  roomLive?: boolean;
};


let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
const RoomPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [listMess, setListMess] = useState<listMessages[] | []>([]);
  const [listMember, setlistMember] = useState<memberGroup[] | []>([]);
  const [stateSideBar, setStateSideBar] = useState<string>("trochuyen")
  const [listSong, setListSong] = useState<ifSong[] | []>([])
  const { currentSong, stateSong } = useAppSelector(({ currentSong }) => currentSong);
  const [admin, setAdmin] = useState<any | {}>({});
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(handGetSong())
  // }, [dispatch, listSong]);
  console.log(listSong);
  

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const convert = JSON.parse(user);
      if (convert._id != admin._id && admin._id) {
        socket.emit("takeSongWhenJoin", { idroom: id, song: currentSong })
      }
    }
  }, [])

  const FetchMessage = () => {
    axios.get(`http://localhost:8080/api/room/${id}`).then(({ data }) => {
      console.log(data.data.currentSongInRoom[0]);
      dispatch(setCurrentSong(data.data.currentSongInRoom[0]))
      localStorage.setItem('song', JSON.stringify(data.data.currentSongInRoom[0]));
      console.log(currentSong);
      setListSong(data.data.listSong);
      setAdmin(data.data.isAdminGroup);
      setListMess([...listMess, ...data.data.listMessages]);
      setlistMember(data.data.memberGroup);
      socket.emit('joinRoom', data.data._id);
    });
  }

  useEffect(() => {
    socket = io("http://localhost:8080");
    const user = localStorage.getItem('user');
    if (user) {
      const convert = JSON.parse(user);
      socket.emit('setUser', convert._id)
    }
    FetchMessage();
  }, [])
  useEffect(() => {
    console.log("UPDATE SONG");
    
  },[listSong])
  useEffect(() => {
    socket.on("messRecived", (value) => {
      setListMess([...listMess, value])
    })
  }, [listMess])

  useEffect(() => {
    handleRouter()
  }, [id])

  const handleRouter = async () => {
    const user = JSON.parse(localStorage.getItem("user") as string)
    console.log(user?._id);
    if (id) {
      try {
        const resp = await axios.get(`http://localhost:8080/api/room/${id}`)
        if (!JSON.stringify(resp.data.data.memberGroup).includes(user?._id)) {
          toast.success("Xin vui lòng rời khỏi phòng.")
          // navigate("/")
        }
      } catch (error) {
        toast.error("Lỗi hệ thống")
        // navigate("/")
      }
    }
  }

  // console.log(user._id == admin._id,user, admin);

  const handLeaveRoom = () => {
    const user = JSON.parse(localStorage.getItem("user") as string)
    if (admin) {
      if (user._id == admin._id) {
        console.log("Sending leaveRoomAdmin event");
        socket.emit('leaveRoomAdmin', {
          user: user._id,
          admin: admin._id,
          idroom: id,
        })
        socket.emit("disconnectClient");
        toast.success("Chủ phòng đã rời phòng thành công");
        leaveRoom(id as string);
        navigate('/')
      } else {
        socket.emit('leaveRoomPerson', {
          user: user._id,
          admin: admin._id,
          idroom: id,
        })
        socket.emit("disconnectClient")
        leaveRoom(id as string);
        navigate('/');
      }
    }
    // axios.get(`http://localhost:8080/api/room/${id}`).then(({ data }) => {
    //   setlistMember(data.data.memberGroup);
    // });
  }

  useEffect(() => {
    if (id) {
      socket.on("resetUser", value => {
        if (value) {
          axios.get(`http://localhost:8080/api/room/${id}`).then(({ data }) => {
            setlistMember(data.data.memberGroup);
          })
        }
      })
    }
  }, []);
  useEffect(() => {
    const handleLeaveRoomAdmin = (value: any) => {
      if (value) {
        // axios.get(`http://localhost:8080/api/room/${id}`).then(({ data }) => {
        //   setlistMember(data.data.memberGroup);
        // })
        toast.success("Phòng không còn tồn tại vì chủ phòng đã rời");
      }
      navigate('/')
    };
    // sessionStorage.removeItem("playbackState");
    socket.on("serverLeaveRoomAdmin", handleLeaveRoomAdmin);
  }, []);
  // , [socket]
  useEffect(() => {
    socket.on("serverLeaveRoomPerson", (value) => {
      if (value) {
        console.log("Set lại datas");
        axios.get(`http://localhost:8080/api/room/${id}`).then(({ data }) => {
          const sliceData = data.data.memberGroup.slice(0, 1);
          setlistMember(sliceData)
        })
        toast.success("Thành viên đã rời phòng thành công")
      }
    });
  }, []);
  //! Event F5 reload Page Start

  // const handleBeforeUnload = () => {
  //   const user = JSON.parse(localStorage.getItem("user") as string)
  //   if (admin) {
  //     if (user._id == admin._id) {
  //       console.log("Sending leaveRoomAdmin event");
  //       socket.emit('leaveRoomAdmin', {
  //         user: user._id,
  //         admin: admin._id,
  //         idroom: id,
  //       })
  //       socket.emit("disconnectClient");
  //       toast.success("Chủ phòng đã rời phòng thành công");
  //       leaveRoom(id as string);
  //       navigate('/')
  //     } else {
  //       socket.emit('leaveRoomPerson', {
  //         user: user._id,
  //         admin: admin._id,
  //         idroom: id,
  //       })
  //       socket.emit("disconnectClient")
  //       leaveRoom(id as string);
  //       navigate('/');
  //     }
  //   }
  // };
  // useEffect(() => {
  //   // Attach event listeners for beforeunload and unload events
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   // window.addEventListener("unload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     // window.removeEventListener("unload", handleBeforeUnload);
  //   };
  // }, [stateSong]);
  // useEffect(() => {
  //   if (audioRef.current) {
  //     const getplaybackState = localStorage.getItem("playbackState");
  //     if (!getplaybackState) return;
  //     const pausePlaybackState = JSON.parse(getplaybackState);
  //     console.log("NẾU khi F5 page thì chạy và đây");
  //     dispatch(setCurrentSong(pausePlaybackState.currentSong));
  //     // sliderFooter
  //     audioRef.current && (audioRef.current.currentTime = pausePlaybackState.currentTime);
  //     localStorage.removeItem("playbackState");
  //   }
  // },[])
  
  // const handleBeforeUnload = () => {
  //   const playBackState = {
  //     currentTime: audioRef.current?.currentTime || 0,
  //     stateSong: stateSong,
  //     currentSong: currentSong
  //   };
  //   localStorage.setItem("playbackState", JSON.stringify(playBackState));
  // };
  // useEffect(() => {
  //   if (id) {
  //     socket.on("setverPauseSongReload", value => {
  //       if (value) {
  //         dispatch(setStateSong(false));
  //         audioRef.current?.pause();
  //       }
  //     })
  //   }
  // },[])

  // useEffect(() => {
  //   // Attach event listeners for beforeunload and unload events
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   window.addEventListener("unload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     window.removeEventListener("unload", handleBeforeUnload);
  //   };
  // }, [stateSong]);


  // }, [stateSong]);

// const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
//   event.preventDefault();
//   const user = JSON.parse(localStorage.getItem("user") as string);
//   if (admin) {
//     if (user._id === admin._id) {
//       console.log("Sending leaveRoomAdmin event");
//        socket.emit('leaveRoomAdmin', {
//         user: user._id,
//         admin: admin._id,
//         idroom: id,
//       });
//        socket.emit("disconnectClient");
//       toast.success("Chủ phòng đã rời phòng thành công");
//       // await leaveRoom(id as string);
//     } else {
//        socket.emit('leaveRoomPerson', {
//         user: user._id,
//         admin: admin._id,
//         idroom: id,
//       });
//        socket.emit("disconnectClient");
//       // await leaveRoom(id as string);
//     }
//   }
//   // window.location.href = "/";
//   navigate("/")
// };


// useEffect(() => {
//   window.addEventListener("beforeunload", handleBeforeUnload);

//   return () => {
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   };
// }, []);


  //! Event F5 reload Page end

  return (
    <div>
      <div
        className={`zm-room-wrapper bg-[#14182A] flex fixed 
        h-full
         left-0 top-0 right-0 bottom-0 text-white overflow-hidden`}
      >
        <div className="zm-left-content w-[88px] relative z-20 bg-[#21181c] h-full">
          <div className="scroll-container h-full">
            <div className="content relative h-full">
              <Swiper
                modules={[Navigation]}
                direction="vertical"
                slidesPerView={9}
                navigation={true}
              >
                {img_slide.map((slide) => {
                  return (
                    <SwiperSlide key={slide.id}>
                      <RoomLeftItem image={slide.img} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>

        <div
          style={{ backgroundImage: `url(${background})` }}
          className="zm-room relative bg-no-repeat bg-cover "
        >
          <div className="zm-room-opacity absolute top-0 left-0 right-0 bottom-0"></div>
          <div className="zm-room-content relative h-full p-[30px] pl-[40px] ">
            <div className="top-info flex">
              <div className="live-info flex">
                <div className="media-left relative mr-[10px]">
                  <div className="w-[80px] h-[80px] overflow-hidden">
                    <img
                      className="rounded-full"
                      src="../../../public/Image/fd79808d2180de9a421afa6aff38953e.jpg"
                      alt=""
                    />
                  </div>
                  <div className="label absolute bg-[#ff0a0a] uppercase flex justify-center items-center font-bold text-[12px] px-[15px] py-[1px] rounded-[5px] left-[50%] -translate-x-[50%] -bottom-[6px]">
                    Live
                  </div>
                </div>
                <div className="media-content flex flex-col ">
                  <div className="top">
                    <h3 className="title text-[48px] font-bold leading-[1.2]">
                      K-POP Radio
                    </h3>
                  </div>
                  <div className="bottom flex items-center gap-4">
                    <FiRadio />
                    <h3 className="text-[14px]">K-POP theo yêu cầu</h3>
                  </div>
                </div>
              </div>
              <div className="stats flex ml-[32px] gap-[20px] text-[18px]">
                <div className="view flex justify-center items-center gap-[10px]">
                  <MdPerson />
                  <span>{listMember.length}</span>
                </div>
              </div>
            </div>

            <div className="box-media-play w-[250px] mt-[40px]">
              <div className="title uppercase text-[12px] font-bold tracking-[1px]">
                Bài hát đang phát
              </div>
              <Link to={"#"}>
                <div className="media flex mt-[8px] p-[12px] rounded-[5px] items-center bg-[rgb(166,158,145)]">
                  <div className="media-left mr-[10px] grow-0 shrink-0">
                    <div className="w-[40px] h-[40px]">
                      <img
                        className="rounded-[5px] h-full"
                        src={`${currentSong?.song_image[0]}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="media-content grow shrink">
                    <div className="name text-[14px]">
                      <span>{currentSong?.song_name}</span>
                    </div>
                    <h3 className="subtitle text-[rgba(254,255,255,.6)]  text-[12px] uppercase">
                      {currentSong?.song_singer}
                    </h3>
                  </div>
                  <div className="media-right grow-0 shrink-0 flex items-center">
                    <button className="cursor-pointer">
                      <AiOutlineHeart />
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="action-group absolute right-[30px] top-[30px] z-30">
              <div className="item0 flex gap-2">
                <button className="group relative flex flex-col items-center justify-center" onClick={() => handLeaveRoom()}>
                  <FaDoorOpen className="bg-[rgba(255,255,255,.2)] px-3 py-2 rounded-full text-[40px] hover:brightness-90 cursor-pointer" />
                  <div className="item-hover1 relative  text-xs rounded-[5px] bg-[#000] text-center py-1 opacity-0 group-hover:opacity-100 ease-in-out duration-500 mt-[10px]">
                    <p className="text-white px-2 ">Rời phòng</p>
                  </div>
                </button>
                <button className="group relative ">
                  <BsChevronDown className="bg-[rgba(255,255,255,.2)] px-3 py-2 rounded-full text-[40px] hover:brightness-90 cursor-pointer" />
                  <div className="item-hover relative text-xs rounded-[5px] bg-[#000] text-center py-1 opacity-0 group-hover:opacity-100 ease-in-out duration-500 mt-[10px]">
                    <p className="text-white">Đóng</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* //todo SideBar Rooom */}
          <SideBarRoom listMess={listMess} setListMess={setListMess} audioRef={audioRef} socket={socket} setStateSideBar={setStateSideBar} stateSideBar={stateSideBar} />
        </div>
        {listMember.length > 0 && listSong.length > 0 && <FooterRoom ListData={listSong} audioRef={audioRef} idRoom={id} listMember={listMember} />}
      </div>
    </div>
  );
};

export default RoomPage;





const img_slide = [
  { id: 0, img: "../../../public/Image/efb05fb9097a7057aecef6ecb62bff5a.jpg" },
  { id: 1, img: "../../../public/Image/fd79808d2180de9a421afa6aff38953e.jpg" },
  { id: 2, img: "../../../public/Image/bf223818f85e7fe129091b415038ca6c.jpg" },
  { id: 3, img: "../../../public/Image/0ef8beec056970cb6e9596e056fa1c5a.jpg" },
  { id: 4, img: "../../../public/Image/9787e738668f7eec23d2e8e4306baac4.jpg" },
  { id: 5, img: "../../../public/Image/9787e738668f7eec23d2e8e4306baac4.jpg" },
  { id: 6, img: "../../../public/Image/9787e738668f7eec23d2e8e4306baac4.jpg" },
  { id: 7, img: "../../../public/Image/9787e738668f7eec23d2e8e4306baac4.jpg" },
  { id: 8, img: "../../../public/Image/e663da1f89026b0e73a979ca67a5eb96.jpg" },
  { id: 9, img: "../../../public/Image/ef629460aba3bf16ced1931b951a9dc6.jpg" },
  { id: 10, img: "../../../public/Image/ef629460aba3bf16ced1931b951a9dc6.jpg" },
  { id: 11, img: "../../../public/Image/9787e738668f7eec23d2e8e4306baac4.jpg" },
];



//background image
const background = "../../../public/Image/e1887a2c79f9d3d04984905cbf443a29.jpg";