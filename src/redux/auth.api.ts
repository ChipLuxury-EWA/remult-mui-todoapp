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
        signOut: build.query({
            query: () => ({
                url: SIGN_OUT,
                method: "GET",
            }),
            keepUnusedDataFor: 60,
        }),
    }),
});

export const { useSignInMutation, useSignOutQuery } = authApi;
