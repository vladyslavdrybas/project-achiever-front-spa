import {createBrowserRouter, Navigate, redirect} from "react-router-dom";
import RootErrorBoundary from "@/RootErrorBoundary";
import React from "react";
import {ApiAuthProvider} from "@/security/auth";
import AppLayout from "@/AppLayout";
import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import AnnLayout from "@/layouts/AnnLayout";
import ProfileShortUserView from "@/components/ann/ProfileShortUserView";
import ProfileRequest from "@/api/requests/ProfileRequest";
import {toast} from "react-toastify";
import PostsCollectionRequest from "@/api/requests/PostsCollectionRequest";
import ProfileUserListsView from "@/components/ann/ProfileUserListsView";
import {profileFollowed, profileFollowers, profileGroups, profileLists} from "@/artifacts/faked";
import ProfileUserGroupsView from "@/components/ann/ProfileUserGroupsView";
import ProfileUserFollowersView from "@/components/ann/ProfileUserFollowersView";
import ProfileUserFollowedView from "@/components/ann/ProfileUserFollowedView";
import UserAchievementsPage from "@/pages/ann/UserAchievementsPage";
import AchievementListOwnedRequest from "@/api/requests/AchievementListOwnedRequest";
import AchievementListSharedRequest from "@/api/requests/AchievementListSharedRequest";
import UserListsPage from "@/pages/ann/UserListsPage";
import StaticInfoBlock from "@/components/StaticInfoBlock";
import AboutPage from "@/pages/AboutPage";
import HelpPage from "@/pages/HelpPage";
import PrivacyAndTermsPage from "@/pages/PrivacyAndTermsPage";
import {config} from "@/config";

const AppRouter = createBrowserRouter([
    {
        id: "root",
        path: "/",
        Component: AppLayout,
        errorElement: <AppLayout outlet={<RootErrorBoundary />} />,
        loader() {
            ApiAuthProvider.authenticate();

            console.log('Loader AUTH', ApiAuthProvider.user);

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
                path: "about",
                Component: AboutPage,
            },
            {
                path: "help",
                Component: HelpPage,
            },
            {
                path: "privacyandterms",
                Component: PrivacyAndTermsPage,
            },
            {
                id: "ann-user",
                path: "ann/:username",
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

                    const leftBlocks =  [
                      <ProfileShortUserView profile={profile}/>,
                      <ProfileUserListsView profile={profile} lists={profileLists}/>,
                    ];

                    if (config.features.group.isActive) {
                      leftBlocks.push(<ProfileUserGroupsView profile={profile} groups={profileGroups}/>);
                    }

                    const semiBlocks = [
                      <ProfileUserFollowersView profile={profile} followers={profileFollowers} />,
                      <ProfileUserFollowedView profile={profile} followed={profileFollowed} />,
                    ];

                    return {
                        profile: profile,
                        leftBlocks: leftBlocks,
                        middleBlocks: [],
                        rightBlocks: [
                          <StaticInfoBlock />,
                        ],
                        semiBlocks: semiBlocks,
                    }
                },
                Component: AnnLayout,
                children: [
                    {
                        id: "ann-user-achievements-collection",
                        path: "",
                        async loader({params}) {
                            if (!params.username) {
                                toast.error('Not Found');
                                return {leftBlocks:[]};
                                // throw new Response('Not Found', {status:404});
                            }

                            const offset = config.api.load.offset;
                            const limit = config.api.load.limit;
                            const lastPostTimestamp = Math.floor((new Date()).getTime()/1000);

                            console.log('ann-user-achievements-collection', params);
                            const apiRequest = new PostsCollectionRequest(
                              params.username,
                              lastPostTimestamp,
                              offset,
                              limit,
                              config.api.load.timerange.older
                            );
                            let collection = [];
                            try {
                                await apiRequest.send();
                                collection = apiRequest.response;
                            } catch (e: any) {
                                toast.error(e.message);
                                return {leftBlocks:[]};
                                // throw new Response(e.message, {status:400});
                            }

                            console.log('ann-user-achievements-collection', collection);
                            return {
                                posts: collection,
                            };
                        },
                        Component: UserAchievementsPage,
                    },
                    {
                        id: "ann-user-lists-collection",
                        path: "lists",
                        async loader({params}) {
                            if (!params.username) {
                                toast.error('Not Found');
                                return {leftBlocks:[]};
                                // throw new Response('Not Found', {status:404});
                            }

                            const offset = config.api.load.offset;
                            const limit = config.api.load.limit;
                            const lastPostTimestamp = Math.floor((new Date()).getTime()/1000);

                            console.log('ann-user-lists-collection', params);
                            const listOwnedRequest = new AchievementListOwnedRequest(
                              params.username,
                              lastPostTimestamp,
                              offset,
                              limit,
                              config.api.load.timerange.older
                            );
                            // const listSharedRequest = new AchievementListSharedRequest(
                            //   params.username,
                            //   lastPostTimestamp,
                            //   offset,
                            //   limit
                            // );

                            let collection = [];
                            try {
                                await listOwnedRequest.send();
                                // await listSharedRequest.send();
                                collection = listOwnedRequest.response;
                                // collection = collection.concat(listSharedRequest.response);
                            } catch (e: any) {
                                toast.error(e.message);
                                return {leftBlocks:[]};
                                // throw new Response(e.message, {status:400});
                            }

                            console.log('ann-user-lists-collection', collection);
                            return {
                                posts: collection,
                            };
                        },
                        Component: UserListsPage,
                    },
                    {
                        id: "ann-user-list",
                        path: "lists/:list",
                        async loader({params}) {
                            if (!params.username || !params.list) {
                                toast.error('Not Found');
                                return {leftBlocks:[]};
                                // throw new Response('Not Found', {status:404});
                            }

                            const offset = config.api.load.offset;
                            const limit = config.api.load.limit;
                            const lastPostTimestamp = Math.floor((new Date()).getTime()/1000);

                            console.log('ann-user-list', params);
                            const listOwnedRequest = new AchievementListOwnedRequest(
                              params.username,
                              lastPostTimestamp,
                              offset,
                              limit,
                              config.api.load.timerange.older
                            );

                            let collection = [];
                            try {
                                await listOwnedRequest.send();
                                collection = listOwnedRequest.response;
                            } catch (e: any) {
                                toast.error(e.message);
                                return {leftBlocks:[]};
                                // throw new Response(e.message, {status:400});
                            }

                            console.log('ann-user-lists-collection', collection);
                            return {
                                posts: collection,
                            };
                        },
                        Component: UserListsPage,
                    },
                ],
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
