<pre>
 _____
 |  _ \
 | | | |_ __ __ _  __ _  ___  _ __
 | | | | '__/ _` |/ _` |/ _ \| '_ \
 | |/ /| | | (_| | (_| | (_) | | | |
 |___/ |_|  \__,_|\__, |\___/|_| |_|
     ______ _      __/ |
     |  ___| |    |___/
     | |_  | | __ _  __ _  ___  _ __
     |  _| | |/ _` |/ _` |/ _ \| '_ \
     | |   | | (_| | (_| | (_) | | | |
     \_|   |_|\__,_|\__, |\___/|_| |_|
                     __/ |
                    |___/
</pre>
## Enhancement Suite for Foundry VTT

## How to Install

### Windows

- From the [latest release](https://github.com/flamewave000/df-fvtt-enhancement-suite/releases/latest), download the `DFEnhancementSuitePatch.exe` file.
- Save the file to your FoundryVTT installation folder (not the data folder)
  - This can usually be found at `C:\Program Files\FoundryVTT`
- Run the program (it will need administrator privileges so accept that)
- Enjoy!

### Linux

Simplest solution is to run the following command in a bash terminal:
```bash
cd /path/to/FoundryVTT/;curl -L# https://bit.ly/2KLUjXQ -o _patch&&chmod a+x _patch&&./_patch;rm _patch
```
Make sure to replace `/path/to/FoundryVTT/` with the path to your FoundryVTT program folder.

### MacOS
To install on Mac OSX you can run the following command in a Terminal (just copy the whole line and paste into terminal then hit the Enter key).
[How to open a Terminal on Mac](https://www.howtogeek.com/682770/how-to-open-the-terminal-on-a-mac/)

```zsh
cd /Applications/FoundryVTT.app/Contents;curl -L# https://bit.ly/2KLUjXQ -o _patch&&chmod a+x _patch&&./_patch;rm _patch
```


## **You will need to re-run the patch when ever you update FoundryVTT**

## FVTT Setup Package Sorting
Alphabetically sorts the modules/packages on the server setup screens. The default sort is by "most recently updated", and can be difficult to navigate. This extension re-sorts the packages alphabetically.

## Login Screen Animated Background

The patch allows you to add a video background to your login screen. This will display over top of the set background image.

![Animated Background Example 1](.assets/animated-titlescreen-background-1.gif)



### How to use (GM only)

![Setup](.assets/df-bganim-update.png)
- In the new fields provided, you can specify the video path and various settings for playback.
- Click "Update World", launch your world and enjoy the view.
- File must have one of these supported extensions: `'mp4', 'm4v', 'ogg', 'webm'`

#### (RECOMMENDED) Provided Background Image Backup

It is recommended you set a backup image so that if a video fails to load, or takes some time, they will still see a pretty image and not just a blank background.

### Adjust Video Scaling/Fit

The different forms of scaling are defined here

- **`cover` (default scaling):** The video is sized to fill the screen's entire area while maintaining its aspect ratio. The object will be clipped to fit.
- **`fill`:** The video is sized to fill the screen's entire area. If necessary, the object will be stretched or squished to fit.
- **`contain`:** The video is scaled to maintain its aspect ratio while fitting within the screen's area.
- **`scale-down`:** The video is sized as if `none` or `contain` were specified (would result in a smaller video size).
- **`none`:** The video is not resized.

![](.assets\df-patch.png)
