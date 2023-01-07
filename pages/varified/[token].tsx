import { useRouter } from "next/router";

import axios from "../../axiosConfig";

export default function Page() {
  const router = useRouter();
  let token = "";
  if (router.query) {
    token = router.query.token as string;
  }

  (async () => {
    try {
      await axios.put(`/auth/varify/${token}`);
      router.push("/login");
    } catch (error) {
      console.log("push");
      console.log(error);
      router.push(`/error`);
    }
  })();
  return <div>We are varifying your email...</div>;
}
