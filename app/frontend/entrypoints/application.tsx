import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../router";
import { createRoot } from "react-dom/client";

import "@/styles/auth.css";
import "@/styles/tailwind.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
