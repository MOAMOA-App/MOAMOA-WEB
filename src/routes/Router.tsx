import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import Chat from "../pages/chat/Chat";
import Profile from "../pages/profile/Profile";
// import Join from "../pages/profile/Join";
import Write from "../pages/write/Write";
import RequireAuth from "../components/RequireAuth";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import Goods from "../pages/goods/Goods";
import Search from "../pages/search/Search";
import Modify from "../pages/write/Modify";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />

                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/write" element={<Write />} />
                        <Route path="/modify/:pid" element={<Modify />} />

                        <Route path="/profile" element={<Profile />} />
                        <Route path="/join" element={<Profile />} />
                        <Route path="/search" element={<Search />} />

                        <Route path="/goods" element={<Goods />} />
                        <Route
                            path="/product/:pid/joinlist"
                            element={<Profile />}
                        />
                    </Route>
                </Route>

                {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
