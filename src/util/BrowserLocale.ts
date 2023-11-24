class BrowserLocale {
    _language: string;

    constructor() {
        this._language = "en";

        if (typeof navigator !== "undefined") {
            this._language = navigator
                && navigator.languages
                && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
        }
    }

    get language() : string
    {
        return this._language;
    }

    get languageShort() : string
    {
        return this.language.substring(0,2);
    }
}

export default BrowserLocale;