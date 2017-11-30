describe('Window and Document Available', function () {
  describe('Checking if document is available', function () {
    it('shoudl be an object', function () {
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
