"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import checkBadContent from "@utils/badcontent";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: [""], diff:"Easy", scratch_link:""});
  const [submitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
        diff: data.diff,
        scratch_link: data.scratch_link,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const regex = /^https:\/\/scratch\.mit\.edu/;
    const isMatch = regex.test(post.scratch_link);

    if(!isMatch){

      alert("Sorry, you must use a Scratch link");
      setIsSubmitting(false);

      return;

    }

    if (checkBadContent(post)){

      alert("Sorry, this content is not allowed.");
      setIsSubmitting(false);
      return;

    }



    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
