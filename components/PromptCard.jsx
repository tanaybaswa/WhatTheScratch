"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  let color = "shadow-[inset_0px_-30px_50px_0_rgb(200,120,50,0.2)]";

  if(post.diff == "Hard"){
    color = "shadow-[inset_0px_-30px_50px_0_rgb(200,30,30,0.2)]";
  } else if(post.diff == "Easy"){
    color = "shadow-[inset_0px_-30px_50px_0_rgb(90,200,90,0.2)]";
  }

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="break-inside-avoid">
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
          <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
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

      {post.diff == 'Hard'?(<p className="font-bold text-lg font-satoshi my-2 text-red-600">
        {post.diff}
      </p>):<></>}

      {post.diff == 'Medium'?(<p className="font-bold text-lg font-satoshi my-2 text-orange-500">
        {post.diff}
      </p>):<></>}

      {post.diff == 'Easy'?(<p className="font-bold text-lg font-satoshi my-2 text-green-500">
        {post.diff}
      </p>):<></>}


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
