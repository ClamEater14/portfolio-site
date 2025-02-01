import { useEffect, useRef } from "react";
import useSWR, { Fetcher, Key, SWRConfiguration } from "swr";

export default function useSWRWithFallbackData<Data = any, Error = any, SWRKey extends Key = null>(
  key: SWRKey,
  fetcher: Fetcher<Data, SWRKey> | null,
  options: SWRConfiguration<Data, Error, Fetcher<Data, SWRKey>> | undefined
) {
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  return useSWR<Data, Error, SWRKey>(key, fetcher, {
    ...options,
    fallbackData: hasMounted.current ? undefined : options?.fallbackData,
  });
}
