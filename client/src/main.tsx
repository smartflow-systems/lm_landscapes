import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import web fonts
const webFonts = document.createElement("link");
webFonts.rel = "stylesheet";
webFonts.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&family=Playfair+Display:ital@0;1&display=swap";
document.head.appendChild(webFonts);

// Import font awesome
const fontAwesome = document.createElement("link");
fontAwesome.rel = "stylesheet";
fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
document.head.appendChild(fontAwesome);

// Add metadata
const title = document.createElement("title");
title.textContent = "L&M Landscape Maintenance - Professional Landscaping Services";
document.head.appendChild(title);

const metaDesc = document.createElement("meta");
metaDesc.name = "description";
metaDesc.content = "L&M Landscape Maintenance offers professional landscaping services including digger hire, fencing, decking, garden maintenance, and more. Get a free quote today!";
document.head.appendChild(metaDesc);

createRoot(document.getElementById("root")!).render(<App />);
