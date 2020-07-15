---
title: Styled components (CSS in JS). Yay or nay?
description: It's been almost a year now of tinkering with a CSS-in-JS library called styled-components, and I am in total love with the philosophy. But I can't say its perfect.
category: React
date: 7/7/2020
---

# Introduction

I am sure you have some strong concerns with CSS in JS. Maybe something like:

- "What is the benefit of putting your CSS in JS?."

- "What is wrong with good ol fashioned CSS?."

- "Isn't JS super expensive and the more you add, the more performance hit you take?"

If you thought of any of these questions boy did you come to the right place! Allow me to answer them.

But first, let's go through some basics.

Here is how we typically style React components without a CSS-in-JS framework.

```css
.button {
  padding: 20px 30px;
  background-color: red;
  color: white;
}
```

```jsx
const Button = () => {
  return <button className="button">I am a button</button>;
};
```

You have the css class defined somewhere either through a global stylesheet or through a CSS module and you have the component that consumes that class.

Often times a css file gets created from multiple sass or less files to this master file making it much more scaleable than just editing one CSS file. Example would be a `button.scss` or `varibles.scss` that then get merged to this master or global css file.

Everyone has different css workflows, but in the end of the day its all the same. There is usually one css file that the browser consumes for the entire application (sometime a few more if the app uses third party libraries).

Ok now that were on the same page, lets answer some questions.

# The benefit of putting your CSS in JS

Long story short, there are 2 big benefits.

- Readability
- Coverage

## Readability

Let's take the popular bootstrap css framework, and create a simple button.

Our code would look something like this:

```jsx
export const Button = ({ children }) => {
  return <button className="btn btn-primary">{children}</button>;
};
```

Great, we have a primary button on standby.

If we want to be flexible and allow a secondary class, we can easily do that with adding a prop.

```jsx
export const Button = ({ children, isPrimary }) => {
  return (
    <button className={`btn btn-${isPrimary ? "primary" : "secondary"}`}>
      {children}
    </button>
  );
};
```

And if we want to have full flexability, we can add a switch case for multiple class names

```jsx
const getButtonClass = (type) => {
  switch (type) {
    case "primary":
      return "btn-primary";
    case "secondary":
      return "btn-secondary";
    case "info":
      return "btn-secondary";
    case "success":
      return "btn-success";
    case "danger":
      return "btn-danger";
    case "warning":
      return "btn-warning";
    case "info":
      return "btn-info";
    default:
      return "btn-default";
  }
};
export const Button = ({ children, type }) => {
  return <button className={`btn ${getButtonClass(type)}}>{children}</button>;
};
```

This isn't so bad, still readable. But if we want to add sizing and outline styles?

Well maybe we can do something like this:

```jsx
const getButtonClass = (type) => {
  switch (type) {
    case "primary":
      return "btn-primary";
    case "secondary":
      return "btn-secondary";
    case "info":
      return "btn-secondary";
    case "success":
      return "btn-success";
    case "danger":
      return "btn-danger";
    case "warning":
      return "btn-warning";
    case "info":
      return "btn-info";
    default:
      return "btn-default";
  }
};

const getButtonOutlineClass = (type) => {
  switch (type) {
    case "primary":
      return "btn-outline-primary";
    case "secondary":
      return "btn-outline-secondary";
    case "info":
      return "btn-outline-secondary";
    case "success":
      return "btn-outline-success";
    case "danger":
      return "btn-outline-danger";
    case "warning":
      return "btn-outline-warning";
    case "info":
      return "btn-outline-info";
    default:
      return "btn-outline-default";
  }
};

const getButtonSizeClass = (size) => {
  switch (size) {
    case "large":
      return "btn-lg";
    case "small":
      return "btn-sm";
    default:
      return "";
  }
};

