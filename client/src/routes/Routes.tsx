import type { ReactNode } from "react";


import Home from "../pages/Home";
import SignUp from "../pages/SignupPage";

export interface AppRoute {
  path: string;
  element: ReactNode;
  private?: boolean;
}

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <Home />,
    private: false,
  },
  {
    path: "/signup",
    element: <SignUp />,
    private: false,
  },

];
