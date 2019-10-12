export interface UserDto {
    user_id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    pwd: string;
}

export interface UserDtos {
    user_id: number;
}

export interface courseDto {
    course_id: number;
    coursename: string;
    description: string;
    img_url: string;
    userEntity: UserDtos;
}

export interface moduleDto {
    module_id: number;
    module_name: string;
    module_code: string;
    description: string;
    courseEntity: courseDto;
}