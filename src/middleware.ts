import { NextRequest, NextResponse } from "next/server";
import generateNonce from "./utils/generate-nonce";
import generateCSP from "./utils/generate-csp";
import { CSP_HEADER_KEY, CSP_REPORT_ONLT_HEADER_KEY, CSP_REPORT_ONLY_PAGE, NONCE_HEADER_KEY } from "./constants/csp-header-constants";

export async function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const csp = generateCSP({ nonce });
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set(NONCE_HEADER_KEY, nonce);
  
  const cspHeaderKey =
    request.nextUrl.pathname === CSP_REPORT_ONLY_PAGE
      ? CSP_REPORT_ONLT_HEADER_KEY
      : CSP_HEADER_KEY;
  
  requestHeaders.set(cspHeaderKey, csp);
  
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  response.headers.set(cspHeaderKey, csp);
  return response;
}