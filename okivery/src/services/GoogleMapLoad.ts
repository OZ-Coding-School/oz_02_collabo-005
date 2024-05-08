import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY,
  language: "en",
});

export default loader;
