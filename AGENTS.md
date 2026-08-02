# Local browser verification

When using the in-app browser to verify `jbig_promopage`, follow this order:

1. Run all commands from this repository root.
2. Before starting a development server, check
   `http://127.0.0.1:3000/recruit`.
3. If that URL already returns the JBIG recruitment page with HTTP 200, reuse
   the existing server. Do not start a second server.
4. Otherwise, start `npm run dev` in a long-lived terminal session. Request
   local port-binding permission when the sandbox cannot expose the server to
   the in-app browser.
5. Wait for the development server's `Local` address, then verify that exact
   address with `/recruit` returns HTTP 200 before opening the browser.
6. Open only the URL that passed the health check. Never guess a port or switch
   from port 3000 to 3001 without verifying it.
7. If the browser reports `ERR_CONNECTION_REFUSED`, check the server process,
   listening port, and terminal session first. Do not modify application code
   to fix a server-lifecycle or port-binding failure.
8. Use `npm run dev`, not `npm start`, for interactive browser verification.

Do not stop an existing development server or kill a process unless the user
explicitly authorizes it.
