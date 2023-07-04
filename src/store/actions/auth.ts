import { UserProfile } from "models";
import { SET_PROFILE, SET_USER } from "store/types";

export const setUserAction = (token: any) => ({
  type: SET_USER,
  payload: token,
});

export const clearUserAction = () => ({
  type: SET_USER,
  payload: { access: null, username: null, email: null, full_name: null },
});

export const setProfile = (data: UserProfile) => {
  return {
    type: SET_PROFILE,
    payload: data,
  };
};
