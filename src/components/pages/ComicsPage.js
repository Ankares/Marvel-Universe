import { Helmet } from 'react-helmet';

import AppBunner from '../appBanner/AppBanner';
import ComicsList from "../comicsList/ComicsList";

// page with comics
const ComicsPage = () => {
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with comics"
                    />
                <title>Comics Page</title>
            </Helmet>
            <AppBunner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;