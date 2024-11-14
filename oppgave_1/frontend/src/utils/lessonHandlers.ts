import { courses } from "@/data/data";

export const getLesson = async (courseSlug, lessonSlug) => {
    const data = await courses
      .flatMap(
        (course) =>
          course.slug === courseSlug &&
          course.lessons.filter((lesson) => lesson.slug === lessonSlug)
      )
      .filter(Boolean);
    return data?.[0];
  };