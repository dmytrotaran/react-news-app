"use client";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

const Provider = ({ children }: { children: React.ReactNode }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
);

export default Provider;
