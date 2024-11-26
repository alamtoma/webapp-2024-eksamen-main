import { courses } from "@/data/data";

export const getCourse = async (slug: string) => {
    const data = await courses.filter((course) => course.slug === slug);
    return data?.[0];
  };
  
  export const createCourse = async (data) => {
    await courses.push(data);
  };