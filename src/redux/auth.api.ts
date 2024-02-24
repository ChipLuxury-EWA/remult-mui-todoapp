import { baseApi } from "./base.api";
import { SIGN_IN, SIGN_OUT } from "./constants.api";

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation({
            query: (data) => ({
                url: SIGN_IN,
                method: "POST",
                body: data,
            }),
        }),
        signOut: build.mutation({
            query: () => ({
                url: SIGN_OUT,
                method: "POST",
            }),
        }),
    }),
});

export const { useSignInMutation, useSignOutMutation } = authApi;
