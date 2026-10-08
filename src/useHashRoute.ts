import { useEffect, useState } from "react";

export type Route =
  | { view: "overview" }
  | { view: "function"; fn: string }
  | { view: "build"; id: string }
  | { view: "contact" };

function parse(hash: string): Route {
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts[0] === "build" && parts[1]) return { view: "build", id: parts[1] };
  if (parts[0] === "function" && parts[1]) return { view: "function", fn: parts[1] };
  if (parts[0] === "contact") return { view: "contact" };
  return { view: "overview" };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  useEffect(() => {
    const on = () => {
      setRoute(parse(window.location.hash));
      document.getElementById("main")?.scrollTo({ top: 0 });
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
