import { Prose } from "woozui";

export const Example = () => (
  <Prose className="text-left">
    <h1>Release notes</h1>
    <p>
      Version 2.4 is out. It makes <strong>every animation a spring</strong> and
      adds a dozen new components. Read the <a href="#/docs">upgrade guide</a>{" "}
      before you update.
    </p>
    <h2>What changed</h2>
    <ul>
      <li>Menus have a highlight that glides between items.</li>
      <li>
        The spring is one token, <code>--wz-spring</code>.
      </li>
    </ul>
    <blockquote>Fast, but also really, really animated.</blockquote>
  </Prose>
);
