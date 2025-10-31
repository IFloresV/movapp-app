export interface UserInfo {
   id?: string;
   user_uuid?: string;
   nombre?: string;
   email?: string;
   telefono?: string;
   pais_id?: number;
}

export interface UserState {
   logged: boolean;
   infoUser: UserInfo;
}

export interface UserContextType {
   user: UserState;
   dispatchUser: React.Dispatch<any>;
}
