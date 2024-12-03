export const apiClient = {
  async getCourses() {
    const response = await fetch('/api/courses');
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  },

  async getCourse(slug: string) {
    const response = await fetch(`/api/courses/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch course');
    return response.json();
  },

  async getLesson(courseSlug: string, lessonSlug: string) {
    const response = await fetch(`/api/courses/${courseSlug}/lessons/${lessonSlug}`);
    if (!response.ok) throw new Error('Failed to fetch lesson');
    return response.json();
  },

  async createComment(comment: object) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create comment');
    }

    return response.json();
  },

  async getComments(lessonSlug: string) {
    const response = await fetch(`/api/comments?lessonSlug=${lessonSlug}`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },
};
