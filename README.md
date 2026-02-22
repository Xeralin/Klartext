# Klartext
**This [Spicetify](https://spicetify.app/) extension simply removes gendered language in German!** <br/>
If this annoys you too, you can add this extension. Gendered language will then no longer be displayed anywhere in Spotify.

### Compare it

![Screenshot](https://github.com/Xeralin/Klartext/blob/main/Before.png)

![Screenshot](https://github.com/Xeralin/Klartext/blob/main/After.png)

## Installation
I recommend installing it via the [marketplace](https://github.com/spicetify/spicetify-marketplace). Tap `Load more` if the extension is not displayed.

To install the [Spicetify](https://spicetify.app/) extension manually, first download `Klartext.js` from above. Then you need to enter a few commands in the terminal.
First, open the Spicetify folder:
```sh
spicetify config-dir
```
Then place the Klartext.js file in the **Extension** folder.
Finally, you need to adjust the configuration:
```sh
spicetify config extensions Klartext.js
spicetify apply
```

<br/>

## Uninstallation
If you want to remove the extension, you can enter the following in the terminal:
```sh
spicetify config extensions Klartext.js-
```
