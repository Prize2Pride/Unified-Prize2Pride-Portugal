import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";

const Home = lazy(() => import("./pages/Home"));
const Courses = lazy(() => import("./pages/Courses"));
const Professor = lazy(() => import("./pages/Professor"));
const Chat = lazy(() => import("./pages/Chat"));
const ProgressPage = lazy(() => import("./pages/Progress"));
const CourseGenerator = lazy(() => import("./pages/CourseGenerator"));
const Situations = lazy(() => import("./pages/Situations"));
const ForYou = lazy(() => import("./pages/ForYou"));

function Router() {
  return (
    <Layout>
      <Suspense fallback={<div className="grid min-h-[60vh] place-items-center text-sm text-muted-foreground">Loading your Portuguese moment…</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/courses" component={Courses} />
        <Route path="/professor" component={Professor} />
        <Route path="/chat" component={Chat} />
        <Route path="/progress" component={ProgressPage} />
        <Route path="/generate" component={CourseGenerator} />
        <Route path="/situations" component={Situations} />
        <Route path="/for-you" component={ForYou} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
