import { file } from "../lib/file.js";
import { utils } from "../lib/utils.js";

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

    // 2) Nuskaitome kokie failai yra .data/products folderyje
    // const [productsListError, productsList] = await file.list('products');

    // if (productsListError) {
    //     return callback(500, {
    //         status: 'Error',
    //         msg: 'Ivyko klaida bandant sukurti produkta',
    //     })
    // }
    // console.log(productsList);

    // 2) sukuriame [produktas].json ir ji irasome 
    const [productCreateError] = await file.create('products', (product.name + '.json').toLowerCase().replaceAll(' ', '-'), product)
    if (productCreateError) {
        return callback(400, {
            status: 'Error',
            msg: 'Klaida bandant sukurti produkta',
        })
    }

    return callback(200, {
        status: 'Success',
        msg: 'Produktas sukurta sekmingai',
    })


}

/**
 * Produkto informacijos gavimas
 */
handler._method.get = async(data, callback) => {
    const url = data.trimmedPath;
    const productName = url.split('/')[2];

    let [err, content] = await file.read('products', productName + '.json');
    if (err) {
        return callback(200, {
            status: 'Error',
            msg: 'Nepavyko rasti norimo produkto',
        })
    }

    content = utils.parseJSONtoObject(content);
    if (!content) {
        return callback(200, {
            status: 'Error',
            msg: 'Nepavyko apdoroti produkto duomenu',
        })
    }


    return callback(200, {
        status: 'Success',
        msg: 'Visa produkto informacija sekmingai gauta',
        content: content
    })
}

/**
 * Produkto informacijos atnaujinimas
 */
handler._method.put = async(data, callback) => {
    const url = data.trimmedPath;
    const productName = url.split('/')[2];

    const { price, inStock } = data.payload;
    let updatedValues = 0;
    let newProductData = {};

    if (price) {
        newProductData = {...newProductData, price };
        updatedValues++;
    }

    if (inStock) {
        newProductData = {...newProductData, inStock };
        updatedValues++;
    }

    if (!updatedValues) {
        return callback(200, {
            status: 'Error',
            msg: 'Objekte nerasta informacijos, kuria butu leidziama atnaujinti, todel niekas nebuvo atnaujinta',
        })
    }

    const [readErr, readMsg] = await file.read('products', productName + '.json');
    if (readErr) {
        return callback(500, {
            status: 'Error',
            msg: 'Nepavyko gauti produkto informacijos, kuria bandoma atnaujinti',
        })
    }

    const productObj = utils.parseJSONtoObject(readMsg);
    if (!productObj) {
        return callback(500, {
            status: 'Error',
            msg: 'Ivyko klaida, bandant nuskaityti produkto informacija',
        })
    }


    const updatedProductData = {
        ...productObj,
        ...newProductData,
    }

    const [updateErr] = await file.update('products', productName + '.json', updatedProductData);
    if (updateErr) {
        return callback(500, {
            status: 'Error',
            msg: 'Nepavyko atnaujinti produkto informacijos',
        })
    }

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
    const productName = url.split('/')[2];

    const [deleteErr] = await file.delete('products', productName + '.json');
    if (deleteErr) {
        return callback(500, {
            status: 'Error',
            msg: 'Nepavyko istrinti produkto',
        })
    }

    return callback(200, {
        status: 'Success',
        msg: 'Produktas sekmingai istrintas is sistemos',
    })
}

export default handler;