import { useLayoutEffect } from 'react';

export function useCallOnResize(cb: () => void, ms?: number) {
    useLayoutEffect(() => {
        let timeoutId: NodeJS.Timeout;
        function updateOnResize() {
            if (ms === undefined) {
                cb();
            } else {
                timeoutId && clearTimeout(timeoutId);
                timeoutId = setTimeout(cb, ms);
            }
            console.log('RESIZE');

        }

        window.addEventListener('resize', updateOnResize);

        return () => window.removeEventListener('resize', updateOnResize);
    }, []);
}
