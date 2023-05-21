import innet, { useApp, useHandler } from 'innet';

const domIterable = () => () => {
    const apps = useApp();
    const handler = useHandler();
    let update = false;
    for (const app of apps) {
        if (update)
            break;
        innet(app, handler);
        update = true;
    }
};

export { domIterable };
