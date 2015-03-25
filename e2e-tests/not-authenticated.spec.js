describe('site navigation', function () {
    var username = 'User' + Date.now();

    it('Auto navigate to Home view', function () {
        browser.get('http://localhost:8080')

        expect(browser.getLocationAbsUrl())
            .toBe('/home');
    });

    it('Login/Signup buttons at Home page', function () {
        browser.get('http://localhost:8080/#/home');

        var loginBtn = element(by.id('loginBtn'));
        var signupBtn = element(by.id('signupBtn'));

        expect(loginBtn.isDisplayed()).toBeTruthy();
        expect(loginBtn.isDisplayed()).toBeTruthy();
    });

    it('Cannot open Play section, redirect to /login', function () {
        browser.get('http://localhost:8080/#/play');

        expect(browser.getLocationAbsUrl())
            .toBe('/login?redirect_url=%2Fplay');
    });

    it('After Signup, navigate to Login view', function () {
        browser.get('http://localhost:8080/#/signup');

        element(by.model('user.email')).sendKeys(username + '@abv.bg');
        element(by.model('user.name')).sendKeys(username);
        element(by.model('user.password')).sendKeys(username);

        element(by.css('input[type=submit]')).click();

        // browser.pause();

        expect(browser.getLocationAbsUrl())
            .toBe('/login');
    });

    it('Login new user', function () {
        browser.get('http://localhost:8080/#/login');

        element(by.model('email')).sendKeys(username + '@abv.bg');
        element(by.model('password')).sendKeys(username);

        element(by.css('input[type=submit]')).click();

        expect(browser.getLocationAbsUrl())
            .toBe('/home');

        expect(element(by.id('logoutBtn')).isDisplayed()).toBeTruthy();
    });
});