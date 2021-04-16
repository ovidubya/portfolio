---
title: Atomic Design 
description: Deep dive of atomic design principles with ReactJS
category: React
date: 4/16/2021
---


# Atomic Design?

Atomic design is a methodology composed of five distinct stages working together to create interface 
design systems in a more deliberate and hierarchical manner. Let's look at some of React components and see how atomic design can be used. 

![atomic-design](/atomic-design-product.jpeg)


# Atoms

Atoms are the smallest unit of components. They are the building blocks through the entire app and are by far the most important.

Here is an example of a `Button` component which would be considered an Atom

```jsx
const Button = ({title}) => {
    return <button>{title}</button>
}
```


What makes this component an Atom is that it has no other component dependencies, and it's bound to be reused through the app over and over. Ie thing sign in button, logout button, or export button ie. 


# Molecules

Here is an example of a `ButtonGroup` component which would be considered an Molecule

```jsx
const ButtonGroup = () => {
  return (
    <RoundedBorder>
      <Button title='edit'/>
      <Button title='delete'/>
    </RoundedBorder>
  );
};
```

What makes this a Molecule is that its the composition of Atom components. It can also be considered as a Atom too, really depends how granular you want to go. For myself, I find it nice to just make my atoms only return raw html elements, this lets me know that im truly working with the smallest unit of work but either way works.



# Organisms

Here is an example of a `LoginForm` component which would be considered an Organism

```jsx
const LoginForm = () => {
  return (
    <Form>
      <Input type="email" />
      <Input type="password" />
      <Button>Login</Button>
    </Form>
  );
};
```

What makes this an Organism is that its alive. It has specific logic for a specific use case. Meaning, there is logic inside this component that will allow you to login to a specific back end. It can't easily be reused under a different context other than which it was initially defined for.


Whereas the `Atoms` and `Molecules` can be used in various contexts. 




# Templates and Pages

I like to combine the two because I find templates are really just Pages but slightly more generic 


Here is an example of a `LoginPage` component which would be considered an Page.

```jsx
const LoginPage = () => {
  return (
    <Page>
      <Header/>
      <Main>
          <LoginForm/>
      </Main>
      <Footer/>
    </Page>
  );
};
```


When you have multiple Organisms working together, you are now in the Page space. 


# Why use atomic design?

I find using atomic design really saves you down the line. It makes you have a more structured components and allows a team of developers establish a common lingo. Also, why not use atomic design, it's fun 😊

