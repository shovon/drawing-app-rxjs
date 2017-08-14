# RxJS drawing pad example

A drawing pad. Allows users to draw things.

Uses RxJS for composing the HTML5 canvas' `mousedown`, `mousemove`, and `mouseup` events. Without RxJS, we would need to manually maintain states. But with event composition, the state does not need to be manually maintained, allowing for code that is easier to reason about, and also much easier to test.

Take a look at `script.js` to see how it all looks.

## License

The license is located in this repository's `LICENSE` file. But as a summary, it's licensed under MIT.