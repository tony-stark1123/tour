# Virtual Campus Tour

A 360° virtual tour built with [Pannellum](https://pannellum.org/).

## Folder structure

```
index.html                  ← open this in a browser / host this
assets/
  css/
    style.css                ← all styling (colors, layout, UI)
  js/
    data.js                  ← EDIT THIS to add/change rooms
    app.js                   ← builds the UI from data.js (rarely edit)
  images/
    room1.jpg  room2.jpg  room3.jpg   ← your full-size 360 photos
  thumbs/
    room1.jpg  room2.jpg  room3.jpg   ← smaller preview versions of the same photos
  icons/                      ← (optional) drop custom icon files here later
  data/                       ← (optional) reserved for a future JSON export of data.js
```

## How to add a new room

1. Drop your equirectangular 360° photo into `assets/images/` (e.g. `room4.jpg`).
2. Make a small preview copy of it into `assets/thumbs/` (same filename is easiest).
3. Open `assets/js/data.js` and copy one of the existing scene blocks, e.g.:

```js
room4: {
  title: "Room 4",
  thumb: "assets/thumbs/room4.jpg",
  panorama: "assets/images/room4.jpg",
  hotSpots: [
    { pitch: 0, yaw: 0, type: "scene", text: "Back to Room 3", sceneId: "room3" }
  ]
}
```

4. Add a matching hotspot in `room3` (or wherever you want a link) pointing to `sceneId: "room4"`.
5. Save and refresh — the sidebar and bottom filmstrip update automatically, nothing else to touch.

## Finding pitch/yaw for a hotspot

1. Open the tour in your browser, look around to the exact spot you want the pin.
2. Open DevTools console (F12) and type:
   ```js
   tourViewer.getPitch()
   tourViewer.getYaw()
   ```
3. Copy those numbers into the hotspot's `pitch` / `yaw`.

## Photo requirements

- Format: equirectangular JPG (the flat, stretched panorama — not a normal photo).
- Ratio: 2:1 (e.g. 4000×2000px).
- Capture with: a 360 camera (Insta360, Ricoh Theta) or a phone's "Photo Sphere" mode
  (Google Street View app → Camera → Photo Sphere).

## Publishing

Upload this whole folder to GitHub Pages, Netlify, or your institute's web server —
it's plain HTML/CSS/JS, no build step needed.
