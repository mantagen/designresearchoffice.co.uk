// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 120%;
}
*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}
body {
  margin: 0;
  color: #333;
}
html {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 1em;
  font-weight: normal;
  margin: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
a.active {
  text-decoration: underline;
}
img {
  width: 100%; /*this should be max-width, adjust jpgs accordingly*/
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.index-page .menu-item-works {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.index-page .primary-nav:hover .menu-item-works {
  opacity: 1;
}
.index-page .menu-item-information {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.index-page .primary-nav:hover .menu-item-information {
  opacity: 1;
}
.home-carousel {
  position: fixed !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.home-carousel .carousel-slide {
  height: 100vh;
  width: 100vw;
}
.home-carousel .slide-image {
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  object-position: center center;
}

.primary-nav .menu-item,
.secondary-nav .menu-item {
  opacity: 0;
  transition: opacity 1.5s;
}
.secondary-nav--active .menu-item {
  opacity: 1;
}
.primary-nav .menu-item:first-child {
  opacity: 1;
}
.menu-item.menu-item--active {
  opacity: 1;
}
/*nav:hover .primary-nav .menu-item,*/
nav:hover .secondary-nav .menu-item {
  opacity: 1;
}
nav:hover .secondary-nav .menu-item--active {
  /*color: #aaa;*/
}
.spacer {
  margin-left: 6px;
}
.home-primary-nav {
  color: white;
}
.home-primary-nav .menu-item:hover {
  color: #cecece;
}
.menu-item:hover {
  color: #aaa;
}
/*.menu-item:hover ~ .menu-item {
  color: #333;
}*/
.copy {
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 2;
  text-transform: uppercase;
  font-weight: bold;
}
.hover-zone--1:hover .hover-target--1 .menu-item {
  opacity: 1;
}
.hover-zone--1:hover .hover-target--1 .menu-item--active {
  /*color: #aaa;*/
}
.hover-zone--2:hover .hover-target--2 .menu-item {
  opacity: 1;
}
.home-copy {
  color: white;
}
h1 {
  text-transform: uppercase;
}
h2 {
  margin: 0em;
}
p {
  margin: 0;
}
.work-container p {
  margin-bottom: 11px;
}
.secondary-nav {
  margin-bottom: 4em;
}

/* inni */

.logo {
  /*margin-bottom: 18px;*/
}
/* Carousel */

.carousel-prev {
  position: absolute;
  left: 0;
  width: 50%;
  top: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 1;
}
.carousel-next {
  position: absolute;
  right: 0;
  width: 50%;
  top: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 1;
}

.slide-text.hover-only {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.carousel-wrapper:hover .slide-text.hover-only {
  opacity: 1;
}
.carousel-slide {
  width: 100%;
  /*margin-right: 50px;*/
}
/*.carousel {
  width: 998px;
}*/

/* Work list */

.work-list-item {
  margin-bottom: 40px;
}
.work-list-title {
  margin-top: 0;
}

/* information */

.scroll-menu-item {
  display: none;
}
.scroll-menu-item.active {
  text-decoration: underline;
}
.scroll-target h2 {
  text-decoration: underline;
}

#credits {
  margin-bottom: 468px;
}

/* single */

.single-work-text {
  position: relative;
  z-index: 1;
  margin: 18px 0;
}

.work-container {
  margin-bottom: 156px;
}
.nav-toggle {
  display: none;
}

@media (max-width: 600px) {
  .menu-item {
    opacity: 1 !important;
  }
  .home-primary-nav {
    color: inherit;
  }
  .index-page .nav-toggle::after {
    color: white;
  }
}
`;

export default GlobalStyle;
