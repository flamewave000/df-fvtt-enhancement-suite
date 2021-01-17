# Version 3.0

- Moved away from an extension and instead built a patcher for FoundryVTT. This will be a much better method moving forward as it will no longer require everyone to have the extension installed. Instead you only need to run the patch on the FoundryVTT installation and it works.
- Moved source into its own repository.
- NEGATIVE: The patch must be applied after every FoundryVTT update. This is due to FoundryVTT obviously erasing the changes made by the patch during the update.

# Version 2.1
- Fixed default video scaling on Login page.

# Version 2.0
- Merged the Animated Login Page extension into the Enhancement Suite Extension
- **Animated Login:** Now displays a volume control that preserves the user's volume setting between viewings.
- **Animated Login:** Adds `mute` flag for the background image url that will mute the video and will not display the volume control.
