import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { TRootState } from '../store';
import { useAppSelector } from '../hooks/redux';
import { useRenderWatcher } from '../hooks/useRenderWatcher';

interface IStatusPopupProps {
    timer: number;
    showSelector: (state: TRootState) => boolean;
}

const StatusPopup: FC<IStatusPopupProps> = ({ showSelector, timer }) => {
    const mustShow = useAppSelector(showSelector);
    const [ show, setShow ] = useState(true);

    useEffect(() => {
        if (mustShow) setTimeout(() => setShow(false), timer);
    }, [ mustShow ]);

    useRenderWatcher('StatusPopup');
    if (!(show && mustShow)) return null;
    return (
        <div>success</div>
    );
};

export default StatusPopup;
