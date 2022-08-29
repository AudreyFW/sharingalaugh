import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../utils/constants';


const Discover = () => {
  const activeTopicStyle ='lg:border-2 hover:bg-primary lg:border-[#F51997] px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]';
  const topicStyle = 'lg:border-2 hover:bg-slate-200 hover:text-black lg:border-gray-300 px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-slate-200'
  const router= useRouter();
  const {topic} = router.query;


  return (
    <div className='lg:border-b-2 lg:border-gray-200 pb-6'>
      <p className='text-slate-200 font-semibold m-3 mt-4 hidden lg:block '>
        Popular Topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {
          topics.map((item)=>(
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <div className={topic=== item.name ?
                activeTopicStyle: topicStyle}>
                <span className='font-bold text-2xl xl:text-md'> {item.icon}</span>
                <span className='font-medium text-md hidden lg:block capitalize'>{item.name}</span>
              </div>
            </Link>
          ))
        }

      </div>
    </div>
  )
}

export default Discover