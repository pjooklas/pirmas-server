import { file } from "../lib/file.js";

const handler = {};

//handler.[xxx] pakeisti
handler.product = async(data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return await handler._method[data.httpMethod](data, callback);
    }

    return callback(400, 'Product: veiksmas NEleistinas');
}

handler._method = {};

/**
 * Produkto sukurimas
 */
handler._method.post = async(data, callback) => {
    // 1) reikia patikrinti ar data.payload (keys and values) yra teisingi
    const product = data.payload;
    if (typeof product !== 'object' || Object.keys(product).length !== 3) {
        return callback(200, {
            status: 'Error',
            msg: 'Produkto objekta sudaro tik 3 elementai (name, price, inStock)',
        })
    }

    if (typeof product.name !== 'string' || product.name == '') {
        return callback(400, {
            status: 'Error',
            msg: 'Netinkamas name',
        })
    }

    if (typeof product.price !== 'number' || product.price < 0) {
        return callback(400, {
            status: 'Error',
            msg: 'Netinkamas price',
        })
    }

    console.log(typeof product.InStock);

    if (typeof product.inStock !== 'number' || product.inStock < 0) {
        return callback(400, {
            status: 'Error',
            msg: 'Netinkamas inStock',
        })
    }

    return callback(200, {
        status: 'Success',
        msg: 'Produktas sukurta sekmingai',
    })
}

/**
 * Vartotojo informacijos gavimas
 */
handler._method.get = async(data, callback) => {
    const url = data.trimmedPath;





    return callback(200, {
        status: 'Success',
        msg: 'Visa produkto informacija sekmingai gauta',
    })
}

/**
 * Vartotojo informacijos atnaujinimas
 */
handler._method.put = async(data, callback) => {
    const url = data.trimmedPath;



    return callback(200, {
        status: 'Success',
        msg: 'Produkto informacija sekmingai atnaujinta',
    })
}

/**
 * Vartotojo paskyros istrinimas
 */
handler._method.delete = async(data, callback) => {
    const url = data.trimmedPath;



    return callback(200, {
        status: 'Success',
        msg: 'Produktas sekmingai istrintas is sistemos',
    })
}

export default handler;