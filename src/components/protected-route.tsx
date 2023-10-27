import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./loading-screen";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) setLoading(false);
    else navigate("/login");
  }, []);

  return <>{loading ? <LoadingScreen /> : children}</>;
}
