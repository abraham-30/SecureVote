import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
    isLogin : boolean;
    isOnboarding: boolean;
    logIn : () => void;
    logOut : () => void;
    completeOnboarding : () => void;
    resetOnboarding: () => void;
}

export const useAuthStore = create(
    persist<UserState>((set)=>({
    isLogin: false,
    isOnboarding: false,
    logIn : () => {
        set((state)=>{
            return{
                ...state,
                isLogin: true,
            };
        })
    },
    logOut : () => {
        set((state)=>{
            return{
                ...state,
                isLogin: false,
            };
        })
    },
    completeOnboarding : () => {
        set((state)=>{
            return{
                ...state,
                isOnboarding: true,
            }
        })
    },
    resetOnboarding : () => {
        set((state)=>{
            return{
                ...state,
                isOnboarding: false,
            }
        })
    }
    }),
    {
        "name" : "auth-store",
        storage: createJSONStorage(()=>({
            setItem,
            getItem,
            removeItem: deleteItemAsync
        }))
    }
))