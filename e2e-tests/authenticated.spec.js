describe('Authenticated user - ', function () {
	var username = 'test';

	beforeEach(function () {
		browser.get('http://localhost:8080/#/login');

		element(by.model('email')).sendKeys(username + '@abv.bg');
		element(by.model('password')).sendKeys(username);

		element(by.css('input[type=submit]')).click();
	});

	describe('Home', function () {
		it('Greetings message on Home', function () {
			expect(element(by.id('greetings-wrapper')).isDisplayed()).toBeTruthy();
		});

		it('Logout button works', function () {
			element(by.id('logoutBtn')).click();

			expect(element(by.id('loginBtn')).isDisplayed).toBeTruthy();
			expect(element(by.id('signupBtn')).isDisplayed).toBeTruthy();

			expect(element(by.id('loginBtn')).isDisplayed).toBeTruthy();
			expect(element(by.id('signupBtn')).isDisplayed).toBeTruthy();
		});
	});

	describe('Play', function () {
		beforeEach(function () {
			element(by.css('a[href="#/play"')).click();
		});

		it('Play section is available (does not redirect to login)', function () {
			expect(browser.getLocationAbsUrl())
				.toBe('/play');
		});

		it('Levels section is not broken', function () {
			expect(element(by.id('levelsSection')).isDisplayed()).toBeTruthy();
			expect(element(by.css('ul.list-group')).isDisplayed()).toBeTruthy();
			expect(element(by.css('li.list-group-item')).isDisplayed()).toBeTruthy();
		});

		describe('Game is started', function () {
			beforeEach(function () {
				element(by.css('li a.btn-success')).click();

			});
			it('Level is started', function () {
				expect(element(by.id('gameSection')).isDisplayed()).toBeTruthy();
			});

			it('Restart button', function () {
				element(by.css('a.btn-back')).click();

				var restartBtn = element(by.css('li a.btn-warning'));

				expect(restartBtn.isDisplayed()).toBeTruthy();
				restartBtn.click();

				expect(element(by.id('gameSection')).isDisplayed()).toBeTruthy();
			});

			it('Continue button', function () {
				element(by.css('a.btn-back')).click();

				var continueBtn = element(by.css('li a.btn-info'));

				expect(continueBtn.isDisplayed()).toBeTruthy();
				continueBtn.click();

				expect(element(by.id('gameSection')).isDisplayed()).toBeTruthy();
			});
		});
	});
});