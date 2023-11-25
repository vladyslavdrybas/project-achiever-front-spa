import {createBrowserRouter, Navigate, redirect, useParams} from "react-router-dom";
import RootErrorBoundary from "@/RootErrorBoundary";
import React from "react";
import {ApiAuthProvider} from "@/security/auth";
import AppLayout from "@/AppLayout";
import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import AnnLayout from "@/layouts/AnnLayout";
import ProfileShortBlockView from "@/components/an/ProfileShortBlockView";
import Feed from "@/components/an/Feed";
import ProfileRequest from "@/api/requests/ProfileRequest";
import PostsCollection from "@/components/post/PostsCollection";
import {toast} from "react-toastify";
import PostsCollectionRequest from "@/api/requests/PostsCollectionRequest";

const AppRouter = createBrowserRouter([
    {
        id: "root",
        path: "/",
        Component: AppLayout,
        errorElement: <AppLayout outlet={<RootErrorBoundary />} />,
        loader() {
            ApiAuthProvider.authenticate();

            return {
                user: ApiAuthProvider.user,
            };
        },
        children: [
            {
                path: "*",
                element: <Navigate to={"/"} />,
            },
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "signin",
                loader() {
                    if (ApiAuthProvider.isAuthenticated()) {
                        return redirect("/");
                    }

                    return null;
                },
                Component: SignInPage,
            },
            {
                path: "signup",
                loader() {
                    if (ApiAuthProvider.isAuthenticated()) {
                        return redirect("/");
                    }

                    return null;
                },
                Component: SignUpPage,
            },
            {
                id: "ann-user",
                path: "ann/",
                async loader({params}) {
                    console.log('Ann loader params', params);

                    if (!params.username) {
                        toast.error('Not Found');
                        return {leftBlocks:[]};
                        // throw new Response('Not Found', {status:404});
                    }

                    const apiRequest = new ProfileRequest(params.username);
                    let profile = null;
                    try {
                        await apiRequest.send();
                        profile = apiRequest.response;
                    } catch (e: any) {
                        toast.error(e.message);
                        return {leftBlocks:[]};
                        // throw new Response(e.message, {status:400});
                    }

                    return {
                        leftBlocks: [
                            <ProfileShortBlockView profile={profile}/>,
                        ],
                    }
                },
                Component: AnnLayout,
                children: [
                    {
                        id: "ann-user-posts-collection",
                        path: ":username",
                        async loader({params}) {
                            if (!params.username) {
                                toast.error('Not Found');
                                return {leftBlocks:[]};
                                // throw new Response('Not Found', {status:404});
                            }

                            console.log('ann-user-posts-collection', params)
                            const apiRequest = new PostsCollectionRequest(params.username, 0, 5);
                            let collection = [];
                            try {
                                await apiRequest.send();
                                collection = apiRequest.response;
                            } catch (e: any) {
                                toast.error(e.message);
                                return {leftBlocks:[]};
                                // throw new Response(e.message, {status:400});
                            }

                            return {
                                posts: collection,
                                offset: 0,
                                limit: 5,
                            };
                        },
                        Component: PostsCollection,
                    }
                ]
            },
        ],
    },
    {
        path: "/signout",
        async loader() {
            console.log('signout path');
            console.log(ApiAuthProvider);

            if (!ApiAuthProvider.isAuthenticated()) {
                return redirect("/");
            }

            await ApiAuthProvider.signOut();

            return redirect("/");
        }
    },
    // {
    //     path: "/signup",
    //     element: <About />
    // },
    // {
    //     path: "/signin",
    //     element: <SignIn />
    // },
    // {
    //     path: "/users",
    //     element: <About />
    // },
    // {
    //     path: "/user/:username",
    //     element: <About />
    // },
    // {
    //     path: "/profile/settings",
    //     element: <About />
    // },
    // {
    //     path: "/user/:username/groups",
    //     element: <About />
    // },
    // {
    //     path: "/user/:username/lists",
    //     element: <About />
    // },
    // {
    //     path: "/user/:username/achievements",
    //     element: <About />
    // },
    // {
    //     path: "/achievement/:achievementId",
    //     element: <About />
    // },
    // {
    //     path: "/list/:listId",
    //     element: <About />
    // },
    // {
    //     path: "/notifications",
    //     element: <About />
    // },
]);

export default AppRouter;