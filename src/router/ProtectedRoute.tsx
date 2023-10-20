import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { pathname } = useLocation();

  const Auth = !!localStorage.getItem("authToken");
  if (Auth) {
    return <>{children}</>;
  }
  return <Navigate to="/signin" replace state={{ referrer: pathname }} />;
}
