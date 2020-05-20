<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  html {
    color: #000;
    background: #fff;
    overflow-y: scroll;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    font-size: 12px;
  }
  html * {
    outline: 0;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  html,
  body {
    font-family: 'Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif';
    background-color: #eee;
  }
  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  code,
  form,
  fieldset,
  legend,
  input,
  textarea,
  p,
  blockquote,
  th,
  td,
  hr,
  button,
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    margin: 0;
    padding: 0;
  }

  input,
  select,
  textarea {
    font-size: 100%;
  }
  input{
    border:none;
    -webkit-appearance: none;
    border-radius: 0;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  fieldset,
  img {
    border: 0;
  }

  abbr,
  acronym {
    border: 0;
    font-variant: normal;
  }

  del {
    text-decoration: line-through;
  }

  address,
  caption,
  cite,
  code,
  dfn,
  em,
  th,
  var {
    font-style: normal;
    font-weight: 500;
  }

  ol,
  ul {
    list-style: none;
  }

  caption,
  th {
    text-align: left;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 14px;
    font-weight: 500;
  }
  q:before,
  q:after {
    content: '';
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -.5em;
  }

  sub {
    bottom: -.25em;
  }
  a{
    color:#0089d4;
  }
  ins,
  a {
    text-decoration: none;
  }
  i{font-style:normal;}

  .bottom{
    position: fixed;
    width: 100%;
    text-align: center;
    bottom: 0;
    padding: 10px 0;
    background: #fff;
  }

  .btn{
    margin: 16px;
  }
</style>
