import { Course } from '../../courses/models';
import { User } from '../../users/models';

export interface Enrollments {
  id: number;
  courseId: number;
  userId: number;
  user?: User;
  course?: Course;
}

export interface CreateEnrollmentPayload {
  courseId: number | null;
  userId: number | null;
}