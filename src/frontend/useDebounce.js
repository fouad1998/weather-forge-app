import debounce from "lodash.debounce";
import { useCallback } from "react";

export function useDebounce(func, timeout) {
  return useCallback(debounce(func, timeout), [timeout]);
}
