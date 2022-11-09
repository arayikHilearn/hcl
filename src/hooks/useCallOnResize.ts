import { useLayoutEffect } from 'react';

export function useCallOnResize(cb: () => void) {
    useLayoutEffect(() => {
        let timeoutId: NodeJS.Timeout;
        function updateOnResize() {
            console.log('RESIZE');
            timeoutId && clearTimeout(timeoutId);
            timeoutId = setTimeout(() => cb(), 150);
        }

        window.addEventListener('resize', updateOnResize);

        return () => window.removeEventListener('resize', updateOnResize);
    }, []);
}
