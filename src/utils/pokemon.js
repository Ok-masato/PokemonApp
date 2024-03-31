export const getAllPokemon = (url) => {
    // Promise: 非同期処理を行うためのオブジェクト (成功時の処理、失敗時の処理)
    return new Promise((resolve, reject) => {
        // fetch: ネットワークリクエストを行うためのAPI、Promiseを返す
        fetch(url)
            // then: Promiseが成功した場合の処理
            // res: レスポンスオブジェクト, json: レスポンスのボディをJSONとして解釈, data: JSONオブジェクト
            .then((res) => res.json())
            .then((data) => resolve(data));
    });
};

export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                resolve(data);
            });
    });
};