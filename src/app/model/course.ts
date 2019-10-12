import { UserDto } from './backend.model';

export class Course {
    id: number;
    coursename: string;
    description: string;
    userEntity: UserDto;
}