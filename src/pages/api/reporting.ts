import { Reporter, reporting } from "@next-safe/middleware/dist/api";

const consoleLogReporter: Reporter = (data) =>
  console.log(JSON.stringify(data, undefined, 2));

export default reporting(consoleLogReporter);