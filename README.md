## No Longer Maintained

Due to changes to the Medal API, this tool is now outdated - lacking prior features. Medal Grabber has been updated to function with the API changes, but may be unreliable.

# [Medal Grabber](https://medal-grabber.vercel.app)

A customisable clip grabber and downloader for popular social clipping app: https://medal.tv

## Usage

* Select an amount of clips from `choose clip amount` and the most recent clips from any game will be fetched from the API.
* Specify a game by using `choose game` (which also supports custom input).
* Add a Medal user ID to fetch from. This is typically a 5-7 digit number found in the URL of your profile. E.G. `261997`.

Medal Grabber will automatically grab clips every time you change a property.

## Additionally

* Click the `settings` badge or `⌃` to collapse the panel.
* Click `☁` to download the selected clip locally to your PC.
* Click the `clip title` to open it in a new, fullscreen-embed window.
* Click `?` in the bottom left to open the Help page. Press `←` to go back.

## Frameworks/Libraries Used

* [React Collapse](https://www.npmjs.com/package/react-collapse)
* [React Error Boundary](https://www.npmjs.com/package/react-error-boundary)
* [React Router DOM](https://www.npmjs.com/package/react-router-dom)
* [React Font Awesome](https://www.npmjs.com/package/react-fontawesome)
  * [Font Awesome SVG Core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core)
  * [Free Solid SVG Icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons)
* [Redux](https://www.npmjs.com/package/redux)
  * [React Redux](https://www.npmjs.com/package/react-redux)
* [Styled Components](https://www.npmjs.com/package/styled-components)
* [Axios](https://www.npmjs.com/package/axios)
* [JS File Download](https://www.npmjs.com/package/js-file-download)
* [Perfect Scrollbar](https://www.npmjs.com/package/perfect-scrollbar) – specifically, version 1.4.0.

## Contributions
Feel free to send a pull request if you want to improve the app!