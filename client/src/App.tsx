import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Portal from "@/pages/Portal";
import ProjectsList from "@/pages/ProjectsList";
import MaintenancePage from "@/pages/MaintenancePage";
import Booking from "@/pages/Booking";
import ChatBot from "@/components/ChatBot";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/booking" component={Booking} />
      <Route path="/login" component={Login} />
      <Route path="/portal" component={Portal} />
      <Route path="/portal/projects" component={ProjectsList} />
      <Route path="/portal/maintenance" component={MaintenancePage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <ChatBot />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
