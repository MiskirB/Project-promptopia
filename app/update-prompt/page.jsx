"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams?.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!promptId) {
      console.warn("Missing promptId, redirecting...");
      router.push("/");
      return;
    }

    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch prompt details: ${response.status}`);
        }
        const data = await response.json();
        setPost({
          prompt: data.prompt || "",
          tag: data.tag || "",
        });
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      }
    };

    getPromptDetails();
  }, [promptId, router]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

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
      } else {
        throw new Error(`Failed to update prompt: ${response.status}`);
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
