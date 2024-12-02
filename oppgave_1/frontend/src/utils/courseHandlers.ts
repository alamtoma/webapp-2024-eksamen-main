import { courses } from "@/data/data";
import { ofetch } from 'ofetch';

//export const getCourse = async (slug: string) => {
  //  const data = await courses.filter((course) => course.slug === slug);
    //return data?.[0];
  //};

  export const getCourses = async (slug: string) => {
    const response = await ofetch(`http://localhost:4000/courses/${slug}`);
    return response;
  };

  export const getLessons = async (courseId: number) => {
    const response = await ofetch(`http://localhost:4000/lessons/${courseId}`);
    return response;
  };
  
  //export const createCourse = async (data) => {
   // await courses.push(data);
 // };

 export const createCourse = async (data: { id: string; title: string; slug: string; description: string; lessons: { id: string; title: string; slug: string; preAmble: string; text: { id: string; text: string; }[]; }[]; category: string; }) => {
  await courses.push(data);
};