export const Button = ({ children, type, isOutline, size }) => {
  return (
    <button
      className={`btn ${
        isOutline ? getButtonOutlineClass(type) : getButtonClass(type)
      }${getButtonSizeClass(size)}`}
    >
      {children}
    </button>
  );
};
```

Do you see the problem? We have created our CSS classnames but our component is growing by checking the different possible class combinations. Maybe this isn't so bad right now, but if we change any of the CSS classes, we would would also need to change the components code to reflect the change.

Here is what the above code would look like using `styled-components`:

```jsx
export const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  transition: color 0.15s;
  cursor: pointer;

  
  
  ${(props) =>
    props.size === "large" &&
    css`
      padding: 0.5rem 1rem;
      font-size: 1.25rem;
      line-height: 1.5;
      border-radius: 0.3rem;
    `}
  ${(props) =>
    props.size === "small" &&
    css`
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      line-height: 1.5;
      border-radius: 0.2rem;
    `}
  ${(props) =>
    !props.size &&
    css`
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
    `}

  

  color: ${(props) =>
    props.outline
      ? props.theme.colors[props.type].backgroundColor
      : props.theme.colors[props.type].color};
  background-color: ${(props) =>
    props.outline
      ? "transparent"
      : props.theme.colors[props.type].backgroundColor};
  border-color: ${(props) => props.theme.colors[props.type].borderColor};



  :hover {
    color: ${(props) => props.theme.colors[props.type].color};
    background-color: ${(props) =>
      props.outline
        ? props.theme.colors[props.type].backgroundColor
        : props.theme.colors[props.type].hover.backgroundColor};
    border-color: ${(props) =>
      props.theme.colors[props.type].hover.borderColor};
  }
`;
```

Doesn't that look so much more beautiful and elegant?

Let's break down how this works.

First, we call the `styled.button` function and pass the style rules. Now we will have a `Button` component with all the css rules described inside the templated string.

Notice how there is no colors defined anywhere and there is this theme prop. This theme props gets passed down by the ThemeProvider component that styled-components exposes.

Here is an example

```jsx
const theme = {
  colors: {
    primary: {
      color: "white",
      backgroundColor: "#007bff",
      borderColor: "#007bff",
      hover: {
        backgroundColor: "#0069d9",
        borderColor: "#0062cc",
      },
    },
  },
};
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button outline type="primary">
        I am button
      </Button>
    </ThemeProvider>
  );
};
```

Now any child of ThemeProvider will be able to access any property defined in the theme object.

I think this gives us a huge readability boost because

1. We moved the responsibility of the themeing from outside of the component to the ThemeProvider. Now anytime the theme changes, so do the components automatically.

2. This forces our application to be more consistent. You can't just write random css somewhere and _hope_ it works. It will work, if defined in the ThemeProvider and consumed by a styled component.

## Coverage

This is my favorite benefit. Pick any of your favorite company for shopping. I choose kohls.

Go to their site and check to see how much unused css they have.

Here is what kohls looks like:

![CSS coverage on kohls site](/kohls/kohls_coverage.png)

4 CSS files.

First one has 84.6% unused CSS

Second one has 94.6% unused CSS

Third one has 99.1% unused CSS

And fourth has 44.9% unused CSS (which is reasonable)

If you ask me, this is a bit insane and keep in mind this only grows over time.

With styled-components, the CSS is part of the component. So either the component is rendered or its not and provided you have some decent tree-shaking, we can easily increase coverage.

# What is wrong with good ol fashioned CSS

I love pure CSS, but as projects grow it can be a headache to scale. And we might see the problem of growing CSS files.

I can't remember where I saw this, but a recent video I watched describes how CSS files for various companies have grown over the year. Part of the statics was to show the benefits of using a Styled System. [here](https://www.youtube.com/watch?v=fHQ1WSx41CA) is a talk with Airbnb on how using a styled system really help scale their project.

# Performance

Styled components really surprise me with how they take performance into consideration.

Here is the CSS of a typical styled component produces:

```css
.hslQkm {
  /* style rules */
}
.hslQkm:hover {
  /* style rules */
}
```

Instead of inlining the CSS, the library will generate actual CSS classes...

What's even more impressive, the hash in the css class `hslQkm` means something really important. It's a hash of the style rules that the component uses. If another component uses the same style rules, it will not create a new CSS class but will reuse it

![Mind blown gif](/mindblown.gif)

This gives us much more performance than regular inlining styles.

# Conclusion

Congratulations! 🎉🎉🎉

You've successfully reached the end of this post!

Now I hope that you are a big fan of styled components or CSS in JS methodoglies hopefully.

One thing I'd like to add.

styled-components is not perfect.

Everything happens at runtime, if it were all done at build time, then it would be perfect.
