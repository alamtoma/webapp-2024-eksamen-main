import { comments } from "@/data/data";

export const getComments = async (lessonSlug) => {
    const data = await comments.filter(
      (comment) => comment.lesson.slug === lessonSlug
    );
    return data;
  };
  
  export const createComment = async (data) => {
    await comments.push(data);
  };