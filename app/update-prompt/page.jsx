"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePromptContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;

      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) {
      alert("Missing PromptId!");
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

const UpdatePrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePromptContent />
    </Suspense>
  );
};

export default UpdatePrompt;

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import Form from "@components/Form";

// const UpdatePrompt = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const promptId = searchParams.get("id");

//   const [post, setPost] = useState({ prompt: "", tag: "" });
//   const [submitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const getPromptDetails = async () => {
//       const response = await fetch(`/api/prompt/${promptId}`);
//       const data = await response.json();

//       setPost({
//         prompt: data.prompt,
//         tag: data.tag,
//       });
//     };

//     if (promptId) getPromptDetails();
//   }, [promptId]);

//   const updatePrompt = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!promptId) return alert("Missing PromptId!");

//     try {
//       const response = await fetch(`/api/prompt/${promptId}`, {
//         method: "PATCH",
//         body: JSON.stringify({
//           prompt: post.prompt,
//           tag: post.tag,
//         }),
//       });

//       if (response.ok) {
//         router.push("/");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Form
//       type="Edit"
//       post={post}
//       setPost={setPost}
//       submitting={submitting}
//       handleSubmit={updatePrompt}
//     />
//   );
// };

// export default UpdatePrompt;
