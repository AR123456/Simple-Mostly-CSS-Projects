/// importing this way but could be NPM if using node
////////////////////////////////// why not use Math.random()???
//  https://css-tricks.com/creating-generative-patterns-with-the-css-paint-api/
//All three of the patterns we are creating in this tutorial rely heavily on randomness. Paint API worklets should, however, (almost) always be deterministic. Given the same input properties and dimensions, a worklet’s paint() function should always render the same thing.
//The Paint API may want to use a cached version of a worklet’s paint() output for better performance. Introducing an unpredictable element to a worklet renders this impossible!
//A worklet’s paint() function re-runs whenever the element it applies to changes dimensions. When coupled with “pure” randomness, this can result in significant flashes of content — a potential accessibility issue for some folks.
//all this renders Math.random() a little useless, as it is entirely unpredictable.
///// Doing this so that when the browser is reszed pattern doesnt regenerate
import random from "https://cdn.skypack.dev/random";
import seedrandom from "https://cdn.skypack.dev/seedrandom";
// define a worklet class with a simple paint() function:
// When the worklet’s target element updates (changes dimensions, modifies custom properties), it re-runs. A worklet’s paint()

class Worklet {
  paint(ctx, geometry, props) {
    //   params
    // ctx — a 2D drawing context very similar to that of HTML canvas
    //geometry — an object containing the width/height dimensions of the worklet’s target element
    //props — an array of CSS custom properties that we can “watch” for changes and re-render when they do.  way of passing values to paint worklets.
    const { width, height } = geometry;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
  }
}
// Once a worklet class is defined, it needs to be registered before we can use it. To do so, we call registerPaint in the worklet file itself:
//  checking registerPaint   defined before running  JavaScript will always run once on the main browser thread — registerPaint only becomes available once the JavaScript file is loaded into a worklet using CSS.paintWorklet.addModule(...). which is in the index.html file
if (typeof registerPaint !== "undefined") {
  registerPaint("workletName", Worklet);
}
