export interface UserDto {
    user_id: number;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    pwd: string;
}

export interface UserDtos {
    user_id: number;
}

export interface courseDto {
    course_id: number;
    course_name: string;
    description: string;
    img_url: string;
    user: UserDtos;
}

export interface moduleDto {
    module_id: number;
    module_name: string;
    module_code: string;
    description: string;
    course: courseDto;
}

export interface lectureDto {
    lecture_id: number;
    lecture_name: string;
    description: string;
    video_url: string;
    module: moduleDto;
}