import { Provider, providers } from "./providers";

export interface RouteOptions {
  provider?: Provider;
}

export function route(options: RouteOptions = {}) {
  return options.provider ?? providers[0];
}
