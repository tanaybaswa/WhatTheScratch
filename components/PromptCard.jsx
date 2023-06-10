"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import {BsFillArrowUpRightSquareFill} from "react-icons/bs"
import {LuExternalLink} from "react-icons/lu";


const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  let color = "shadow-[inset_0px_-30px_50px_0_rgb(200,200,200,0)]";

  // if(post.diff == "Hard"){
  //   color = "shadow-[inset_0px_-30px_50px_0_rgb(200,30,30,0.2)]";
  // } else if(post.diff == "Easy"){
  //   color = "shadow-[inset_0px_-30px_50px_0_rgb(90,200,90,0.2)]";
  // } else if(post.diff == "Medium"){
  //   color = "shadow-[inset_0px_-30px_50px_0_rgb(200,120,50,0.2)]";
  // }

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/${post._id}`);
      const data = await response.json();

      setToggle(data.completed);
    };

    if (session?.user.id) fetchData();
  }, [session?.user.id]);

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  // const handleCopy = () => {
  //   setCopied(post.prompt);
  //   navigator.clipboard.writeText(post.prompt);
  //   setTimeout(() => setCopied(false), 3000);
  // };

  const handleToggle = async () => {
    setToggle((prev) => !prev);
    const response = await fetch(`/api/users/${session?.user.id}/${post._id}`,{
      method:"PATCH",
      body:{}
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };

  return (
    <div className="break-inside-avoid shadow-lg rounded-t-3xl">
      <div className="prompt_card_top">
        <div
            className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
            onClick={handleProfileClick}
            >
            <Image
              src={post.creator.image}
              alt='user_image'
              width={37}
              height={37}
              className='rounded-full object-contain'
              />

            <div className='flex flex-col'>
              <h3 className='font-satoshi font-semibold text-blue-500 text-lg'>
                {post.creator.username}
              </h3>
              {/* <p className='font-inter text-sm text-gray-500'>
                {post.creator.email}
              </p> */}
            </div>
          </div>
          <div className='copy_btn_two' onClick={handleToggle}>
          <Image
            src={
              toggle
              ? "/assets/images/done3.png"
              : "/assets/images/lock.png"
            }
            alt={toggle? "Done" : "Locked"}
            width={24}
            height={24}
            />
        </div>
      </div>

    <div className={`prompt_card_two ${color}`}>
      <p className='my-4 font-satoshi text-lg text-gray-700'>{post.prompt}</p>
      <p
        className='font-satoshi text-md flex gap-2'
        // onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
    
        {Array.isArray(post.tag) && post.tag.map((t, index) => (
          <span
          key={index}
          onClick={() => handleTagClick && handleTagClick(t)}
          className="text-blue-500 cursor-pointer"
          >
            {t}
          </span>
          ))}
        
      </p>

      

      <div className="flex justify-between items-center my-4">


        {post.diff == 'Hard'?(<p className="font-bold text-lg font-satoshi text-red-600">
          {post.diff}
        </p>):<></>}

        {post.diff == 'Medium'?(<p className="font-bold text-lg font-satoshi text-orange-500">
          {post.diff}
        </p>):<></>}

        {post.diff == 'Easy'?(<p className="font-bold text-lg font-satoshi text-green-500">
          {post.diff}
        </p>):<></>}


        <p className='font-satoshi text-sm font-semibold text-blue-400'>
          <a 
          href={post.scratch_link} 
          target="_blank"
          className="flex justify-normal gap-1"
          >
            {/* <BsFillArrowUpRightSquareFill opacity={1} size={18}/> */}
            <LuExternalLink size={24}/> 
          </a>
        </p>

      </div>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm text-green-600 font-semibold cursor-pointer'
            onClick={handleEdit}
            >
            Edit
          </p>
          <p
            className='font-inter text-sm text-orange-600 font-semibold cursor-pointer'
            onClick={handleDelete}
            >
            Delete
          </p>
        </div>
      )}
    </div>
    </div>
  );
};

export default PromptCard;
