'use strict';

var library = window.devLibraryWebpack;
var chai = window.chai; // remove the eslint var not defined warning

var should = chai.should();
var expect = chai.expect;

describe('Window and Document Available', function () {
  describe('Checking if document is available', function () {
    it('should be an object', function () {
      expect(typeof document).to.equal('object');
    });
  });
  describe('Checking if window is available', function () {
    it('should be available as an object', function () {
      expect(typeof window).to.equal('object');
    });
  });
});

describe('Adding <div> element to the DOM', function () {
  var el = document.createElement('div');
  var retrievedElement;

  el.innerHTML = 'Testing Div';
  el.id = 'added-element';
  document.body.appendChild(el);
  retrievedElement = document.getElementById('added-element');

  it("Should be in the DOM with 'Testing Div' innerHTML", function () {
    (retrievedElement.innerHTML).should.equal('Testing Div');
  });
});

describe('Given an instance of my Client library' + window.devLibraryWebpack.toString(), function () {
  var obj;

  before(function () {
    library = window.devLibraryWebpack;
    obj = new library.Client('BBC', 'BBC_ID');
  });
  describe('when I need the name' + window.mochaPhantomJS, function () {
    it('should return the name', function () {
      expect(obj.name).to.be.equal('BBC');
    });
  });
  describe('when I need the id', function () {
    it('should return the id', function () {
      expect(obj.clientID).to.be.equal('BBC_ID');
    });
  });
});
