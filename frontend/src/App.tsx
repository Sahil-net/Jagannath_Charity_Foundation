import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { ImagesProvider } from "./lib/ImagesContext";
import { SiteContentProvider } from "./lib/SiteContentContext";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Projects = lazy(() => import("./pages/Projects"));
const Partners = lazy(() => import("./pages/Partners"));
const Impact = lazy(() => import("./pages/Impact"));
const Team = lazy(() => import("./pages/Team"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Donate = lazy(() => import("./pages/Donate"));
const Contact = lazy(() => import("./pages/Contact"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const Privacy = lazy(() => import("./pages/Privacy"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));

export default function App() {
  return (
    <ImagesProvider>
      <SiteContentProvider>
        <Suspense fallback={<div className="min-h-screen grid place-items-center text-navy-900/60">Loading page…</div>}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/work" component={Work} />
            <Route path="/projects" component={Projects} />
            <Route path="/partners" component={Partners} />
            <Route path="/impact" component={Impact} />
            <Route path="/team" component={Team} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/donate" component={Donate} />
            <Route path="/contact" component={Contact} />
            <Route path="/volunteer" component={Volunteer} />
            <Route path="/privacy-policy" component={Privacy} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin" component={AdminDashboard} />
            <Route>
              <div className="min-h-screen flex items-center justify-center text-navy-900/50">
                Page not found
              </div>
            </Route>
          </Switch>
        </Suspense>
      </SiteContentProvider>
    </ImagesProvider>
  );
}
