import { HeaderPage } from './app.po';

describe('header App', () => {
  let page: HeaderPage;

  beforeEach(() => {
    page = new HeaderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
