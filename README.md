# ROTA-SCAN

A four-side, QR-first discovery experience for the Rotaract Club of Sri Shakthi Institute of Engineering and Technology, Coimbatore.

## Run locally

Open `index.html` directly in a browser, or use the Live Server extension in VS Code. There is no build step, package install, or backend.

## Edit club content

- Edit project names, descriptions, outcomes, image paths, quiz content, and wheel messages in `js/data.js`.
- Add confirmed photographs under `images/projects/`, `images/members/`, or `images/events/`, then update the matching path in `js/data.js` or the photo-wall placeholders in `our-club.html`.
- Replace `YOUR_INSTAGRAM_ID`, `YOUR_INSTAGRAM_LINK`, `YOUR_GOOGLE_FORM_LINK`, `YOUR_VOLUNTEER_FORM_LINK`, `YOUR_COLLABORATION_FORM_LINK`, and `YOUR_EMAIL` before launch.
- Replace the photo placeholders only with real club or event photographs. Do not add invented people, projects, impact numbers, or URLs.

## Discovery state

Each page marks its side as visited in `localStorage` under `rotaScanProgress`:

```json
{"side1":true,"side2":false,"side3":false,"side4":false}
```

The project tiles use `rotaScanProjectsUnlocked` to remember unlocked stories. To reset the demo in DevTools, run:

```js
localStorage.removeItem('rotaScanProgress');
localStorage.removeItem('rotaScanProjectsUnlocked');
location.reload();
```

The completion message appears after all four sides have been visited.

## Deploy

Upload the folder to GitHub Pages, Netlify, Vercel, or another static host. Test the public URL on a phone, then generate the physical QR code from that deployed URL. The QR code is deliberately not hard-coded here; the final connect page includes the reminder `QR CODE WILL BE ADDED AFTER DEPLOYMENT`.

## Accessibility and performance

The experience uses semantic buttons and forms, visible focus states, mobile tap targets, no autoplay sound, reduced-motion support, and no external JavaScript dependencies. Keep photographs compressed and appropriately sized for QR visitors on mobile data.
