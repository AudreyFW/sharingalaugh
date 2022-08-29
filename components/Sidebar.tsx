import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


import Discover from "./Discover";
import SuggestedAccount from "./SuggestedAccount";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);
  const normalLink =
    "flex item-center gap-3 hover:bg-primary hover:text-[#F51997] text-gray-100 p-3 justify-center lg:justify-start cursor-pointer font-semibold rounded";

  window.addEventListener('resize', function(){
    if(!window.matchMedia("(min-width:1024px)").matches){
      setShowSidebar(false);
    }else{
      setShowSidebar(true);
    }
  })

  return (
    <div>
      <div
        className="block lg:hidden m-3 ml-8 mt-4 text-xl "
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <AiOutlineClose  color='black' />: <AiOutlineMenu className="text-2xl" color='black' />}
      </div>
      {showSidebar && (
        <div className="bg-black lg:w-400 w-20 border-r-2 flex flex-col justify-start mb-10 border-gray-100 lg:border-0 p-3">
          <div className="lg:border-b-2 border-gray-100  xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-3xl text-[#F51997]">
                  <AiFillHome />
                </p>
                <span className="text-2xl hidden lg:block">Home</span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccount />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
