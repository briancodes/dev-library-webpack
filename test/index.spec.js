import chai from 'chai';

// Importing from both the npm module and the umd
import { Cat, Dog } from '../dist/index.js';
import * as umdModule from '../dist/dev-library-webpack.umd.js';

const expect = chai.expect;

describe('When I import the library', () => {
  describe('If we import the npm version ', () => {
    it('should return the Cat and Dog objects', () => {
      expect(Cat).to.exist;
      expect(Dog).to.exist;
    });
  });
  describe('If we request the umd library version', () => {
    it('should return the library', () => {
      expect(umdModule).to.exist;
      expect(umdModule.Cat).to.exist;
      expect(umdModule.Dog).to.exist;
    });
  });
});

runTests(umdModule);
runTests(null, Cat, Dog);

function runTests(importedModule, Cat, Dog) {

  console.log('Module: ', importedModule);
  console.log(Cat, Dog);
  Cat = importedModule ? importedModule.Cat : Cat;
  Dog = importedModule ? importedModule.Dog : Dog;
  let lib;

  describe('Given an instance of my Cat library', () => {
    before(() => {
      lib = new Cat();
    });
    describe('when I need the name', () => {
      it('should return the name', () => {
        expect(lib.name).to.be.equal('Cat');
      });
    });
    describe('when I need the sound', () => {
      it('should return the sound', () => {
        expect(lib.sound).to.be.equal('Meow');
      });
    });
  });

  describe('Given an instance of my Dog library', () => {
    before(() => {
      lib = new Dog();
    });
    describe('when I need the name', () => {
      it('should return the name', () => {
        expect(lib.name).to.be.equal('Dog');
      });
    });
  });
};
