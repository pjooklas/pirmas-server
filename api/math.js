const handler = {};

handler.math = async(data, callback) => {
    const acceptableMethods = ['get'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return await handler._method[data.httpMethod](data, callback);
    }

    return callback(400, 'Account: veiksmas NEleistinas');
}

handler._method = {};

/**
 * Vartotojo informacijos gavimas
 */
handler._method.get = async(data, callback) => {
    const url = data.trimmedPath;
    const urlParts = url.split('/');
    const num1 = +urlParts[3];
    const num2 = +urlParts[4];
    const operation = urlParts[2];

    const math = {
        suma: (a, b) => a + b,
        skirtumas: (a, b) => a - b,
        dalyba: (a, b) => a / b,
        sandauga: (a, b) => a * b,
    }

    if (urlParts.length !== 5 ||
        isNaN(num1) ||
        isNaN(num2) ||
        operation !== Object.keys(math)) {
        return callback(400, {
            status: 'Error',
            msg: 'Netinkamas formatas',
        })
    }

    if (!math[operation]) {
        return callback(400, {
            status: 'Error',
            msg: 'Nera tokios operacijos',
        })
    }

    const ans = math[operation](num1, num2);
    console.log(ans);

    return callback(200, {
        first: num1,
        second: num2,
        result: ans,
    })
}


export default handler;