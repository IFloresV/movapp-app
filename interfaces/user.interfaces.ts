export interface UserInfo {
   id?: string;
   name?: string;
   email?: string;
   phone?: string;
   pais?: string;
}

export interface UserState {
   logged: boolean;
   infoUser: UserInfo;
}

export interface UserContextType {
   user: UserState;
   dispatchUser: React.Dispatch<any>;
}
