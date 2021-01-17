# DragonFlagon Enhancement Suite for Foundry VTT

## How to install

- Download the extension for Chrome or Firefox
- **Chrome:**
  - Open Browser Settings Menu
  - Select Extensions
  - Toggle "Developer mode" on
  - Either click and drag the `df-fvtt-es_3.0.zip` file onto the extensions page, OR use the "Load unpacked" button to load it from file.
  - Enjoy!
- **Firefox:**
  - Open Browser Settings Menu
  - Select "Add-ons"
  - Either click and drag the `df-fvtt-es_3.0.xpi` file onto the add-ons page, OR click the gear button and select "Install add-on from file".

## FVTT Setup Package Sorting
Alphabetical sorts the modules/packages on the server setup screens. The default sort is by "most recently updated", and can be difficult to navigate. This extension re-sorts the packages alphabetically.

## Login Screen Animated Background Extension
This will allow you to place an animated background on the login screen.

![Animated Background Example 1](../.assets/animated-titlescreen-background-1.gif)

### **Important: Requires all players to have this extension installed to see it.**

### How to use (GM only)
![Setup](../.assets/df-bganim-update.png)
- In the new fields provided, you can specify the video path and various settings for playback.
- Click "Update World", launch your world and enjoy the view.
- File must have one of these supported extensions: `'mp4', 'm4v', 'ogg', 'webm'`

#### (RECOMMENDED) Provided Background Image Backup

It is recommended you set a backup image so that if a user does not have the extension running, they will still see a pretty image and not just a blank background.

### Adjust Video Scaling/Fit

The different forms of scaling are defined here

- **`cover` (default scaling):** The video is sized to fill the screen's entire area while maintaining its aspect ratio. The object will be clipped to fit.
- **`fill`:** The video is sized to fill the screen's entire area. If necessary, the object will be stretched or squished to fit.
- **`contain`:** The video is scaled to maintain its aspect ratio while fitting within the screen's area.
- **`scale-down`:** The video is sized as if `none` or `contain` were specified (would result in a smaller video size).
- **`none`:** The video is not resized.
