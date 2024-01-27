import { matches } from "hast-util-select";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

export default function fullWidthCodeBlocks() {
  return (tree) => {
    const selector = (node) => matches("pre.astro-code", node);
    visit(tree, selector, (node, index, parent) => {
      // Make the <pre> full width
      node.properties.className.push(
        "w-[100vw]",
        "ml-[50%]",
        "-translate-x-[50%]",
        "rounded-none"
      );

      // Wrap the inner <code> with a container div
      node.children = [
        h("div", { className: ["max-w-2xl", "mx-auto"] }, node.children)
      ];
    });
  }
}
