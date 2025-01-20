import { startQuestionnaire } from './script';

test('startQuestionnaire hides home-page and shows consent-page', () => {
  document.body.innerHTML = `
    <div id="home-page" style="display: block;"></div>
    <div id="consent-page" style="display: none;"></div>
  `;

  startQuestionnaire();

  expect(document.getElementById('home-page').style.display).toBe('none');
  expect(document.getElementById('consent-page').style.display).toBe('block');
});