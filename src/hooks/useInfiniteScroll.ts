// Infinite scroll hook for pagination

import { useState, useEffect, useCallback, RefObject } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  loading: boolean;
  threshold?: number;
}

export const useInfiniteScroll = (
  fetchMore: () => void,
  options: UseInfiniteScrollOptions,
  targetRef?: RefObject<HTMLElement>
) => {
  const { hasMore, loading, threshold = 100 } = options;
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    const target = targetRef?.current || window;
    let scrollTop: number;
    let scrollHeight: number;
    let clientHeight: number;

    if (target === window) {
      scrollTop = window.scrollY;
      scrollHeight = document.documentElement.scrollHeight;
      clientHeight = window.innerHeight;
    } else {
      const element = target as HTMLElement;
      scrollTop = element.scrollTop;
      scrollHeight = element.scrollHeight;
      clientHeight = element.clientHeight;
    }

    if (
      scrollHeight - scrollTop - clientHeight < threshold &&
      hasMore &&
      !loading &&
      !isFetching
    ) {
      setIsFetching(true);
    }
  }, [hasMore, loading, isFetching, threshold, targetRef]);

  useEffect(() => {
    if (isFetching) {
      fetchMore();
      setIsFetching(false);
    }
  }, [isFetching, fetchMore]);

  useEffect(() => {
    const target = targetRef?.current || window;
    
    target.addEventListener('scroll', handleScroll);
    
    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, targetRef]);

  return { isFetching };
};