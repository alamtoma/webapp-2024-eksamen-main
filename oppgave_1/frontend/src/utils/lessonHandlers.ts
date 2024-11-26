import { courses } from "@/data/data";

export const getLesson = async (courseSlug: string, lessonSlug: string) => {
    const data = await courses
      .flatMap((course) =>
          course.slug === courseSlug 
          ? course.lessons.filter((lesson) => lesson.slug === lessonSlug)
          : []
      )
      .filter((lesson): lesson is typeof lesson => Boolean(lesson));
    return data?.[0] || null;
  };