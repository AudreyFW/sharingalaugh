import { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
    const [showUserVideos, setShowUserVideos] = useState(true);
    const { user, userVideos, userLikedVideos}= data;
    const [videosList, setVideosList] = useState<Video[]>([]);

    const videos = showUserVideos? 'text-[#F51997]' : 'text-gray-500';
    const liked = !showUserVideos? 'text-[#F51997]' : 'text-gray-500';

    useEffect(()=>{
        if(showUserVideos){
            setVideosList(userVideos);
        }else{
            setVideosList(userLikedVideos);
        }
    },[showUserVideos, userLikedVideos, userVideos])

  return (
    <div className="w-full ">
      <div className="flex gap-6 md:gap-10 mb-4 w-full">
        <div className="w-16 h-16 md:w-22 md:h-22">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="profile-pic"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="md:text-2xl tracking-wider items-center justify-center flex gap-1 items-center text-md font-bold text-[#F51997] lowercase">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize md: text-xl text-gray-400 text-xs">{user.userName}</p>
        </div>
      </div>
      <div className="text-gray-200 pt-2">
        <div className="flex gap-10 mb-10 mt-10 border-b-2 lg:border-[#F51997] w-full">
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={()=>setShowUserVideos(true)}>Videos</p>

            <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={()=>setShowUserVideos(false)}>Liked</p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
            {
                videosList.length > 0 ?(
                    videosList.map((post: Video, idx: number)=>(
                        <VideoCard post={post} key={idx} />
                    ))
                ): <NoResults text={`No ${showUserVideos ? '': 'Liked'} Videos Yet`} />
            }

        </div>

      </div>
    </div>
  );
};



export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
