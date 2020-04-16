var bigInt = require("big-integer");
var memoria = [];
function recurrencia(num){
    if (memoria[num] != null){
        return memoria[num];
    }
    else{
        memoria[num] = recurrencia(num-1).add(recurrencia(num-2));
        return memoria[num];
    }
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let nth = req.body.nth
    if (memoria.length == 0){
        memoria.push(bigInt.zero);
        memoria.push(bigInt.one);
    }
    let answer = bigInt.zero;
    if (nth < 0){
        throw 'must be greater than 0'
    }
    else {
        answer = recurrencia(nth);
    }
    context.res = {
        body: answer.toString()
    };
}