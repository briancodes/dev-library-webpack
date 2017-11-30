import chai from 'chai';

// Importing from both the npm module and the umd
import { Cat, Dog } from '../dist/index.js';
import * as umdModule from '../dist/dev-library-webpack.umd.js';

runTests(umdModule);
runTests(null, Cat, Dog);

function runTests(importedModule, Cat, Dog) {

  console.log('Module: ', umdModule);
  console.log(Cat, Dog);
  Cat = importedModule ? importedModule.Cat : Cat;
  Dog = importedModule ? importedModule.Dog : Dog;
  const expect = chai.expect;
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
