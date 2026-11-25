# CSE 134B Homework 5

Alejandro Alcocer's portfolio site. The custom element `<alejandros-element>` lives in
`scripts/customElement.js` and appears at the bottom of `index.html`.

## SSG exercise (Part 4)

The Astro exercise is in [`ssg-exercise/tutorial/`](ssg-exercise/tutorial/). Its
README has the commands to install dependencies, build, and preview it locally.

Pages to preview:

- **Home:** `src/pages/index.astro`, served at `http://localhost:4321/`
- **Research & Projects:** `src/pages/research.astro`, served at `http://localhost:4321/research.html`

Both pages use the shared footer in `src/components/Footer.astro`.

## Design note

**What the visitor wants.** In Part 1, the intended trace was for a visitor to scroll to the
bottom of my home page, walk through some research ideas I'm currently exploring, and use
the "Show sources" button to see the sources that influenced each idea, since this site is
meant for potential research collaborators. After Part 2, the section's purpose became simply
showing a dad joke, and the "Show sources" button now shows the API's source. Its
functionality is more rudimentary and mainly meets the assignment specifications.

**Tracing one action: requesting a new joke.**

1. **Control:** The visitor clicks (or presses Enter or Space on) the "Make me groan"
   button inside the component. Its click listener calls `loadDadJokes()`.
2. **Waiting:** `loadDadJokes()` disables the button and sets the status area
   (`role="status"`, so screen readers announce it) to
   *"Status: A groan is on its way..."*.
3. **API request:** It then `await`s
   `fetch("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } })`.
   It checks `response.ok`, parses the JSON, and checks that `joke` is a string.
4. **DOM update on success:** The joke goes into the component's paragraph with
   `textContent`, so remote text is never parsed as HTML. The status changes to
   *"Status: Your groan was successfully delivered!"*.
5. **On failure:** If the visitor is offline, the server returns an HTTP error, or the
   response isn't a valid joke, the status changes to
   *"Status: Oops, couldn't deliver the joke. Please try it again."* The previous joke
   stays on screen and the rest of the page still works.
6. **Recovery:** In both cases a `finally` block re-enables the button, so the visitor can
   retry without reloading. A successful retry replaces the error message.
