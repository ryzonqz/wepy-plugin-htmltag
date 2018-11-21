'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  filter: /\.(wxml|wxss)$/
};
var rule = {
  block: ['header', 'footer', 'article', 'address', 'main', 'aside', 'nav', 'div', 'section', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'dl', 'dt', 'dd', 'ol', 'ul', 'li', 'hr', 'pre'],
  inline: ['a', 'b', 'br', 'big', 'abbr', 'cite', 'code', 'em', 'i', 'img', 'label', 'mark', 'q', 'small', 'span', 'strike', 'strong', 'sub', 'sup', 'del']
};

exports.config = config;
exports.rule = rule;