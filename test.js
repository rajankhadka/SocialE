const a1 = [1,2,3,4,5,6,7,8,9];
const b1 = [7,2,8,1,5]

const cho = [];
for(let i=0;i< a1.length;i++){
    let flag = false;
    for(let j=0;j<b1.length;j++){
        if(a1[i] === b1[j]){
            
            console.log("object")
            flag = true;
            break;
        }

    
    }
    if(flag){
        cho.push(a1[i])
    }
}

console.log(cho);

function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(parseInt(k));
    }

    return diff;
}

console.log(arr_diff(a1,b1));

