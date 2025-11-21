import { useState } from "react";
import useCsrfToken from "@/hooks/useCsrfToken";

const useApiSubmit = () => {
  const [loading, setLoading] = useState(false);
  const csrfToken = useCsrfToken();

  const submit = async (url: string, data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        body: data,
      });
      return response;
    } finally {
      setLoading(false);
    }
  }
  return { submit, loading };
}

export default useApiSubmit;
