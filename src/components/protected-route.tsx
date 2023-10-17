import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./loading-screen";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return <>{loading ? <LoadingScreen /> : children}</>;
}
