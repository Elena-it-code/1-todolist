module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*.test.js$',
    setupFilesAfterEnv: ['./setupTests.js'],
    //testTimeout: 5000  // Установка тайм-аута в 5000 мс (5 секунд), не всегд браузер успевает загрузить, а snapshot уже сделал снимок. Таким образом изменили время по умолчанию.
};