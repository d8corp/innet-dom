import { useApp } from 'innet';

const callFunction = () => () => {
    useApp()();
};

export { callFunction };
