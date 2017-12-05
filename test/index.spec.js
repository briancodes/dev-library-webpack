import chai from 'chai';

// Importing from both the npm module and the umd
import { Client, Account } from '../dist/index.js';
import * as umdModule from '../dist/dev-library-webpack.umd.js';

const expect = chai.expect;

describe('When I import the library', () => {
  describe('If we import the npm version ', () => {
    it('should return the Client and Account objects', () => {
      expect(Client).to.exist;
      expect(Account).to.exist;
    });
  });
  describe('If we request the umd library version', () => {
    it('should return the library', () => {
      expect(umdModule).to.exist;
      expect(umdModule.Client).to.exist;
      expect(umdModule.Account).to.exist;
    });
  });
});

runTests(umdModule);
runTests(null, Client, Account);

function runTests(importedModule, ClientConstructor, AccountConstructor) {

  console.log('Module: ', importedModule);
  console.log(ClientConstructor, AccountConstructor);
  ClientConstructor = importedModule ? importedModule.Client : ClientConstructor;
  AccountConstructor = importedModule ? importedModule.Account : AccountConstructor;
  let lib;

  describe('Given an instance of my Client', () => {
    before(() => {
      lib = new ClientConstructor();
    });
    describe('when I need the name', () => {
      it('should return the name', () => {
        expect(lib.name).to.be.equal('aName');
      });
    });
    describe('when I need the id', () => {
      it('should return the id', () => {
        expect(lib.clientID).to.be.equal('anID');
      });
    });
  });

  describe('Given an instance of my Account', () => {
    before(() => {
      lib = new AccountConstructor('Zurich', 'ZurichID');
    });
    describe('when I need the name', () => {
      it('should return the name', () => {
        expect(lib.name).to.be.equal('Zurich');
      });
    });
    describe('when I need the id', () => {
      it('should return the id', () => {
        expect(lib.accountID).to.be.equal('ZurichID');
      });
    });
  });
};
