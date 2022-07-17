import ErrorMessage from "../errorMessage/ErrorMessage";

import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

// error 404 page
const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content={`error 404`}
                    />
                <title>Error 404</title>
            </Helmet>
            <ErrorMessage/>
            <p style={{'textAlign' : 'center', 'fontWeight' : 'bold', 'fontSize' : "24px"}}>Page doesnt exist</p>
            <Link style={{"display" : "block", "textAlign": "center", "fontWeight" : "bold", "fontSize" : "24px", "marginTop" : "30px", "color" : "blue"}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;