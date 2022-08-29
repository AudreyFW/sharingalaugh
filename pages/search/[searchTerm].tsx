import { useState } from "react";
import { BASE_URL } from "../../utils";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";


const Search = ({ videos }: { videos: Video[] }) => {
    const [isAccount, setIsAccount] = useState(false);
    const {allUsers} = useAuthStore(); 

    const accounts = isAccount? 'text-[#F51997]' : 'text-gray-400';
    const isVideos= !isAccount? 'text-[#F51997]' : 'text-gray-400';
    const router = useRouter();
    const {searchTerm}:any=router.query;
    const searchedAccounts = allUsers.filter((user:IUser)=> user.userName.toLowerCase().includes(searchTerm.toLowerCase()));




  return (
    <div className="w-full ">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-[#F51997]  w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccount(true)}
        >
          Accounts
        </p>

        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccount(false)}
        >
          Videos
        </p>
      </div>
      {
        isAccount ? (
            <div className="md:mt-16">
                {
                    searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user:IUser, idx:number)=>(
                            <Link href={`/profile/${user._id}`} key={idx}>
                            <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                              <div>
                                <Image
                                  src={user.image}
                                  width={50}
                                  height={50}
                                  className="rounded-full"
                                  alt="profile-pic"
                                />
                              </div>
                              <div className="hidden xl:block">
                                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                  {user.userName.replaceAll(" ", "")}
                                  <GoVerified className="text-blue-400" />
                                </p>
                                <p className="capitalize text-gray-400 text-xs">
                                  {user.userName}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))
                    ):(
                        <NoResults text={`No Video results for ${searchTerm}`}/>

                    )
                }

            </div>
        ):(
            <div className="md:mt-16 flex flex-wrap gap-6 md:justify-center">
                {
                    videos.length ? (
                        videos.map((video:Video, idx)=>(
                            <VideoCard post={video} key={idx} />
                        ))
                    ):(
                        <NoResults text={`No Video results for ${searchTerm}`}/>
                    )
                }
            </div>
        )
      }
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
