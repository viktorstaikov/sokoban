describe('Authenticated user - ', function () {
	var username = 'User' + Date.now();

	beforeEach(function () {
		browser.get('http://localhost:8080/#/login');

		element(by.model('email')).sendKeys(username + '@abv.bg');
		element(by.model('password')).sendKeys(username);

		element(by.css('input[type=submit]')).click();
	});

	it('Greetings message on Home', function () {
		browser.get('http://localhost:8080');

		expect(element(by.id('greetings-wrapper')).isDisplayed()).toBeTruthy();
	});

	it('Logout button works', function () {
		browser.get('http://localhost:8080');

		element(by.id('logoutBtn')).click();

		expect(element(by.id('loginBtn')).isDisplayed).toBeTruthy();
		expect(element(by.id('signupBtn')).isDisplayed).toBeTruthy();

		browser.refresh();

		expect(element(by.id('loginBtn')).isDisplayed).toBeTruthy();
		expect(element(by.id('signupBtn')).isDisplayed).toBeTruthy();
	});

	it('Play section is available (does not redirect to login)', function () {
		browser.get('http://localhost:8080/#/play');

		expect(browser.getLocationAbsUrl())
			.toBe('/play');
	});

	it('Levels section is not broken', function () {
		browser.get('http://localhost:8080/#/play');

		expect(element(by.id('levelsSection')).isDisplayed()).toBeTruthy();
		expect(element(by.css('ul.list-group')).isDisplayed()).toBeTruthy();
		expect(element(by.css('li.list-group-item')).isDisplayed()).toBeTruthy();
	})
});