"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Filter = require('bad-words');

import Form from "@components/Form";

const CreatePrompt = () => {

  const filter = new Filter();
  filter.addWords("69", "sixty nine", "sixtynine", "muthafucka");
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: [""], diff:"Easy"});

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (filter.isProfane(post.prompt)){

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
