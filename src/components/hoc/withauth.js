/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const WithAuth = (Components) => {
  return (props) => {
    const router = useRouter();
    const token = useSelector((state) => state.auth.token);

    React.useEffect(() => {
      if (!token) {
        router.replace("/login");
      }
    }, [token]);

    if (token) {
      return <Components {...props} />;
    }
    return null;
  };
};

export default WithAuth;
