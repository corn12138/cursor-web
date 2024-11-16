import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { RouterProvider,createBrowserRouter } from "react-router-dom";

import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

// import 

const queryClient = new QueryClient();
const router = createRouter();
