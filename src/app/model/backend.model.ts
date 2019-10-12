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
    id: number;
    coursename: string;
    description: string;
    img_url: string;
    userEntity: UserDtos;
}