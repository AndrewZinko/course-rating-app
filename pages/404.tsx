import {withLayout} from "../layout/Layout";
import { Heading } from "../components";

export function Error404(): JSX.Element {
    return (
        <div style={{ width: '100%', height: 'calc(100vh - 150px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heading tag="h1">404 | Страница не найдена.</Heading>
        </div>
    );
}

export default withLayout(Error404);