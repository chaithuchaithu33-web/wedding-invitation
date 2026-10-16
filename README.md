# Krishna Chaithanya & Siva Manogna — Wedding Invitation

A responsive, static wedding invitation website that can be hosted free with GitHub Pages.

## Included features
- Tap-to-open cover
- Traditional Indian floral / maroon-and-gold styling
- Scroll reveal animations and floating decorative petals
- Scratch-to-reveal invitation card (mouse and touch)
- Live countdown to the wedding muhurtham
- Wedding and reception details
- Google Maps directions links
- Optional background music file

## Event details currently configured
- Wedding: Thursday, 26 November 2026
- Muhurtham: 9:15 AM (India Standard Time)
- Venue: Vishwanaadha Gardens, J.P. Nagar, HMT Road, Miyapur, Telangana 500049
- Reception: Friday, 27 November 2026, 12:00 PM onwards
- Reception venue: B Convention Center, Markapur

## Add your own photos or music (optional)
This version uses decorative CSS artwork, so it works without photo files.
To add background music, place a music file you have permission to use at:

`assets/music/traditional-wedding-music.mp3`

Keep that exact filename or update the `<source>` path in `index.html`.
The browser only starts audio after the visitor interacts with the page.

You can add couple photos later under `assets/images/` and update the HTML/CSS to display them.

## Preview locally
Open `index.html` in a modern browser. For the best local preview, use a simple local web server or VS Code Live Server.

## Publish on GitHub Pages
1. Create a **public** repository named `wedding-invitation` on GitHub.
2. Upload the contents of this folder (the `index.html` file must be at repository root).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main`, folder `/(root)`, then Save.
6. After publishing, the site URL will look like:
   `https://YOUR-GITHUB-USERNAME.github.io/wedding-invitation/`

## Customization
- Names, family names, dates, venue text: `index.html`
- Colours, typography, layout: `style.css`
- Countdown date, scratch behavior, animations, music controls: `script.js`

## Notes
- The Google Maps links use a Maps search URL, since a precise venue pin URL was not provided.
- Verify venue names, address spelling, and map results before sharing with guests.
- Background music is not bundled; add your own licensed audio file if desired.
