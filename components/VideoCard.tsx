import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Video } from "../types";
import { NextPage } from "next";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: Video ;
}

const Card: NextPage<IProps> = ({ post }) => {
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {

    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if(videoRef?.current){
      videoRef.current.muted = isMuted
    }
  }, [isMuted])
  

  return (
    <div className="flex flex-col border-b-2 border-gray-300 pb-10">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="w-10 h-10">
            <Link href={`/profile/${post.postedBy?._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy?.image}
                  alt="profile- pic"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 text-pink-500 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-400 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${post._id}`}>
              <p className='mt-2 text-gray-800'>{post.caption}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="xl:ml-10  flex gap-4 relative">
        <div
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
          <video
              loop
              ref={videoRef}
              src={post.video.asset.url}
              className='lg:w-[500px] lg:h-[300px] md:h-[300px] md:w-[500px] md:ml-10    sm:ml-4 sm:w-[500px] sm:h-[300px]  w-[200px] h-[300px] rounded-2xl cursor-pointer bg-black'
            ></video>
          </Link>
            <div className="absolute bottom-6 cursor-pointer left-16 md:left-16 flex gap-10  w-[100px] md:w-[50px] lg:w-[500px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-white text-4xl lg:text-6xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-white text-4xl lg:text-6xl" />
                </button>
    
              )}
              {isMuted ? (
                <button onClick={()=>setIsMuted(false)}>
                  <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={()=>setIsMuted(true)}>
                  <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
                </button>
      
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
