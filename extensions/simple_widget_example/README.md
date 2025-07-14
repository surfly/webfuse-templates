# What does this extension do?

## Summary 
Injects a widget to each page that will allow the user to toggle the page into black and white. The popup contains some configuraton options for the user.

## Components 

### manifest.json
Decalres the components and two variables for the widget

### content.js
Injects and updates the widget based on the most recent varaible values

### popup.html
Panel for user to modify the widget variables

### newtab.html
Overview of the extension. Examples of calling the session API to share screen and upload files.

### background.js
Maintains state for the variable settings. Communicates with other components

## Key Settings
None

## Required Apps
Screen Sharing (for screen share button on start page)
File Sharing (for file share button on start page)