import { Link } from "react-router-dom";
import TextBlock from "../../components/common/TextBlock/TextBlock";
import "./NotFoundPage.css";

function NotFoundPage() {
    return (
        <main className="not-found" id="main-content">
            <div className="not-found__inner container">
                <TextBlock className="not-found__code">404</TextBlock>
                <h1 className="not-found__title">This page could not be found.</h1>
                <TextBlock className="not-found__description">
                    The address may be incorrect, or the page may have moved. Return to the home page to continue.
                </TextBlock>
                <Link className="not-found__link" to="/">
                    Return home <span>→</span>
                </Link>
            </div>
        </main>
    );
}

export default NotFoundPage;
