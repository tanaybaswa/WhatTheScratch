"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import checkBadContent from "@utils/badcontent";

import Form from "@components/Form";

const CreatePrompt = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: [""], diff:"Easy", scratch_link:""});

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const regex = /^https:\/\/scratch\.mit\.edu/;
    const isMatch = regex.test(post.scratch_link);

    if(post.scratch_link && !isMatch){

      alert("Sorry, you must use a Scratch link");
      setIsSubmitting(false);

      return;

    }

    if (checkBadContent(post)){

      alert("Sorry, this content is not allowed.");
      setIsSubmitting(false);

    } else {
        try {
          const response = await fetch("/api/prompt/new", {
            method: "POST",
            body: JSON.stringify({
              prompt: post.prompt,
              userId: session?.user.id,
              tag: post.tag,
              diff: post.diff,
              scratch_link: post.scratch_link,
            }),
          });

          if (response.ok) {
            router.push("/");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
        }
      }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
