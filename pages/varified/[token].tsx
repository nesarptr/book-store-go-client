import { useRouter } from "next/router";
import { useEffect } from "react";

import axios from "../../axiosConfig";

export default function Page() {
  const router = useRouter();
  let token = "";
  if (router.query) {
    token = router.query.token as string;
  }

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        await axios.put(
          `/auth/varify/${token}`,
          {},
          {
            signal: controller.signal,
          }
        );
        router.replace("/login");
      } catch (error) {
        console.log("push");
        console.log(error);
        router.push(`/error`);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [router, token]);

  return <div>We are varifying your email...</div>;
}
