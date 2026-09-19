import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/app/ScrollToTop/ScrollToTop";
import PageTransition from "../components/app/PageTransition/PageTransition";
import SiteFooter from "../components/layout/SiteFooter/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader/SiteHeader";
import AboutPage from "../pages/AboutPage/AboutPage";
import CareersPage from "../pages/CareersPage/CareersPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import HomePage from "../pages/HomePage/HomePage";
import H2BPage from "../pages/H2BPage/H2BPage";
import IndustryDetailPage from "../pages/IndustryDetailPage/IndustryDetailPage";
import IndustriesPage from "../pages/IndustriesPage/IndustriesPage";
import InsightArticlePage from "../pages/InsightArticlePage/InsightArticlePage";
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
                    <Route path="/h-2b" element={<H2BPage />} />
                    <Route path="/industries" element={<IndustriesPage />} />
                    <Route path="/industries/:slug" element={<IndustryDetailPage />} />
                    <Route path="/insights" element={<InsightsPage />} />
                    <Route path="/insights/briefs/:slug" element={<InsightArticlePage />} />
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
