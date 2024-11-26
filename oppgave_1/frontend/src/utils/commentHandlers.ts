import { comments } from "@/data/data";

interface Comment {
  id: string;
  createdBy: {
    id: number;
    name: string;
  };
  comment: string;
  lesson: {
    slug: string;
  };
}

export const getComments = async (lessonSlug: string) => {
    const data = await comments.filter(
      (comment) => comment.lesson.slug === lessonSlug
    );
    return data;
  };
  
  export const createComment = async (data: Comment): Promise<void> => {
    await comments.push(data);
  };