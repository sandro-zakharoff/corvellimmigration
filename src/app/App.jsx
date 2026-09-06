import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/app/ScrollToTop/ScrollToTop";
import PageTransition from "../components/app/PageTransition/PageTransition";
import SiteFooter from "../components/layout/SiteFooter/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader/SiteHeader";
import AboutPage from "../pages/AboutPage/AboutPage";
import CareersPage from "../pages/CareersPage/CareersPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import HomePage from "../pages/HomePage/HomePage";
import IndustriesPage from "../pages/IndustriesPage/IndustriesPage";
import InsightsPage from "../pages/InsightsPage/InsightsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import TeamPage from "../pages/TeamPage/TeamPage";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <a className="skip-link" href="#main-content">
                Skip to content
            </a>
            <SiteHeader />
            <PageTransition>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/industries" element={<IndustriesPage />} />
                    <Route path="/insights" element={<InsightsPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </PageTransition>
            <SiteFooter />
        </BrowserRouter>
    );
}

export default App;
