import { useState } from "react";
import useCsrfToken from "@/hooks/useCsrfToken";

const useApiSubmit = () => {
  const [loading, setLoading] = useState(false);

  // API送信ロジックをここに実装
  const submit = async (url: string, data: Record<string, any>) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": useCsrfToken(),
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
