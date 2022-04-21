class IsValid {
    static username(text) {
        const minSize = 5;
        const maxSize = 15;
        if (typeof text !== 'string' ||
            text === '') {
            return [true, 'Turi buti ne tuscias tekstas'];
        }
        if (text.length < minSize ||
            text.length > maxSize) {
            return [true, `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`];
        }
        return [false, 'OK'];
    }

    static email(text) {
        const minSize = 6;
        const maxSize = 87;
        if (typeof text !== 'string' ||
            text === '') {
            return [true, 'Turi buti ne tuscias tekstas'];
        }
        if (text.length < minSize ||
            text.length > maxSize) {
            return [true, `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`];
        }
        if (!text.includes('@')) {
            return [true, 'Truksta @ simbolio'];
        }
        if (!text.split('@').shift()) {
            return [true, 'Truksta dalies pries @ simboli'];
        }
        if (!text.split('@').pop()) {
            return [true, 'Truksta dalies uz @ simbolio'];
        }
        if (text.includes(' ')) {
            return [true, 'Tarpas yra negalimas'];
        }
        if (!text.split('@').pop().includes('.')) {
            return [true, 'Dalis uz @ simbolio nera validi tinklalapio nuoroda'];
        }
        if (!text.split('@').pop().split('.').shift()) {
            return [true, 'Dalis uz @ simbolio nera validi tinklalapio nuoroda'];
        }
        if (!text.split('@').pop().split('.').pop()) {
            return [true, 'Dalis uz @ simbolio nera validi tinklalapio nuoroda'];
        }
        if (text.split('.').pop().length < 2) {
            return [true, 'Dalis uz @ simbolio nera validi tinklalapio nuoroda'];
        }
        if (text.replace(/[^@]/g, "").length > 1) {
            return [true, 'Gali buti tik vienas @ simbolis'];
        }

        return [false, 'OK'];
    }

    static password(text) {
        const minSize = 8;
        const maxSize = 100;
        if (typeof text !== 'string' ||
            text === '') {
            return [true, 'Turi buti ne tuscias tekstas'];
        }
        if (text.length < minSize ||
            text.length > maxSize) {
            return [true, `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`];
        }
        return [false, 'OK'];
    }

    static title(text) {
        const minSize = 8;
        const maxSize = 100;
        if (typeof text !== 'string' ||
            text === '') {
            return [true, 'Title turi buti ne tuscias tekstas'];
        }
        if (text.length < minSize ||
            text.length > maxSize) {
            return [true, `Title negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`];
        }
        return [false, 'OK'];
    }

    static slug(text) {
        const minSize = 8;
        const maxSize = 100;
        const allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        if (typeof text !== 'string' ||
            text === '') {
            return [true, 'Slug turi buti ne tuscias tekstas'];
        }
        if (text.length < minSize ||
            text.length > maxSize) {
            return [true, `Slug negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`];
        }
        if (text.includes(' ')) {
            return [true, 'Slug negali tureti tarpu'];
        }
        for (const letter of text) {
            if (!allowed.includes(letter)) {
                return [true, `"Slug" gali buti sudarytas tik is raidziu ir skaiciu ("${letter}" nera leistinas)`];
            }
        }
        return [false, 'OK'];
    }

    static content(text) {
        const minSize = 8;
        const maxSize = 100;
        if (typeof text !== 'string' ||
            text === '') {
            return [true, 'Content turi buti ne tuscias tekstas'];
        }
        if (text.length < minSize ||
            text.length > maxSize) {
            return [true, `Content negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`];
        }
        return [false, 'OK'];
    }
}

export { IsValid }